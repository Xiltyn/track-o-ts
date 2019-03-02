import * as React from 'react';
import { Field, Form, FormState, InjectedFormProps, reduxForm, } from "redux-form";

import { InputField } from "../__universal/InputField/InputField";

import './AddCharacterForm.scss';
import Button from "../__universal/Button/Button";
import { validate } from "./AddCharacterForm.validation";
import NumberPicker from 'react-widgets/lib/NumberPicker';
import { classes, ICharacterModel } from "app/models/CharacterModel";
import { SelectField } from "app/components/__universal/SelectField/SelectField";
import svg from "app/utils/svg";

const simpleNumberLocalizer = require('react-widgets-simple-number');

simpleNumberLocalizer();

export namespace AddCharacterFormComponent {
    export interface Props {
        closeModal:() => void;
        formData:FormState;
        currentCampaign:string;
        addCharacter:(character:ICharacterModel, campaignId:string) => void;
    }
}

const renderNumberPicker = (props:any) => <NumberPicker
    inputProps={ props.input }
    onChange={ props.input.onChange }
    { ...props }
/>;

//const renderField = (props:any) => (
//    <div className={ props.className }>
//        <label>{ props.label }</label>
//        <div>
//            <input value={ props.input.value } onChange={ (evt:React.ChangeEvent) => {
//                evt.persist();
//                props.input.onChange(evt);
//            } } type={ props.type } placeholder={ props.placeholder }/>
//            { props.touched && props.error && <span>{ props.error }</span> }
//        </div>
//    </div>
//);

//const Members = (props:WrappedFieldArrayProps<AddCharacterFormComponent.Props>) => (
//    <ul className='new-member-list'>
//        <li className='member add-new'>
//            <Button label='Add new' onSubmit={ () => props.fields.push({} as any) }/>
//        </li>
//        {
//            props.fields.map((field, index) => (
//                <li key={ index } className="member">
//                    { console.log(props) }
//                    <Field
//                        className="member-input-name"
//                        name={ `${field}_fields.name` }
//                        component={ renderField }
//                        placeholder='Some Guy'
//                        label={ `Party #${index + 1}` }/>
//                    <Field
//                        className="member-input-roll"
//                        name={ `${field}_fields.roll` }
//                        component={ renderNumberPicker }
//                        defaultValue={ 10 }
//                        min={ 1 }
//                        max={ 50 }
//                        label={ `Initiative for Party #${index + 1}` }/>
//                    <Button label={ svg.return } onSubmit={ () => props.fields.remove(index) }/>
//                </li>
//            ))
//        }
//    </ul>
//);

class AddCharacterFormComponent
    extends React.Component<AddCharacterFormComponent.Props&InjectedFormProps<{}, AddCharacterFormComponent.Props>> {

    private submitNew = () => {
        const { formData: { values }, addCharacter, currentCampaign } = this.props;

        if (values && (values.character_name && values.members && currentCampaign)) {
            const payload:ICharacterModel = {
                name: values.character_name,
            };

            addCharacter(payload, currentCampaign);
        }

    };

    render() {
        const { handleSubmit, closeModal } = this.props;

        return (
            <Form
                className="add-character-form"
                onSubmit={ handleSubmit(this.submitNew) }>
                <div className='character-name'>
                    <InputField
                        name='character_name'
                        label='Name'
                        placeholder='Drew Sallybottom'/>
                </div>
                <div className="character-class">
                    <Field
                        name="class"
                        placeholder="Select Character Class"
                        label="Character class"
                        data={ classes }
                        component={ SelectField as any }/>
                </div>
                <div className="character-stats">
                    <div className="hit-points">
                        { svg.hp }
                        <Field
                            className="picker character-hp"
                            name="character_hp"
                            component={ renderNumberPicker }
                            defaultValue={ 10 }
                            min={ 1 }
                            max={ 300 }
                            label='Armor Class'/>
                    </div>
                    <div className="armor-class">
                        { svg.ac }
                        <Field
                            className="picker character-ac"
                            name="character_ac"
                            component={ renderNumberPicker }
                            defaultValue={ 10 }
                            min={ 1 }
                            max={ 35 }
                            label='Armor Class'/>
                    </div>
                </div>
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

export const AddCharacterForm = reduxForm<{}, AddCharacterFormComponent.Props>({
    form: 'add_character',
    validate,
})(AddCharacterFormComponent);
