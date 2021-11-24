import styled, { css } from 'styled-components';
import { DEFAULT_BTN_IMG } from '@/common/static-data';
import { getImageUrl } from '@/utils/format-utils.js';

const playerBtnStyle = css`
    .player-btn {
        background-image: url(${getImageUrl(DEFAULT_BTN_IMG)});
        opacity: .8;
        filter: alpha(opacity=80)
    }

    .player-btn:hover {
        opacity: 1;
        filter: alpha(opacity=100)
    }
`;

export const AppFooterWrapper = styled.div`
    /* 底部 */
    height: 100px;
    bottom: 0;
    width: 100%;
    position: absolute;

    /* 宽度约束容器 */
    .container{
        position: relative;
        width: 100%;
        height: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }
`;

export const FooterConBtn = styled.div`
    float: left;
    width: 130px;
    height: 100%;
    position: relative;
    margin: 0 10px;

    a{
        display: inline-block;
        position: absolute;
        top: 50%; 
    }

    /* 带图片的按钮 */
    ${ playerBtnStyle }

    /* 暂停状态 */
    .btn-state-paused {
        background-position: -30px 0;
    }

    /* 控制按钮(上一首、播放、下一首)区域 */
    .btn-prev{
        background-position: 0 -30px;
        width: 19px;
        height: 20px;
        margin-top: -10px; 
    }

    .btn-play{
        width: 19px;
        height: 29px;
        margin-top: -14.5px; 
        left: 36%;
        margin-left: -10.5px;
        background-position: ${props => props.isPlaying? "-30px" : "0"} 0;
    }
    .btn-next{
        background-position: 0 -52px;
        right: 30%;
        width: 19px;
        height: 20px;
        margin-top: -10px; 
    }
    .btn-order{
        background-position: ${props => {
            switch(props.sequence) {
                case 0:
                    return "0 -173px"
                case 1:
                    return "0 -62px"
                default:
                    return "0 -196px"
            }
        }};
        background-size: 450%;
        right: 0;
        width: 25px;
        height: ${props => props.sequence === 1? "18px" : "25px"};
        margin-top: ${props => props.sequence === 1? "-9px" : "-10px"}; 
    }
`;

export const FooterVol = styled.div`
    /* 音量控制区域 */
    float: right;
    width: 200px;
    height: 100%;
    right: 0;
    position: relative;

    .quiet {
        width: 60px;
        height: 100%;
        position: relative;
        float: left;
    }
    .btn-quiet{
        display: inline-block;
        position: absolute;
        width: 26px;
        height: 21px;
        top: 50%;
        right: 0;
        margin-top: -10px;
        background-position: 0 ${props => props.isQuiet ? "-182px": "-144px"};
    }
    .volume {
        position: relative;
        margin-left: 60px;
        height: 100%;
        overflow: hidden;
    }
    
    /* 限制声音进度条的盒子 */
    .volume-box {
        position: absolute;
        height: 20px;
        left: 10px;
        right: 10px;
        top: 50%;
        margin-top: -10px;
    }

    /* 带图片的按钮 */
    ${ playerBtnStyle }
`;

export const FooterProgress = styled.div`
    /* 音乐进度条区域 */
    width: auto;
    margin-left: 150px;
    margin-right: 200px;
    height: 100%;
    position: relative;

    /* 限制进度条的盒子 */
    .progress-box {
        position: absolute;
        height: 20px;
        left: 10px;
        right: 0;
        top: 50%;
        margin-top: -9px;
    }
`;