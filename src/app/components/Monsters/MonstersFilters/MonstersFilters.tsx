import * as React from 'react';
import { reduxForm, InjectedFormProps, Form, Field, FormState } from "redux-form";
import { InputField } from "app/components/__universal/InputField/InputField";

import './MonstersFilters.scss';

export namespace MonstersFiltersForm {
    export interface Props {
        updateForm:(form:string, field:string, value:any) => void;
        initialValues:formProps;
        formData?:FormState;
        fixToTop?:boolean;
    }

    export type formProps = {
        [key:string]:string|boolean|undefined;
        search?:string;
        sortByName?:boolean;
        sortByCr?:boolean;
        sortByAc?:boolean;
        sortByHp?:boolean;
    }
}

class MonstersFiltersForm extends React.Component<MonstersFiltersForm.Props & InjectedFormProps<MonstersFiltersForm.formProps, MonstersFiltersForm.Props>> {

    private handleChange = (...args:any) => {
        const { initialValues, updateForm, formData } = this.props;

        if(formData && formData.values && Object.keys(formData.values).filter(key => !!key.includes('sortBy')).length) {
            for(let key of Object.keys(formData.values)) {
                if(formData.values[key] === true && key !== args[3]) {
                    updateForm('monsters_filters', key, false);
                }
            }
        } else {
            for(let key of Object.keys(initialValues)) {
                if(initialValues[key] === true && key !== args[3]) {
                    updateForm('monsters_filters', key, false);
                }
            }
        }
    };

    public render():React.ReactNode {
        const {
            handleSubmit,
            fixToTop,
        } = this.props;

        return (
            <div className={ `monsters-filters ${fixToTop ? 'isFixed' : ''}` }>
                <Form
                    className="filters-form"
                    onSubmit={ handleSubmit }>
                    <InputField
                        name='search'
                        className='search-field'
                        label='Search'
                        placeholder='E.g. Tarrasque'/>
                    <div className="sort-by">
                        <span>Sort By</span>
                        <div className="checkbox">
                            <label htmlFor="sortByName">Name</label>
                            <Field
                                name='sortByName'
                                component='input'
                                type='checkbox'
                                onChange={ this.handleChange }/>
                        </div>
                        <div className="checkbox">
                            <label htmlFor="sortByCr">CR</label>
                            <Field
                                name='sortByCr'
                                component='input'
                                type='checkbox'
                                onChange={ this.handleChange }/>
                        </div>
                        <div className="checkbox">
                            <label htmlFor="sortByAc">AC</label>
                            <Field
                                name='sortByAc'
                                component='input'
                                type='checkbox'
                                onChange={ this.handleChange }/>
                        </div>
                        <div className="checkbox">
                            <label htmlFor="sortByHp">HP</label>
                            <Field
                                name='sortByHp'
                                component='input'
                                type='checkbox'
                                onChange={ this.handleChange }/>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}

export const MonstersFilters = reduxForm<MonstersFiltersForm.formProps, MonstersFiltersForm.Props>({
    form: 'monsters_filters'
})(MonstersFiltersForm);
