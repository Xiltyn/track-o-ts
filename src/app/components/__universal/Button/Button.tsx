import React from 'react';
import './Button.scss';
import { AppLoader } from "app/components";

type ButtonProps = {
    onSubmit: any,
    isBusy: boolean,
    buttonClass?: string,
}

const Button = (props:ButtonProps) => (
    <button
        className={ `btn ${ props.buttonClass ? props.buttonClass : '' } ${ props.isBusy ? 'busy' : '' }` }
        onClick={ props.onSubmit }>
        <span>
            { props.isBusy ?
                <AppLoader style={ {
                    width: 24,
                    height: 24,
                    margin: '-12px',
                } }/>
                : 'Sign In' }
        </span>
    </button>
);

export default Button;
