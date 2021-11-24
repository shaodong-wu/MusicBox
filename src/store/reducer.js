import { Map } from 'immutable';

import * as actionTypes from './constants';

const defaultState = Map({
  playList: [],
  playListTotal: 0,
  currentSongIndex: -1,
  currentSongDetail: {},
  sequence: 0, // 0 列表循环 1 随机 2 单曲
  lyricList: [],
  currentLyricIndex: 0
});


function reducer(state=defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_PLAY_LIST:
            return state.set("playList", action.playList);
        case actionTypes.CHANGE_PLAY_LIST_TOTAL:
            return state.set("playListTotal", action.playListTotal);
        case actionTypes.CHANGE_SEQUENCE:
            return state.set("sequence", action.sequence);
        case actionTypes.CHANGE_LYRIC_LIST:
            return state.set("lyricList", action.lyricList);
        case actionTypes.CHANGE_CURRENT_LYRIC_INDEX:
            return state.set("currentLyricIndex", action.index);
        case actionTypes.CHANGE_CURRENT_SONG_INDEX:
            return state.set("currentSongIndex", action.index);
        case actionTypes.CHANGE_CURRENT_SONG_DETAIL:
            return state.set("currentSongDetail", action.currentSongDetail);
        default:
            return state;
    }    
}

export default reducer;
