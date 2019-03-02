import { WrappedFieldProps } from "redux-form";
import DropdownList from 'react-widgets/lib/DropdownList'
import * as React from "react";

import './SelectField.scss';

export namespace SelectField {
    export interface Props extends WrappedFieldProps {
        data?:Data[],
        busy?:boolean,
        label?:string,
        type?:selectType,
        placeholder?:string,
    }

    export interface Data {
        id:number,
        name:string,
        label?:string,
    }
}

export enum selectType {
    PRIMARY = 'primary'
}

const ItemComponent = (props:{[key:string]: any, item: SelectField.Data}) => {
    const { item: { name, label } } = props;

    return <div className="item-component">
        <div>{ label || name }</div>
    </div>
};

export const SelectField = (props:SelectField.Props) => {
    const { label, input, busy, placeholder, data, meta, type } = props;

    return data && <div className={ `select-field ${'select-field--' + type || selectType.PRIMARY}`  }>
        {
            label && <label>
                { label }
            </label>
        }

        <DropdownList
            { ...input }
            busy={ busy }
            placeholder={ placeholder }
            itemComponent={ ItemComponent }
            valueField='id'
            textField='label'
            name='select-field'
            data={ data }
            onChange={ value => input.onChange(value.id) }
        />

        { meta.touched && meta.error &&
          <span className="error">{ meta.error }</span> }
    </div>;
};
