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
    let content;
    if (err || err.response) {
        let status = err.response?.status ?? 0;
        switch (status) {
            case 400: content = "请求错误";
                break;

            case 401: content = "未授权访问";
                break;

            case 500: content = "服务器崩溃~";
                break;

            default: content = "服务器无响应";
        }
    }
    message.open({ content, duration: 2 });
    return err;
});

export default instance;
