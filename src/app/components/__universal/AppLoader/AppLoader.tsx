import React from 'react';
import './AppLoader.scss';

export namespace AppLoader {
    export interface Props {
        /** Additional inline styles object for parsing dynamic styles */
        style?:Object,
        /** Height of the spinner in pixels */
        height?:number,
        /** Width of the spinner in pixels */
        width?:number,
        invertColors?:boolean,
    }
}

/**
 * Global loading spinner component. Can be used in any container and will position itself in the middle of its parent.
 */
export const AppLoader = (props:AppLoader.Props) => (
    <div
        style={ {
            height: props.height,
            width: props.width,
            ...props.style,
        } }
        className={ `loader-spinner ${ props.invertColors ? 'invert' : '' }` }>
        <div className="dot1"/>
        <div className="dot2"/>
    </div>
);
