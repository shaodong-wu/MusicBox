import styled from 'styled-components';
import { getImageUrl } from '@/utils/format-utils.js';

import {
    PLAY_ICO_IMG,
    ICON_LIST_MENU
} from '@/common/static-data';

// 塑造组件
const div = ({ className, children }) => (
    <div id="main-list" className={className + " music-list"} style={{ overflowX: "hidden", overflowY: "overlay", scrollBehavior: "smooth" }}>
        {children}
    </div>
)


export const MusicListWrapper = styled(div)`
    /* 数据区域容器 */
    position: absolute;
    left: 10px;
    right: 10px;
    top: 10px;
    bottom: 10px;
    overflow-y: auto;

    /* 列表头 */
    .list-head {
        height: 40px;
    }

    /* 一项数据 */
    .list-item {
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #bdbdbe;
        color: rgba(225,225,225,.8);
        font-size: 14px;
        overflow: hidden;
        border-bottom: 1px solid rgba(150,150,150,.1);
        cursor: default;
        position: relative;
    }

    /* 正在播放的那项 */
    .list-playing {
        color: #fff;
    }

    /* 列表数字 */
    .list-num {
        display: block;
        width: 30px;
        text-align: center;
        float: left;
        overflow: hidden;
    }
    /* 正在播放的那项数字 */
    .list-playing .list-num {
        background: url(${getImageUrl(PLAY_ICO_IMG)}) 10px 20px no-repeat;
        text-indent: -99px;
    }

    /* 音乐名字 */
    .music-name {
        position: relative;
        display: block;
        width: auto;
        margin-left: 40px;
        margin-right: 300px;
        height: 100%;
        -webkit-user-select: none;
        -moz-user-select: none; /*禁止双击选定*/
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
    }
    /* 鼠标滑过时音乐名字被截断 */
    .music-name-cult {
        display: block;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .list-item:hover .music-name-cult {
        padding-right: 150px;
    }
    .list-playing:hover .music-name-cult {
        padding-right: 100px;
    }
    /* 作者名称与音乐专辑 */
    .auth-name,.music-album {
        position: relative;
        display: block;
        width: 150px;
        float: right;
        height: 100%;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    /* 移动端的菜单图标 */
    .list-mobile-menu {
        display: none;
    }

    /*列表中滑动出现的菜单*/
    .list-menu {
        position: absolute;
        right: 10px;
        top: 50%;
        overflow: hidden;
        font-size: 0;
        height: 36px;
        margin-top: -18px;
        float: right;
        display: none;
    }
    .list-item:hover .list-menu {
        display: block;
    }
    .list-head:hover .list-menu {
        display: none;
    }

    /* 列表中滑动出现的小图标 */
    .list-icon {
        display: block;
        width: 36px;
        height: 36px;
        background-image: url(${getImageUrl(ICON_LIST_MENU)});
        float: left;
        margin-left: 10px;
        cursor: pointer;
    }
    .list-playing .icon-play{
        display: none;
    }
    .icon-play {
        background-position: -80px 0;
    }
    .icon-play:hover {
        background-position: -120px 0;
    }
    .icon-download {
        background-position: -80px -120px;
    }
    .icon-download:hover {
        background-position: -120px -120px;
    }
    .icon-share {
        background-position: -80px -40px;
    }
    .icon-share:hover {
        background-position: -120px -40px;
    }

    /* 列表中可以被点击的横条 */
    .list-clickable {
        cursor: pointer;
    }

    .text-center {
        text-align: center;
    }
`;