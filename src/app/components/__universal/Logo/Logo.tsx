import * as React from 'react';
import './Logo.scss';

export namespace Logo {
    export interface Props {

    }
}

export const Logo = (props:Logo.Props) => (
    <h1 className='logo'>
        track<div className='logo-o'>o</div>
    </h1>
);
