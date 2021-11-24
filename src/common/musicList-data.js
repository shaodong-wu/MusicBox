/**************************************************
 * 播放列表配置模块
 * 时间：2021-07-08
 *************************************************/

import * as imageUrl from './static-data';


export const musicList = [
    // 预留列表：搜索结果
    {
        name: "搜索结果",                                            // 播放列表名字
        cover: imageUrl.DEFAULT_COVER_IMG,                          // 播放列表封面
        link: "/search"
    },
    // 预留列表：正在播放
    {
        name: "正在播放",                                           // 播放列表名字
        cover: imageUrl.DEFAULT_COVER_IMG,                         // 播放列表封面
        link: "/playing"
    },
    // 预留列表：播放历史
    {
        name: "播放历史",                                           // 播放列表名字
        cover: imageUrl.HISTORY_LIST_COVER_IMG,                    // 播放列表封面
        link: "/history"
    },

    // 自定义列表开始，您可以自由添加您的自定义列表
    {
        name: "热歌榜",
        cover: imageUrl.HOT_SONG_LIST_COVER_IMG,
        link: "/sheet/hot"
    },
    {
        name: "新歌榜",
        cover: imageUrl.NEW_SONG_LIST_COVER_IMG,
        link: "/sheet/new"
    },
    {
        name: "华语金曲榜",
        cover: imageUrl.GOLDEN_MELODY_COVER_IMG,
        link: "/sheet/goldenMelody"
    },
    {
        name: "中国TOP排行榜（内地榜）",
        cover: imageUrl.CHINA_TOP_COVER_1_IMG,
        link: "/sheet/inland"
    },
    {
        name: "中国TOP排行榜（港台榜）",
        cover: imageUrl.CHINA_TOP_COVER_2_IMG,
        link: "/sheet/HKAndTaiwan"
    },
    {
        name: "飙升榜",
        cover: imageUrl.SOAR_LIST_COVER_IMG,
        link: "/sheet/soar"
    },
    {
        name: "原创歌曲榜",
        cover: imageUrl.ORIGINAL_LIST_COVER_IMG,
        link: "/sheet/original"
    }
];