import React from 'react';
import { LogoWrapper } from './style';

export default function LogoHeader(props) {
    // state and props
    const { logoTitle, logoContent, clikSkipUrl } = props;

    return (
        <LogoWrapper>
            <div className="logo" title={logoTitle} onClick={() => window.open(clikSkipUrl)}>
                {logoContent}
            </div>
        </LogoWrapper>
    )
}
