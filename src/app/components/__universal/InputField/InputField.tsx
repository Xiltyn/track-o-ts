import * as React from 'react';
import { Field } from "redux-form";

import './InputField.scss';

export namespace InputField {
    export interface Props {
        name: string,
        type: 'text'|'password'|'number'|'file',
        label?: string,
        className?: string,
        placeholder?: string,
    }

    export interface State {
        isActive: boolean,
    }
}

export class InputField extends React.Component<InputField.Props, InputField.State> {
    static defaultProps:Pick<InputField.Props, 'type'> = {
        type: 'text',
    };

    state:Pick<InputField.State, 'isActive'> = {
        isActive: false,
    };

    render() {
        const {
            name,
            type,
            label,
            className,
            placeholder,
        } = this.props;

        const {
            isActive,
        } = this.state;

        return(
            <div
                className={ `input-container ${ isActive ? 'active' : '' }` }
                onMouseEnter={ () => this.setState({ isActive: true }) }
                onMouseLeave={ () => this.setState({ isActive: false }) }>
                {
                    label && <label htmlFor={ name }>
                        { label }
                    </label>
                }
                <Field
                    name={ name }
                    className={ className ? className : '' }
                    type={ type }
                    placeholder={ placeholder && placeholder }
                    component="input"/>
            </div>
        )
    }
}
