import { getSongList, getLyric } from '@/services/player';
import { getRandomNumber } from '@/utils/math-utils';

import * as actionTypes from './constants';

const changePlayListTotalAction = (playListTotal) => ({
    type: actionTypes.CHANGE_PLAY_LIST_TOTAL,
    playListTotal
});

const changeCurrentSongDetailAction = (currentSongDetail) => ({
    type: actionTypes.CHANGE_CURRENT_SONG_DETAIL,
    currentSongDetail
});

const changeCurrentSongIndexAction = (index) => ({
    type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
    index
});

const changLyricListAction = (lyricList) => ({
    type: actionTypes.CHANGE_LYRIC_LIST,
    lyricList
})


// 对外暴露的action
export const changePlayListAction = (playList) => ({
    type: actionTypes.CHANGE_PLAY_LIST,
    playList
});

export const changeSequenceAction = (sequence) => ({
    type: actionTypes.CHANGE_SEQUENCE,
    sequence
});

export const changeCurrentLyricIndexAction = (index) => ({
    type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
    index
});

export const changeCurrentIndexAndSongDetailAction = (tag) => {
    return (dispatch, getState) => {
        const playList = getState().getIn(["player", "playList"]);
        const sequence = getState().getIn(["player", "sequence"]);
        let currentSongIndex = getState().getIn(["player", "currentSongIndex"]);

        switch (sequence) {
            case 1: // 随机播放
                let randomIndex = getRandomNumber(playList.length);
                while (randomIndex === currentSongIndex) {
                randomIndex = getRandomNumber(playList.length);
                }
                currentSongIndex = randomIndex;
                break;

            default: // 顺序播放
                currentSongIndex += tag;
                if (currentSongIndex >= playList.length) currentSongIndex = 0;
                if (currentSongIndex < 0) currentSongIndex = playList.length - 1;
        }

        const currentSongDetail = playList[currentSongIndex];
        dispatch(changeCurrentSongDetailAction(currentSongDetail));
        dispatch(changeCurrentSongIndexAction(currentSongIndex));
        
        // 请求歌词
        dispatch(getLyricAction(currentSongDetail.rid));
    }
};

export const getPlayListAction = (keyword) => {
    return dispatch => {
        getSongList(keyword).then(res => {
            const songList = res.data.list || [];
            const total = res.data.total || 0;
            dispatch(changePlayListAction(songList));
            dispatch(changePlayListTotalAction(total));
        });
    }
}

export const getLyricAction = (musicid) => {
    return dispatch => {
        getLyric(musicid).then(res => {
            const lyricList = res.lrclist || [];
            dispatch(changLyricListAction(lyricList));
        });
    }
};