/**
 * 播放器本地存储信息
 * 
 * @param {*} key  键值
 * @param {*} data 数据
 */
export function playerSavedata(key, data) {
    key = 'ddPlayer2_' + key;    // 添加前缀，防止串用
    data = JSON.stringify(data);
    // 存储，IE6~7 不支持HTML5本地存储
    if (window.localStorage) {
        localStorage.setItem(key, data);	
    }
}

/**
 * 播放器读取本地存储信息
 * 
 * @param {*} key 键值
 * @returns 
 */
export function playerReaddata(key) {
    if(!window.localStorage) return '';
    key = 'ddPlayer2_' + key;
    return JSON.parse(localStorage.getItem(key));
}