import React from 'react';
import './Button.scss';
import { AppLoader } from "app/components";

type ButtonProps = {
    onSubmit: any,
    isBusy?: boolean,
    label?: string|JSX.Element,
    buttonClass?: string,
}

const Button = (props:ButtonProps) => (
    <button
        className={ `btn ${ props.buttonClass ? props.buttonClass : '' } ${ props.isBusy ? 'busy' : '' } ${ props.label && typeof props.label !== "string" ? 'icon' : '' }` }
        type='button'
        onClick={ props.onSubmit }>
        <div className="btn-label">
            { props.isBusy ?
                <AppLoader style={ {
                    width: 24,
                    height: 24,
                    margin: '-12px',
                } }/>
                : (!props.label ? 'Sign In' : props.label) }
        </div>
    </button>
);

export default Button;
