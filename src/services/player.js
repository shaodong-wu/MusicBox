import request from './request';


export function getSongList(key, pageNo=1, pageSize=30) {
    return request({
        url: "/songlist",
        params: {
            key,
            pageNo,
            pageSize
        }
    });
}

export function getLyric(musicid) {
    return request({
        url: "/songlrc",
        params: {
            musicid
        }
    });
}

export function getSongSource(musicid, bit=320) {
    return request({
        url: "/songsource",
        params: {
            musicid,
            bit
        }
    });
}