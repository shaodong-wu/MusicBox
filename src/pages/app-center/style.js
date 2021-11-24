import styled, { css } from 'styled-components';
import { getImageUrl } from '@/utils/format-utils.js';
import {
    DEFAULT_BTN_IMG
} from '@/common/static-data';


export const AppCenterWrapper = styled.div`
    /* 中部主要容器 */
    position: absolute;
    width: 100%;
    top: 50px;
    bottom: 100px;

    /* 宽度约束容器 */
    .container{
        position: relative;
        width: 100%;
        height: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }
`;

export const CenterBtnBar = styled.div`
    /* 顶部按钮条 */
    position: absolute;
    display: inline-block;
    left: 0;
    right: 400px;
    height: 55px;

    /* 顶部按钮区域 */
    .btn-box {
        position: absolute;
        top: 10px;
        bottom: 10px;
        left: 10px;
        right: 10px;
    }

    /* 常规按钮 */
    .btn {
        transition: all 0.25s ease;
        -webkit-transition: all 0.25s ease;
        -moz-transition: all 0.25s ease;
        -o-transition: all 0.25s ease;
        -ms-transition: all 0.25s ease;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: inline-block;
        position: relative;
        border-radius: 2px;
        border: 1px solid #fff;
        border: 1px solid rgba(150,150,150,.5);
        color: #fff;
        opacity: .8;
        filter: alpha(opacity=80);
        cursor: pointer;
        font-size: 14px;
        padding: 6px 25px;
        margin: 0 2px;

        &:hover {
            border: 1px solid #fff;
            opacity: 1;
            filter: alpha(opacity=100);
        }

        &[data-action='player'] {
            display: none;
        }
    }
`;

const ShareStyle = css`
    .share-url {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        line-height: 30px;
        box-sizing: border-box;
        padding: 0 5px;
        border: 1px solid #ccc;
        box-shadow: 1px 1px 5px rgba(0,0,0,.1) inset;
        color: #333;
        height: 35px;
    }
    .share-tips {
        font-size: 12px;
        color: #a9a9a9;
    }
`;

export const CenterDataArea = styled.div`
    /* 左侧主体数据区 */
    position: absolute;
    left: 0;
    right: 400px;
    top: 60px;
    bottom: 0;
    overflow: hidden;

    /* 分享弹窗中的链接框 */
    ${ ShareStyle }

`;

export const CenterPlayer = styled.div.attrs({
    id: "player"
})`
    /* 播放器主体(歌词和封面) */
    height: 100%;
    width: 400px;
    float: right;
    position: relative;

    /* 歌曲信息按钮 */
    #music-info {
        transition: all 0.25s ease;
        -webkit-transition: all 0.25s ease;
        -moz-transition: all 0.25s ease;
        -o-transition: all 0.25s ease;
        -ms-transition: all 0.25s ease;
        position: absolute;
        width: 27px;
        height: 26px;
        border-radius: 13px;
        right: 10px;
        bottom: 10px;
        cursor: pointer;
        color: #fff;
        text-align: center;
        line-height: 26px;
        font-weight: bold;
        background-image: url(${getImageUrl(DEFAULT_BTN_IMG)});
        background-position: -28px -367px;
        background-color: #353535;
        opacity: 0.3;
        filter: Alpha(opacity=30);
    }
    #music-info:hover {
        opacity: 1;
        filter: Alpha(opacity=100);
    }
`;

export const CenterInfoBox = styled.div`
    width: 189px;
    color: white;
    line-height: 28px;
    overflow-x: hidden;
    overflow-y: auto;
    
    .info-title {
        /* color: #B2AFAF */
        color: #00e6d1;
        margin-right: 3px;
    }
    .info-btn {
        cursor: pointer;
        color: #31c27c;
    }
    .info-btn:hover {
        text-decoration: underline;
    }
`;

export const CenterShowMsg = styled.div`
    .share-url {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        line-height: 30px;
        box-sizing: border-box;
        padding: 0 5px;
        border: 1px solid #ccc;
        box-shadow: 1px 1px 5px rgb(0 0 0 / 10%) inset;
        color: #333;
        height: 35px;
    }

    .share-tips {
        font-size: 12px;
        color: #a9a9a9c9;
    }
`;