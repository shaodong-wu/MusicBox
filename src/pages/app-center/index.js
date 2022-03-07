import React, { memo, useState, useEffect, useRef, Suspense } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '../../router';

import SongCover from '../../components/songs-cover';
import SongLyric from './song-lyric';

import { message, Modal, Input, Button, Spin } from 'antd';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';

import { DEFAULT_COVER_IMG } from '@/common/static-data';
import { getImageUrl } from '@/utils/format-utils';

import {
    getPlayListAction,
    changePlayListAction,
} from '@/store/actionCreators';

import {
    getSongList,
    getSongSource
} from '@/services/player';

import {
    AppCenterWrapper,
    CenterBtnBar,
    CenterDataArea,
    CenterPlayer,
    CenterInfoBox,
    CenterShowMsg
} from './style';



export default memo(function AppCenter() {
    // state and props
    const [coverImgUrl, setCoverImgUrl] = useState();
    const [searchCover, setSearchCover] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [searchVisible, setSearchVisible] = useState(false);
    const [infoVisible, setInfoVisible] = useState(false);
    const [loadingVisible, setLoadingVisible] = useState(true);
    const [keyword, setKeyWord] = useState("周杰伦");
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const inputRef = useRef();

    // redux hook
    const {
        playList,
        playListTotal,
        currentSongDetail
    } = useSelector(state => ({
        playList: state.getIn(["player", "playList"]),
        playListTotal: state.getIn(["player", "playListTotal"]),
        currentSongDetail: state.getIn(["player", "currentSongDetail"])
    }), shallowEqual);
    const dispatch = useDispatch();

    // other hooks
    useEffect(() => {
        // 初始化音乐列表
        dispatch(getPlayListAction(keyword));
    }, []);

    useEffect(() => {
        // 防止第一次初始化关闭 Loading
        if (playListTotal < 0) return false;

        // 列表长度为 0, 则不更新列表
        if (playList.length > 0) {
            // 去除当前全部播放列行样式
            let prevslistItem = document.querySelector(".list-item.list-playing");
            if (prevslistItem !== null) {
                prevslistItem.className = "list-item";
            }
            // 更新搜索结果封面
            setSearchCover(playList[0].albumpic);
        }

        // 隐藏 Loading搜索框
        setLoadingVisible(false);

    }, [playList, playListTotal])

    useEffect(() => {
        setCoverImgUrl(currentSongDetail.albumpic);
    }, [currentSongDetail]);

    const searchMusicList = () => {
        if (inputValue === "") return false;

        if (inputValue !== keyword) {
            dispatch(getPlayListAction(inputValue));
            setKeyWord(inputValue);
            setLoadingVisible(true);
        }

        // 清空输入框、隐藏搜索框
        setInputValue("");
        setSearchVisible(false);

    }

    const showSongDetail = () => {
        if (currentSongDetail.rid === undefined || currentSongDetail.rid === null) {
            message.open({
                content: "请先播放歌曲",
                duration: 2
            });
            return false;
        }

        setInfoVisible(true);
    }

    const loadDownSong = (musicId, musicName) => {
        if (musicId == undefined) return false;

        getSongSource(musicId).then(res => {
            const songUrl = res?.url?.data?.url ?? "";
            if (songUrl) {
                fetch(songUrl)
                .then(response => response.blob())
                .then(blob => {
                    const objectURL = window.URL.createObjectURL(blob);
                    const newA = document.createElement('a');
                    newA.href = objectURL;
                    newA.download = musicName;
                    newA.click();
                    window.URL.revokeObjectURL(objectURL);
                });
                message.info("已在后台开启下载", 1);
            } else {
                message.info("未知该歌曲源地址", 1);
            }
        });
    }

    const showSongSourceUrl = (songDetail) => {
        // 隐藏歌曲信息提示框
        setInfoVisible(false);

        getSongSource(songDetail.rid).then(res => {
            let songTip = songDetail.name + " - " + songDetail.artist;
            let surceUrl = res?.url?.data?.url;

            // 弹出 外链URL 框
            Modal.info({
                icon: "",
                title: "歌曲外链分享",
                centered: true,
                closable: true,
                okText: "确定",
                bodyStyle: {
                    backgroundColor: "#fff"
                },
                className: "show-source-url",
                content: (
                    <CenterShowMsg>
                        <p style={{ fontWeight: "300" }}>{songTip} 的外链地址为：</p>
                        <input className="share-url" value={surceUrl || '未知该歌曲源地址'} onMouseMove={e => { e.currentTarget.focus(); e.currentTarget.select(); }} />
                        <p className="share-tips">* 获取到的音乐外链有效期较短，请按需使用。</p>
                    </CenterShowMsg>

                )
            });
        });
    }

    const loadMoreSong = (e) => {
        e.currentTarget.innerHTML = "加载中...";

        let target = e.currentTarget
        getSongList(keyword, currentPageNo + 1).then(res => {
            let newList = res.data.list;
            dispatch(changePlayListAction([...playList, ...newList]));

            target.innerHTML = "加载更多...";
            setCurrentPageNo(currentPageNo + 1);
        });
    }

    return (
        <AppCenterWrapper>
            <div className="container">
                <CenterBtnBar>
                    <div className="btn-box" id="btn-area">
                        <span className="btn" data-action="player" hidden>播放器</span>
                        <NavLink to="/playing" >
                            <span className="btn" data-action="playing" title="正在播放列表">正在播放</span>
                        </NavLink>
                        <NavLink to="/sheet">
                            <span className="btn" data-action="sheet" title="音乐播放列表">播放列表</span>
                        </NavLink>
                        <span className="btn" data-action="search" title="点击搜索音乐" onClick={() => { setSearchVisible(true) }}>歌曲搜索</span>
                    </div>
                </CenterBtnBar>

                <CenterDataArea>
                    <Suspense fallback={ <div>page loading</div> }>
                        {
                            renderRoutes(routes, {
                                playingView: {
                                    handle: {
                                        loadMoreHandle: loadMoreSong,
                                        showSongSourceHandle: showSongSourceUrl,
                                        loadDownSongHandle: loadDownSong
                                    }
                                },
                                sheetView: {
                                    state: {
                                        currentResultCover: searchCover,
                                        currentSongCover: coverImgUrl
                                    }
                                }
                            })
                        }
                    </Suspense>
                </CenterDataArea>

                <CenterPlayer>
                    <SongCover coverImgUrl={coverImgUrl} defaultImage={getImageUrl(DEFAULT_COVER_IMG)}></SongCover>

                    <SongLyric></SongLyric>

                    <div id="music-info" title="点击查看歌曲信息" onClick={() => showSongDetail()}></div>
                </CenterPlayer>

                <Modal visible={searchVisible} destroyOnClose={true} centered={true} closable={false} footer={null} keyboard={true} style={{ maxWidth: "370px" }} bodyStyle={{ backgroundColor: "#0000008c" }}
                    onCancel={() => setSearchVisible(false)}>
                    <Input ref={inputRef} autoFocus={true} value={inputValue} style={{ width: "225px", marginRight: "10px", color: "white", backgroundColor: "#ffffff21", border: 0 }} placeholder="搜索关键字、歌名、专辑"
                        onChange={(e) => setInputValue(e.target.value)} onPressEnter={() => searchMusicList()} />
                    <Button type="primary" icon={<SearchOutlined />} ghost={true} onClick={() => searchMusicList()} >搜索</Button>
                </Modal>

                <Modal visible={infoVisible} centered={true} closable={false} footer={null} keyboard={true} style={{ maxWidth: "260px", height: "160px" }} bodyStyle={{ backgroundColor: "#00000094" }}
                    onCancel={() => setInfoVisible(false)}>
                    <CenterInfoBox>
                        <span className="info-title">歌名：</span>{currentSongDetail.name || "未知"}<br />
                        <span className="info-title">歌手：</span>{currentSongDetail.artist || "未知"}<br />
                        <span className="info-title">专辑：</span>{currentSongDetail.album || "未知"}<br />
                        <span className="info-title">时长：</span>{currentSongDetail.songTimeMinutes || "未知"}<br />
                        <span className="info-title">操作：</span>
                        <span className="info-btn" onClick={() => loadDownSong(currentSongDetail.rid, `${currentSongDetail.artist} - ${currentSongDetail.name}`)}>下载</span>
                        <span style={{ marginLeft: "10px" }} className="info-btn" onClick={() => showSongSourceUrl(currentSongDetail)}>外链</span>
                    </CenterInfoBox>
                </Modal>

                <Modal visible={loadingVisible} centered={true} closable={false} footer={null} keyboard={true} style={{ maxWidth: "188px" }} bodyStyle={{ backgroundColor: "#00000094" }}>
                    <Spin spinning={true} size="large" indicator={<LoadingOutlined style={{ fontSize: 25 }} spin />} />
                    <span style={{ marginLeft: "18px", color: "#fff", fontSize: "16px", fontWeight: 300 }}>搜索中</span>
                </Modal>

            </div>
        </AppCenterWrapper>
    )
});