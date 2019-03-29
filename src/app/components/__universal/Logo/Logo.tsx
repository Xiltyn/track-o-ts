import * as React from 'react';
import './Logo.scss';

export namespace Logo {
    export interface Props {

    }
}

export const Logo = (props:Logo.Props) => (
    <h1 className='logo'>
        track<div className='logo-o'><img src={ require('../../../../assets/images/track-o_logotype.png') } alt="Track-o Logotype"/></div>
    </h1>
);
