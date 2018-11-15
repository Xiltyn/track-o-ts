import * as React from 'react';
import './Logo.scss';

export namespace Logo {
    export interface Props {

    }
}

export const Logo = (props:Logo.Props) => (
    <h1 className='logo'>
        <span className='big-letter'>t</span>rack<span className='logo-o'>o</span>
    </h1>
);
