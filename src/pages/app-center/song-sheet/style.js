import styled from 'styled-components';

import { getImageUrl } from '@/utils/format-utils';
import { PLAY_ICO_IMG } from '@/common/static-data';

export const SongSheetWrapper = styled.div.attrs({
    id: "sheet"
})`
    /* 数据区域容器 */
    position: absolute;
    left: 10px;
    right: 10px;
    top: 10px;
    bottom: 10px;
    overflow-y: auto;

    /* 歌单中的一项 */
    .sheet-item {
        position: relative;
        display: block;
        width: 25%;
        float: left;
        text-align: center;
    }

    /* 歌单封面 */
    .sheet-cover {
        display: block;
        width: 100px;
        height: 100px;
        margin: 10px auto;
        cursor: pointer;
    }

    /* 正在播放的列表  */
    .sheet-playing:before {
        content: url(${getImageUrl(PLAY_ICO_IMG)}});
        position: absolute;
        top: 90px;
        left: 50%;
        margin-left: -45px;
    }

    /* 歌单名字 */
    .sheet-name {
        /*padding: 0 5px;*/
        display: inline-block;
        max-width: 120px;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 10px;
        color: #fff;
        cursor: pointer;
        font-size: 12px;
    }

    /* 播放列表分割标题栏 */
    .sheet-title-bar {
        border-radius: 2px;
        margin: 20px 0;
        text-align: center;
        line-height: 40px;
        height: 40px;
        color: #C5C5C5;
        background-color: rgba(0, 0, 0, 0.12);
    }
    .login-btn {
        cursor: pointer;
    }
    .login-btn:hover {
        color: #31c27c;
    }
`;