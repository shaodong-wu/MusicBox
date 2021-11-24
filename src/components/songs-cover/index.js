import React, { memo } from 'react';
import { CoverWrapper } from './style';


export default memo(function SongCover(props) {

    return (
        <CoverWrapper>
            <img className="music-cover" src={props.coverImgUrl || ""}
                onError={e => {e.target.src = props.defaultImage}}/>
        </CoverWrapper>
    )
});