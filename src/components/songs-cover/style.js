import styled from 'styled-components';
import { DEFAULT_FRAME_IMG } from '@/common/static-data';
import { getImageUrl } from '@/utils/format-utils.js';


export const CoverWrapper = styled.div`
    /* 歌曲封面区域 */
    position: relative;
    display: block;
    width: 186px;
    height: 186px;
    margin: auto;

    &:after {
        content: "";
        position: absolute;
        left: 9px;
        top: 0;
        width: 201px;
        height: 180px;
        background: url(${getImageUrl(DEFAULT_FRAME_IMG)}) 0 0 no-repeat;
        pointer-events: none;
    }

    /* 歌曲封面图片 */
    .music-cover {
        vertical-align: middle;
        width: 186px;
        height: 186px;
    }
`;