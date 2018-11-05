import * as React from 'react';
import './AppLoader.scss';

export namespace appLoader {
    export interface Props {
        type: loaderType,
    }

    export enum loaderType {
        FULL = 'full-screen',
        CONTAIN = 'contain',
    }
}

export const AppLoader = (props:appLoader.Props) => {
    const {
        type
    } = props;

    return (
        <div className={ `loader-container ${ type }` }>
            <div className="spinner-container">
                <span className="spinner"/>
            </div>
        </div>
    );
}
