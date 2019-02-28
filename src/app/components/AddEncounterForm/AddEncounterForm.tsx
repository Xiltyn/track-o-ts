import * as React from 'react';
import {
    Field,
    FieldArray,
    Form, FormState,
    InjectedFormProps,
    reduxForm,
    WrappedFieldArrayProps,
} from "redux-form";

import { InputField } from "../__universal/InputField/InputField";

import './AddEncounterForm.scss';
import Button from "../__universal/Button/Button";
import svg from "../../utils/svg";
import { validate } from "./AddEncounterForm.validation";
import { EncounterModelProps } from "app/models/EncounterModel";
import NumberPicker from 'react-widgets/lib/NumberPicker';
const simpleNumberLocalizer = require('react-widgets-simple-number');

simpleNumberLocalizer();

export namespace AddEncounterFormComponent {
    export interface Props {
        closeModal: () => void;
        formData:FormState;
        currentCampaign:string;
        addEncounter: (encounter:EncounterModelProps) => void;
    }
}

const renderNumberPicker = (props:any) => <NumberPicker
    inputProps={ props.input }
    onChange={ props.input.onChange }
    { ...props }
/>;

const renderField = (props:any) => (
    <div className={ props.className }>
        <label>{ props.label }</label>
        <div>
            <input value={ props.input.value } onChange={ (evt:React.ChangeEvent) => {
                evt.persist();
                props.input.onChange(evt);
            } } type={ props.type } placeholder={ props.placeholder }/>
            { props.touched && props.error && <span>{ props.error }</span> }
        </div>
    </div>
);

const Members = (props:WrappedFieldArrayProps<AddEncounterFormComponent.Props>) => (
    <ul className='new-member-list'>
        <li className='member add-new'>
            <Button label='Add new' onSubmit={ () => props.fields.push({} as any) }/>
        </li>
        {
            props.fields.map((field, index) => (
                <li key={ index } className="member">
                    { console.log(props) }
                    <Field
                        className="member-input-name"
                        name={ `${field}_fields.name` }
                        component={ renderField }
                        placeholder='Some Guy'
                        label={ `Party #${index + 1}` }/>
                    <Field
                        className="member-input-roll"
                        name={ `${field}_fields.roll` }
                        component={ renderNumberPicker }
                        defaultValue={ 10 }
                        min={ 1 }
                        max={ 50 }
                        label={ `Initiative for Party #${index + 1}` }/>
                    <Button label={ svg.return } onSubmit={ () => props.fields.remove(index) }/>
                </li>
            ))
        }
    </ul>
);

class AddEncounterFormComponent extends React.Component<AddEncounterFormComponent.Props & InjectedFormProps<{}, AddEncounterFormComponent.Props>> {

    private submitNew = () => {
        const { formData: { values }, addEncounter, currentCampaign } = this.props;

        if( values && (values.encounter_name && values.members && currentCampaign)) {
            const payload:EncounterModelProps = {
                name: values.encounter_name,
                campaignId: currentCampaign,
                participants: values.members.map((el:{ _fields:{[key:string]: any} }, index:number) => ({
                    name: el._fields.name,
                    roll: el._fields.roll,
                    id: index,
                    color: 'primary',
                    position: index + 1,
                    statuses: [],
                })),
            };

            addEncounter(payload);
        }

    };

    render() {
        const { handleSubmit, closeModal } = this.props;

        return (
            <Form
                className="add-encounter-form"
                onSubmit={ handleSubmit(this.submitNew) }>
                <div className='encounter-name'>
                    <InputField
                        name='encounter_name'
                        label='Name'
                        placeholder='Dragon Fight'/>
                </div>
                <FieldArray name='members' component={ Members }/>
                <div className="modal-controls">
                    <Button
                        label='Close'
                        onSubmit={ (evt:Event) => {
                            evt.preventDefault();
                            closeModal();
                            console.log(this.props.formData);
                        } }
                        isBusy={ false }/>
                    <Button
                        label='Confirm'
                        onSubmit={ handleSubmit(this.submitNew) }
                        isBusy={ false }/>
                </div>
            </Form>
        )
    }
}

export const AddEncounterForm = reduxForm<{}, AddEncounterFormComponent.Props>({
    form: 'add_encounter',
    validate,
})(AddEncounterFormComponent);
