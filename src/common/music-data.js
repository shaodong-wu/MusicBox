// 播放器功能配置
export const mkPlayer = {
    loadcount: 20,          // 搜索结果一次加载多少条
    defaultlist: 3,         // 默认要显示的播放列表编号
    autoplay: false,        // 是否自动播放(true/false) *此选项在移动端可能无效
    coverbg: false,         // 是否开启封面背景(true/false) *开启后会有些卡
    mcoverbg: false,        // 是否开启[移动端]封面背景(true/false)
    dotshine: true,         // 是否开启播放进度条的小点闪动效果[不支持IE](true/false) *开启后会有些卡
    mdotshine: false,       // 是否开启[移动端]播放进度条的小点闪动效果[不支持IE](true/false)
    volume: 0.6,            // 默认音量值(0~1之间)
};


export const rem = {
    isMobile: false
}