import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    /* 样式重置 */
    blockquote, body, button, dd, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, hr, html, input, lengend, li, ol, p, pre, td, textarea, th, ul {
        margin: 0;
        padding: 0
    }
    body, button, input, select, textarea, th {
        color: #333;
        background-color: #fff;
        font-size: 14px;
        line-height: 1.5;
        font-family: poppin, "PingFang SC", Tahoma, Arial, "\\5FAE\\8F6F\\96C5\\9ED1", sans-serif;
        font-family: Tahoma, Arial, "\\5FAE\\8F6F\\96C5\\9ED1", sans-serif/9;
    }
    h1, h2, h3, h4, h5, h6 {
        font-size: 100%
    }
    li {
        list-style: none
    }
    img {
        border: 0 none;
        -ms-interpolation-mode: bicubic;
        image-rendering: optimizeQuality
    }
    input[type=button], input[type=submit] {
        cursor: pointer
    }
    button {
        cursor: pointer
    }
    table {
        border-collapse: collapse;
        border-spacing: 0
    }
    a {
        color: #333;
        text-decoration: none
    }
    a:hover {
        color: #31c27c;
        text-decoration: none
    }
    a:focus, button:focus, input:focus {
        outline: 0
    }


    html, body{
        min-width: 1000px;
        height: 100%;
        background-color: #777970;
        overflow: hidden;
    }
    body {
        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ba43a8+0,ea4fce+62,537bad+100&amp;0.38+0,0.17+61,0.8+100 */
        /* IE9 SVG, needs conditional override of 'filter' to 'none' */
        background: #000000;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#7f7280', endColorstr='#000000');
        background-image: -webkit-linear-gradient(200deg, #7f7280, #000000);
        background-image: -moz-linear-gradient(200deg, #7f7280, #000000);
        background-image: -o-linear-gradient(200deg, #7f7280, #000000);
        background-image: -ms-linear-gradient(200deg, #7f7280, #000000);
        background-image: linear-gradient(200deg, #7f7280, #000000);
        
        overflow: hidden;
    }

    /* 重写 antd 弹窗样式 */
    .ant-message-notice {
        position: fixed;
        top: 47%;
        left: 46%;
    }
    .ant-message-notice-content {
        min-width: 100px;
        background-color: rgba(0,0,0,.6);
        color: #fff;
        border: none;
        border-radius: 2px;
        box-shadow: none;
        animation-duration: .3s;
    }
    .ant-modal-content {
        background-color: #00000030;
        box-shadow: 0 3px 6px -4px rgb(0 0 0 / 31%), 0 6px 16px 0 rgb(0 0 0 / 62%), 0 9px 28px 8px rgb(0 0 0 / 62%);
    }

    /* 重写显示外链弹框样式 */
    .show-source-url .ant-modal-content {
        width: 390px;
        background-color: #fff;
    }
    .show-source-url .ant-modal-confirm-title {
        position: relative;
        top: -15px;
        font-weight: 500;
    }


    /*滚动条美化*/
    ::-webkit-scrollbar{
        width:0;
        height:0
    }
    :hover::-webkit-scrollbar{
        width: 4px;
        height: 100%;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        border-radius: 16px;
        background-color: rgba(255,255,255,.2);
        -webkit-border-radius: 16px;
        -moz-border-radius: 16px;
    }
    ::-webkit-scrollbar-thumb:active {
        background-color: rgba(255,255,255,.5);
    }


    /* 模糊图像层 */
    #blur-img {
        position: fixed;
        height: 100%;
        left: -10%;
        width: 120%;
        overflow: hidden;
    }
`;