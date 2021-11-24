import axios from 'axios';
import { BASE_URL, TIMEOUT } from './config';

import { message } from 'antd';


// 允许携带 cookie
axios.defaults.withCredentials = false;

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
});

instance.interceptors.request.use(config => {
    return config;
}, err => {
    message.open({
        content: "网络连接失败",
        duration: 2
    });
});


instance.interceptors.response.use(res => {
    return res.data;
}, err =>{
    if (err && err.response) {
        let msgTip;
        switch (err.response.status) {
            case 400:
                msgTip = "请求错误";
                break;
            case 401:
                msgTip = "未授权访问";
                break;
            case 500:
                msgTip = "服务器崩溃~";
            default:
                msgTip = "其他错误信息";
        }

        message.open({
            content: msgTip,
            duration: 2
        });
    }
    return err;
});

export default instance;
