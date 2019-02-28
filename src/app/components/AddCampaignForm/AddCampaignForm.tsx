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

import Button from "../__universal/Button/Button";
import svg from "../../utils/svg";
import { validate } from "./AddCampaignForm.validation";
import { ICampaignModel } from "app/models/CampaignModel";

import './AddCampaignForm.scss';

export namespace AddCampaignFormComponent {
    export interface Props {
        closeModal: () => void;
        formData:FormState;
        addCampaign: (campaign:ICampaignModel) => void;
    }
}

const renderField = (props:any) => (
    <div className={ props.className }>
        {
            props.label && <label>{ props.label }</label>
        }
        <div>
            <input value={ props.input.value } onChange={ (evt:React.ChangeEvent) => {
                evt.persist();
                props.input.onChange(evt);
            } } type={ props.type } placeholder={ props.placeholder }/>
            { props.touched && props.error && <span>{ props.error }</span> }
        </div>
    </div>
);

const Players = (props:WrappedFieldArrayProps<AddCampaignFormComponent.Props>) => (
    <div className="new-players-list-container">
        <div className='add-new'>
            <Button label='Add new player' onSubmit={ () => props.fields.unshift({} as any) }/>
        </div>

        <ul className='new-player-list'>
            {
                props.fields.map((field, index) => (
                    <li key={ index } className="player">
                        <Field
                            className="player-input-name"
                            name={ `${field}_fields.email` }
                            component={ renderField }
                            placeholder='player@mail.com'/>
                        <Button label={ svg.return } onSubmit={ () => props.fields.remove(index) }/>
                    </li>
                ))
            }
        </ul>
    </div>
);

class AddCampaignFormComponent extends React.Component<AddCampaignFormComponent.Props & InjectedFormProps<{}, AddCampaignFormComponent.Props>> {

    private submitNew = () => {
        const { formData: { values }, addCampaign } = this.props;

        if(values && (values.campaign_name)) {
            const payload:ICampaignModel = {
                name: values.campaign_name,
                encounters: [],
                description: values.campaign_description || '',
                players: values.campaign_players.map((player:{_fields:{email:string}}) => player._fields.email) || []
            };

            addCampaign(payload);
        }

    };

    render() {
        const { handleSubmit, closeModal } = this.props;

        return (
            <Form
                className="add-campaign-form"
                onSubmit={ handleSubmit(this.submitNew) }>
                <div className='campaign-name'>
                    <InputField
                        name='campaign_name'
                        label='Name'
                        placeholder='New Campaign'/>
                    <Field
                        name='campaign_description'
                        component='textarea'
                        placeholder='Campaign description'/>
                </div>

                <FieldArray name='campaign_players' component={ Players }/>

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

export const AddCampaignForm = reduxForm<{}, AddCampaignFormComponent.Props>({
    form: 'add_campaign',
    validate,
})(AddCampaignFormComponent);
