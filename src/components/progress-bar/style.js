import styled from 'styled-components';

// 塑造组件
const div = ({ id, className, onMouseDown, children }) => (
    <div id={id} className={"mkpgb-area " + className} onMouseDown={e => onMouseDown(e)}>
        {children}
    </div>
)

// 进度条样式容器
export const ProgressBarWrapper = styled(div)`
    /* 进度条可点击区域 */
    &.mkpgb-area {
        position: relative;
        cursor: ${props => props.islock ? "default" : "pointer"};
        height: 100%;
    }
    
    /* 进度条有背景区域 */
    .mkpgb-bar {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 2px; 
        margin-top: -1px; 
        border-radius: 2px;
        background-color: #808284;
        overflow: hidden;
    }

    /* 进度条已完成区域 */
    .mkpgb-cur {
        position: absolute;
        background-color: #D8D8D8; 
        width: 0; 
        height: 2px; 
        top: 50%;
        margin-top: -1px; 
        border-radius: 2px;
        transition: all 0.25s ease;
        -webkit-transition: all 0.25s ease;
        -moz-transition: all 0.25s ease;
        -o-transition: all 0.25s ease;
        -ms-transition: all 0.25s ease;
    }
    
    /* 进度条小点 */
    .mkpgb-dot {
        width: 10px; 
        height: 10px; 
        background-color: #fff; 
        border-radius: 5px; 
        overflow: hidden; 
        position: absolute; 
        left: 0px; 
        margin-left: -5px; 
        top: 50%; 
        margin-top: -5px;
        transition: all 0.25s ease;
        -webkit-transition: all 0.25s ease;
        -moz-transition: all 0.25s ease;
        -o-transition: all 0.25s ease;
        -ms-transition: all 0.25s ease;
    }

    /* 闪动效果作者：qiuye */
    .dot-move {
        -webkit-box-shadow: 0 0 20px #fff;
        -moz-animation: dot-move 3s linear 2s infinite;
        -webkit-animation: dot-move 3s linear 2s infinite;
        -o-animation: dot-move 3s linear 2s infinite;
        -ms-animation: dot-move 3s linear 2s infinite;
    }
    @-webkit-keyframes dot-move{0%{-webkit-box-shadow: 0 0 20px #fff;}25%{-webkit-box-shadow: 0 0 10px #fff;}50%{-webkit-box-shadow: 0 0 0px #fff;}75%{-webkit-box-shadow: 0 0 10px #fff;}100%{-webkit-box-shadow: 0 0 20px #fff;}}
    @keyframes dot-move{0%{-webkit-box-shadow: 0 0 10px #363333;}25%{-webkit-box-shadow: 0 0 7px #363333;}50%{-webkit-box-shadow: 0 0 0px #fff;}75%{-webkit-box-shadow: 0 0 6px #fff;}100%{-webkit-box-shadow: 0 0 10px #363333;}}

`;