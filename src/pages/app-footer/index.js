import React, { memo, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import ProgressBar from '../../components/progress-bar';
import { message } from 'antd';


import {
    changeSequenceAction,
    changeCurrentLyricIndexAction,
    changeCurrentIndexAndSongDetailAction
} from '@/store/actionCreators';

import {
    playerSavedata,
    playerReaddata
} from '@/utils/readData-utils';

import {
    mkPlayer
} from '@/common/music-data.js';

import { getSongSource } from '@/services/player';

import {
    AppFooterWrapper,
    FooterConBtn,
    FooterVol,
    FooterProgress
} from './style';



export default memo(function AppFooter() {

    // props and state
    const [volumeProgress, setVolumeProgress] = useState(0);
    const [musicProgress, setMusicProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isQuiet, setIsQuiet] = useState(false);
    const [titflash, setTitflash] = useState(null);

    // redux hook
    const {
        sequence,
        lyricList,
        currentSongIndex,
        currentSongDetail,
        currentLyricIndex
    } = useSelector(state => ({
        sequence: state.getIn(["player", "sequence"]),
        lyricList: state.getIn(["player", "lyricList"]),
        currentSongIndex: state.getIn(["player", "currentSongIndex"]),
        currentSongDetail: state.getIn(["player", "currentSongDetail"]),
        currentLyricIndex: state.getIn(["player", "currentLyricIndex"])
    }), shallowEqual);
    const dispatch = useDispatch();

    // other hooks
    const audioRef = useRef();

    useEffect(() => {
        // 初始化音量
        let oldVolume = getDefaultValue();
        audioRef.current.volume = oldVolume;
        setVolumeProgress(oldVolume);

        // 浏览器标题缓存在本地
        playerSavedata("webTitle", document.title);
    }, []);

    useEffect(() => {
        if (currentSongIndex === -1) return false;

        getSongSource(currentSongDetail.rid).then(res => {
            // 设置 audio 的 src 地址
            const songUrl = res.url;
            audioRef.current.src = songUrl;

            // 存入本地历史列表
            let historyList = playerReaddata("historyList") || [];
            let index = historyList.findIndex(item => item.rid === currentSongDetail.rid);
            if (index < 0) {
                historyList.unshift(currentSongDetail);
                playerSavedata("historyList", historyList);
            }

            // 更新当前歌词索引
            dispatch(changeCurrentLyricIndexAction(0));

            // 更新 进度条
            setMusicProgress(0);

            // 播放音乐
            audioRef.current.play();
            setIsPlaying(true);
        });
    }, [currentSongIndex, currentSongDetail]);

    useEffect(() => {
        // 清楚旧定时任务
        stopTitleFlash();

        // 重新派发定时任务
        isPlaying ? startTitleFlash() : stopTitleFlash();
    }, [isPlaying, currentSongIndex]);


    // 初始化音量设定
    const getDefaultValue = () => {
        let volume = playerReaddata('volume');
        volume = (volume != null) ? volume : mkPlayer.volume;
        if (volume < 0) volume = 0;    // 范围限定
        if (volume > 1) volume = 1;
        if (volume === 0) setIsQuiet(true); // 添加静音样式
        return volume;
    }

    // 音量条变动回调函数
    const volumeAfterChange = (newVal) => {

        audioRef.current.volume = newVal;

        // 取消静音
        setIsQuiet(false);

        if (newVal === 0) setIsQuiet(true);

        // 存储音量信息
        playerSavedata('volume', newVal);
    }

    // 音乐进度条拖动回调函数
    const sliderAfterChange = (newVal) => {
        // 当前拖都的进度条 百分比
        let newTime = audioRef.current.duration * newVal;

        // 应用新的进度
        audioRef.current.currentTime = newTime;

        // 强制滚动歌词到当前进度
        if (lyricList.length <= 0) return false;

        let time = newTime.toFixed(2);       // 时间保留小数点后两位


        let currentLyricIndex = lyricList.findIndex(
            item => parseFloat(item.time) >= time
        ) - 1;                              // 查找当前时间的歌词索引
        currentLyricIndex = currentLyricIndex < 0 ? lyricList.length - 1 : currentLyricIndex;

        dispatch(changeCurrentLyricIndexAction(currentLyricIndex));     // 更新当前歌词索引
    }

    // 播放 OR 暂停
    const pauseEvent = () => {
        if (audioRef.current.src === "") {
            dispatch(changeCurrentIndexAndSongDetailAction(1));
            return false;
        }

        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
    }

    // 静音事件
    const muteEvent = () => {
        let volume = 0;
        switch (isQuiet) {
            case true:
                volume = playerReaddata('volume');
                audioRef.current.volume = volume;
                setIsQuiet(false);
                break;

            case false:
                audioRef.current.volume = 0;
                setIsQuiet(true);
                break;

            default:
                return false;
        }
        // 调整进度条
        setVolumeProgress(volume);
    }

    // 音乐结束事务
    const handleMusicEnded = () => {
        if (sequence === 2) { // 单曲循环
            audioRef.current.currentTime = 0;
            setMusicProgress(0);
            dispatch(changeCurrentLyricIndexAction(0));

            // 重复播放
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            dispatch(changeCurrentIndexAndSongDetailAction(1));
        }
    }

    // 音乐播放错误处理
    const handleMusicError = () => {
        if (!isPlaying) return false;

        message.open({
            content: "播放失败, 自动切换下一首",
            duration: 1,
            onClose: () => {
                changeMusicIndex(1);
            }
        })
    }

    // 音乐时间更新时
    const musicTimeUpdate = (e) => {
        const currentTime = e.target.currentTime;

        let progress = e.target.currentTime / e.target.duration;
        setMusicProgress(progress);

        if (lyricList.length <= 0) return false;                        // 歌词列表为空

        let time = currentTime.toFixed(2);                              // 时间保留小数点后两位

        if (currentLyricIndex + 1 >= lyricList.length) return false;    // 当前时间点没有歌词

        if (time >= parseFloat(lyricList[currentLyricIndex + 1].time)) {
            dispatch(changeCurrentLyricIndexAction(currentLyricIndex + 1));
        }
    }

    // 修改循环顺序
    const changeSequence = () => {
        let currentSequence = sequence + 1;
        if (currentSequence > 2) {
            currentSequence = 0;
        }

        // Tip
        switch (currentSequence) {
            case 0:     // 单曲循环 -> 列表循环
                message.open({
                    content: "列表循环",
                    duration: 1
                });
                break;

            case 1:     // 列表循环 -> 随机播放
                message.open({
                    content: "随机播放",
                    duration: 1
                });
                break;

            default:     // 随机播放 -> 单曲循环
                message.open({
                    content: "单曲循环",
                    duration: 1
                });
        }

        // 更新状态
        dispatch(changeSequenceAction(currentSequence));
    }

    const changeMusicIndex = (tag) => {
        dispatch(changeCurrentIndexAndSongDetailAction(tag));
    }

    // 开启标题滚动
    const startTitleFlash = () => {
        // Tip
        let msg = " 正在播放: " + currentSongDetail.name + " - " + currentSongDetail.artist;  // 改变浏览器标题

        // 截取字符
        let tit = function () {
            msg = msg.substring(1, msg.length) + msg.substring(0, 1);
            document.title = msg;
        };

        // 设置定时间 300ms滚动
        const titflash = setInterval(function () { tit() }, 300);
        setTitflash(titflash)
    }

    // 停止标题滚动
    const stopTitleFlash = () => {
        // 清除定时器
        if (titflash !== null) {
            clearInterval(titflash);
            setTitflash(null);
        }

        // 改变浏览器标题
        document.title = playerReaddata("webTitle");
    }

    return (
        <AppFooterWrapper>
            <div className="container">
                <audio ref={audioRef} data-id={currentSongDetail.rid} onTimeUpdate={e => musicTimeUpdate(e)} onEnded={() => handleMusicEnded()} onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)} onError={() => handleMusicError()} />

                <FooterConBtn isPlaying={isPlaying} sequence={sequence}>
                    <a href="javascript:;" className="player-btn btn-prev" title="上一首" onClick={() => changeMusicIndex(-1)}></a>
                    <a href="javascript:;" className="player-btn btn-play" title="暂停/继续" onClick={() => pauseEvent()}></a>
                    <a href="javascript:;" className="player-btn btn-next" title="下一首" onClick={() => changeMusicIndex(1)}></a>
                    <a href="javascript:;" className="player-btn btn-order" title="循环控制" onClick={() => changeSequence()}></a>
                </FooterConBtn>

                <FooterVol isQuiet={isQuiet}>
                    <div className="quiet">
                        <a href="javascript:;" className="player-btn btn-quiet" title="静音" onClick={() => muteEvent()}></a>
                    </div>
                    <div className="volume">
                        <div className="volume-box">
                            <ProgressBar id="volume-progress" setValue={volumeProgress} islock={false} dotshine={false} onAfterChange={volumeAfterChange} />
                        </div>
                    </div>
                </FooterVol>

                <FooterProgress>
                    <div className="progress-box">
                        <ProgressBar id="music-progress" setValue={musicProgress} islock={false} dotshine={true} onAfterChange={sliderAfterChange} />
                    </div>
                </FooterProgress>
            </div>
        </AppFooterWrapper>
    )
});