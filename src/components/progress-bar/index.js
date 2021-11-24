import React, { memo, useState, useEffect } from 'react';
import { ProgressBarWrapper } from './style';


export default memo(function ProgressBar(props) {
    // state and props
    const { id, setValue, islock, dotshine, onAfterChange } = props;
    
    // State Hook
    const [percent, setPercent] = useState(0);
    const [minLength, setMinLength] = useState(0);
    const [maxLength, setMaxLength] = useState(0);


    // Similar to componentDidMount:
    useEffect(() => {

        // 获取偏移量
        let minLength = document.querySelector(`#${id}`).getBoundingClientRect().left;
        let maxLength = document.querySelector(`#${id}`).offsetWidth + minLength;
        setMinLength(minLength);
        setMaxLength(maxLength);

        // 窗口大小改变偏移量重置
        window.onresize = function() {
            let minLength = document.querySelector(`#${id}`).getBoundingClientRect().left;
            let maxLength = document.querySelector(`#${id}`).offsetWidth + minLength;
            setMinLength(minLength);
            setMaxLength(maxLength);
        }

        // 监听鼠标弹起事件，用于释放拖动
        document.querySelector("html").onmouseup = function() {
            document.querySelector("html").onmousemove = null;
        }
    },  []);

    useEffect(() => {
        setPercent(setValue);
    }, [setValue]);

    // 移动进度条
    const progressBarMove = (e) => {
        let percent = e.clientX;

        if (percent < minLength) percent = 0;

        else if (percent > maxLength) percent = 1;

        else percent = ((e.clientX - minLength) / (maxLength - minLength)).toFixed(2);

        onAfterChange(percent);
        setPercent(percent);
        return true;
    }

    // 监听进度条整体的鼠标按下事件
    const progressMouseDown = (e) => {
        if(islock) return false;

        // 移动进度条
        progressBarMove(e);

        // 监听鼠标移动事件，用于拖动
        document.querySelector("html").onmousemove = function(e) {
            progressBarMove(e);
        }
    }

    return (
        <ProgressBarWrapper id={id} islock={islock} onMouseDown={progressMouseDown}>
            <div className="mkpgb-bar"></div>
            <div className="mkpgb-cur" style={{width: `${percent*100}%`}}></div>
            <div className={`mkpgb-dot ${dotshine? "dot-move" : ""}`} style={{left: `${percent*100}%`}} onMouseDown={ e => e.preventDefault()}></div>
        </ProgressBarWrapper>
    )
});