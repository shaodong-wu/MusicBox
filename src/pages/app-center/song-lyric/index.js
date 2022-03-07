import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import $ from 'jquery';
import { LyricWrapper } from './style';


export default function SongLyric() {

    // redux hook
    const {
        lyricList,
        currentSongIndex,
        currentLyricIndex
    } = useSelector(state => ({
        lyricList: state.getIn(["player", "lyricList"]),
        currentSongIndex: state.getIn(["player", "currentSongIndex"]),
        currentLyricIndex: state.getIn(["player", "currentLyricIndex"])
    }), shallowEqual);

    // other hooks
    useEffect(() => {
        let lyricArea = $("#lyric");                                            // 歌词显示容器

        if (lyricList.length <= 0) return false;

        $(".lplaying").removeClass("lplaying");                                 // 移除其余句子的正在播放样式
        $(`.lrc-item[data-no='${currentLyricIndex}']`).addClass("lplaying");    // 加上正在播放样式

        let scroll = (lyricArea.children().height() * currentLyricIndex) - ($("#lyric_box").height() / 2);
        lyricArea.stop().animate({ scrollTop: scroll }, 1000);  // 平滑滚动到当前歌词位置(更改这个数值可以改变歌词滚动速度，单位：毫秒)
    }, [currentLyricIndex]);


    return (
        <LyricWrapper>
            <ul id="lyric">
                {
                    currentSongIndex < 0 ? "" : lyricList.length > 0 ? lyricList.map((item, index) => {
                        return (
                            <li key={index} data-no={index} className="lrc-item">{item.lineLyric}</li>
                        )
                    }) : <li className="lyric-tip">没有歌词</li>
                }
            </ul>
        </LyricWrapper>
    )
}