import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { HashRouter } from 'react-router-dom';

import LogoHeader from './app-header';
import AppCenter from './app-center';
import AppFooter from './app-footer';

import { HeaderInfo } from '@/common/local-data';

import {
    changeCurrentIndexAndSongDetailAction
} from '@/store/actionCreators';




export default memo(function App() {
    // state and props
    const { logoTitle, logoContent, clikSkipUrl } = HeaderInfo;

    // redux hook
    const dispatch = useDispatch();

    useEffect(() => {
        // 快捷键切歌，代码来自 @茗血(https://www.52benxi.cn/)
        document.onkeydown = function (e) {
            let key = e.keyCode || e.which || e.charCode;
            let ctrl = e.ctrlKey || e.metaKey;
            let isFocus = document.activeElement.tagName
            let audioRef = document.querySelector("audio");
            if (ctrl && key === 37) dispatch(changeCurrentIndexAndSongDetailAction(-1));    // Ctrl+左方向键 切换上一首歌
            if (ctrl && key === 39) dispatch(changeCurrentIndexAndSongDetailAction(1));     // Ctrl+右方向键 切换下一首歌
            if (key === 32 && isFocus !== "INPUT") {                                        // 空格键 播放/暂停歌曲
                if (audioRef.src === "") {
                    dispatch(changeCurrentIndexAndSongDetailAction(1));
                } else {
                    audioRef.paused ? audioRef.play() : audioRef.pause();
                }
            }
        }
    }, []);

    return (
        <HashRouter>
            <LogoHeader logoTitle={logoTitle} logoContent={logoContent} clikSkipUrl={clikSkipUrl} />
            <AppCenter />
            <AppFooter />
        </HashRouter>
    )
});