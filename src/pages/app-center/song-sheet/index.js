import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { getImageUrl } from '@/utils/format-utils';

import { musicList } from '@/common/musicList-data';

import { SongSheetWrapper } from './style';



export default memo(function SongSheet(props) {

    const { currentResultCover = "", currentSongCover = "" } = props.sheetView.state;

    return (
        <SongSheetWrapper>
            {
                musicList.map((item, index) => {
                    console.log(props);
                    return (
                        <NavLink key={index} to={item.link || ""}>
                            <div className="sheet-item" data-no={index}>
                                <img className="sheet-cover" src={
                                    index === 0 ? currentResultCover : (
                                        index === 1 ? currentSongCover : getImageUrl(item.cover)
                                    )
                                }
                                    onError={e => { e.currentTarget.src = getImageUrl(item.cover) }} />
                                <p className="sheet-name">{item.name}</p>
                            </div>
                        </NavLink>
                    )
                })
            }
        </SongSheetWrapper>
    )
});