# 在线播放音乐盒(PC 端)

***

> ☁️ 项目演示地址：http://175.178.71.181:9000/



## 项目说明 💻

- 项目名称：♫ DDOnlinePlayer
- 项目简介：基于 React 框架开发的在线音乐播放器，实现歌曲的搜索播放、分享与下载、歌词与进度条同步显示，以及热门推荐榜单。
- 技  术  栈：React、React-Router、React-Redux、Axios
- UI组件库：Ant Design
- 技术描述：
  1. 采用 Python 的 Flask 框架开发后端 RESTful API 接口，提供数据源
  2. 将项目中页面中的相关配置进行抽离，对代码进行解偶，提高代码的可维护性
  3. 通过重写 Ant Design 组件库的样式，实现个性化的统一风格UI 界面
  4. 使用 Axios 网络请求库设置全局请求拦截器，对网络异常进行统一处理
  5. 使用HTML5的 `dowmload` 新属性，和将外链转化为内链两者相结合的形式实现跨域下载资源文件




## 项目结构 🌲

```css
├── music_box
│   ├── node_modules
│   ├── public
│   ├── src
|   |   ├── assets             // 静态资源
|   |   ├── common             // 公共配置
|   |   ├── components         // 自定义组件
|   |   ├── pages
|   |   ├── router
|   |   ├── services
|   |   ├── store              // 状态管理
|   |   └── utils
|   |   ├── index.js
│   ├── craco.config.js
│   ├── package.json
│   ├── yarn.lock
│   ├── README.md              // 项目文档
```




## 项目功能 ✨

- [x] 歌曲推荐
- [x] 歌曲搜索
- [x] 歌曲下载❕
- [x] 歌曲分享
- [x] 歌曲播放和歌词显示
- [x] 进度条和音量控制
- [x] 播放模式选项
- [ ] 歌曲榜单
- [ ] 历史记录




## 问题记录 🤔

### 1. 歌曲下载

在HTML5的 `a标签` 中新增了 `dowmload` 属性 ，可实现文件的下载并重命名。但由于 `a标签` 存在跨域问题，需通过将外链地址转化成内链的方式，才能实现在播放器的当前页面进行下载。详见：[Web 文件下载和 A 标签的使用](http://175.178.71.181/index.php/archives/8.html)

源码如下：

```javascript
const loadDownSong = (musicId, musicName) => {
  if (musicId == undefined) return false;

  getSongSource(musicId).then(res => {
    const songUrl = res?.url?.data?.url ?? "";
    if (songUrl) {
      fetch(songUrl)
      .then(response => response.blob())
      .then(blob => {
        const objectURL = window.URL.createObjectURL(blob);
        const newA = document.createElement('a');
        newA.href = objectURL;
        newA.download = musicName;
        newA.click();
        window.URL.revokeObjectURL(objectURL);
      });
      message.info("已在后台开启下载", 1);
    } else {
      message.info("未知该歌曲源地址", 1);
    }
  });
}
```



## 部分效果 🔥

![播放器首页](https://gitee.com/shaodong-wu/blog-image/raw/master/2022-03-08/image-20220308000550253.webp)

<p style="font-size: 13px; text-align: center;">播放器首页 (一)</p>



![播放器搜索](https://gitee.com/shaodong-wu/blog-image/raw/master/2022-03-08/image-20220308000643351.webp)

<p style="font-size: 13px; text-align: center;">播放器搜索 (二)</p>



![播放效果图](https://gitee.com/shaodong-wu/blog-image/raw/master/2022-03-08/image-20220308000748012.webp)

<p style="font-size: 13px; text-align: center;">播放器播放 (三)</p>



![外链分享](https://gitee.com/shaodong-wu/blog-image/raw/master/2022-03-08/image-20220308000837597.webp)

<p style="font-size: 13px; text-align: center;">播放器外链 (四)</p>



![歌曲信息](https://gitee.com/shaodong-wu/blog-image/raw/master/2022-03-08/image-20220308000920765.webp)

<p style="font-size: 13px; text-align: center;">播放器歌曲信息 (五)</p>



![播放列表](https://gitee.com/shaodong-wu/blog-image/raw/master/2022-03-08/image-20220308001006164.webp)

<p style="font-size: 13px; text-align: center;">播放器播放列表 (六)</p>



![歌曲下载](https://gitee.com/shaodong-wu/blog-image/raw/master/2022-03-08/image-20220308001331027.webp)

<p style="font-size: 13px; text-align: center;">播放器下载 (七)</p>




## 免责声明 👊

本项目的部分资源、UI 设计以及软件仅用于个人学习开发测试，勿用于商业及非法用途，如产生法律纠纷与本人无关。

**如此项目造成侵权损失，请联系本人删除：[2361954836@qq.com](mailto:2361954836@qq.com)**
