import styled from 'styled-components';


export const LyricWrapper = styled.div.attrs({
    id: "lyric_box"
})`
    /* 歌词显示区域 */
    position: absolute;
    left: 10px;
    right: 10px;
    top: 195px;
    bottom: 10px;
    overflow: hidden;
    text-align: center;
    color: #bdbdbe;
    color: rgba(225,225,225,.8);
    line-height: 28px;
    padding: 20px 0;

    /* 歌词ul */
    #lyric {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        overflow: hidden;

        /*滚动条美化*/
        &::-webkit-scrollbar{
            width:0;
            height:0
        }
    }
    #lyric>li {
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }


    /* 正在播放的那一句歌词 */
    #lyric .lplaying {
        color: #31c27c;
    }

    /* 歌词显示区显示的提示语(如加载中、无歌词等) */
    .lyric-tip {
        position: absolute;
        width: 100%;
        top: 50%;
    }
`;