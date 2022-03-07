import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { musicListTitle } from '@/common/local-data';
import { changeCurrentIndexAndSongDetailAction } from '@/store/actionCreators';

import { MusicListWrapper } from './style';


export default memo(function MainList(props) {
    // state and props
    const {
        loadMoreHandle,
        showSongSourceHandle,
        loadDownSongHandle,
    } = props.playingView.handle;

    // redux hook
    const {
        playList,
        playListTotal,
        currentSongIndex,
        currentSongDetail
    } = useSelector(state => ({
        playList: state.getIn(["player", "playList"]),
        playListTotal: state.getIn(["player", "playListTotal"]),
        currentSongIndex: state.getIn(["player", "currentSongIndex"]),
        currentSongDetail: state.getIn(["player", "currentSongDetail"])
    }), shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        if (playList.length <= 0) return false;

        // 播放列表滚动到顶部
        let mainList = document.querySelector("#main-list");
        if (mainList.scrollTop !== 0 && playList.length === 30) {
            console.log("object")
            mainList.scrollTop = 0;
        }
    }, [playList]);

    useEffect(() => {
        if (currentSongIndex < 0) return false;

        // 去除当前全部播放列行样式
        let prevslistItem = document.querySelector(".list-item.list-playing");
        if (prevslistItem !== null) {
            prevslistItem.className = "list-item";
        }

        let audioRef = document.querySelector("audio");
        if (audioRef.dataset.id.toString() === currentSongDetail.rid.toString()) {
            // 默认索引歌曲 + 样式
            let listItem = document.querySelector(`.list-item[data-no="${currentSongIndex}"]`);
            listItem.className += " list-playing";
        }
    }, [currentSongIndex, currentSongDetail]);

    return (
        <MusicListWrapper>
            <div className="list-item list-head">
                {
                    musicListTitle.map((item, index) => {
                        if (index === 0) return false;

                        return (
                            <span key={index} className={item.className}>{item.title}</span>
                        )
                    })
                }
            </div>
            {
                playList.length > 0 ?
                    <>
                        {
                            playList.map((item, index) => {
                                return (
                                    <div key={index} className="list-item" data-no={index}>
                                        <span className={musicListTitle[0].className}>{index + 1}</span>
                                        <span className="list-mobile-menu"></span>
                                        <span className={musicListTitle[1].className}>{item.album}</span>
                                        <span className={musicListTitle[2].className}>{item.artist}</span>
                                        <span className={musicListTitle[3].className}>
                                            <span className="music-name-cult">{item.name}</span>
                                            <div className="list-menu" data-no={index}>
                                                <span className="list-icon icon-play" data-no={index} title="点击播放这首歌" onClick={() => dispatch(changeCurrentIndexAndSongDetailAction(index - currentSongIndex))}></span>
                                                <span className="list-icon icon-download" title="点击下载这首歌" onClick={() => loadDownSongHandle(item.rid, `${item.artist} - ${item.name}`)}></span>
                                                <span className="list-icon icon-share" title="点击分享这首歌" onClick={() => showSongSourceHandle(item)}></span>
                                            </div>
                                        </span>
                                    </div>
                                )
                            })
                        }
                        {
                            playList.length < parseInt(playListTotal) && playList.length !== 0 ?
                                <div className="list-item text-center list-clickable" onClick={e => loadMoreHandle(e)}>加载更多...</div> :
                                <div className="list-item text-center list-clickable" style={{ cursor: "default" }}>已经是最后一条了...</div>
                        }
                    </> :
                    <div className="list-item text-center list-clickable">搜索结果为空</div>
            }
        </MusicListWrapper>
    )
});