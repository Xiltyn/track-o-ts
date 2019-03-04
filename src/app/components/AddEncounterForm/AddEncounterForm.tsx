import * as React from 'react';
import { Field, FieldArray, Form, FormState, InjectedFormProps, reduxForm, WrappedFieldArrayProps, } from "redux-form";

import { InputField } from "../__universal/InputField/InputField";

import './AddEncounterForm.scss';
import Button from "../__universal/Button/Button";
import svg from "../../utils/svg";
import { validate } from "./AddEncounterForm.validation";
import { EncounterModelProps } from "app/models/EncounterModel";
import NumberPicker from 'react-widgets/lib/NumberPicker';
import { SelectField } from "app/components/__universal/SelectField/SelectField";
import { CampaignModel } from "app/models/CampaignModel";
import { CharacterModel } from "app/models/CharacterModel";

const simpleNumberLocalizer = require('react-widgets-simple-number');

simpleNumberLocalizer();

export namespace AddEncounterFormComponent {
    export interface Props {
        closeModal:() => void;
        formData?:FormState;
        campaigns?:CampaignModel[];
        characters?:CharacterModel[];
        currentCampaign?:string;
        addEncounter:(encounter:EncounterModelProps) => void;
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

const Members = (props:WrappedFieldArrayProps<{ name?:string, roll?:number }>) => (
    <ul className='new-member-list'>
        <li className='member add-new'>
            <Button label='Add new' onSubmit={ () => props.fields.push({} as any) }/>
        </li>
        {
            props.fields.map((field, index) => (
                <li key={ index } className="member">
                    <Field
                        className="member-input-name"
                        name={ `${ field }_fields.name` }
                        component={ renderField }
                        placeholder='Ugly Troll'/>
                    <Field
                        className="member-input-roll"
                        name={ `${ field }_fields.roll` }
                        component={ renderNumberPicker }
                        defaultValue={ 10 }
                        min={ 1 }
                        max={ 50 }
                        label={ `Initiative for Party #${ index + 1 }` }/>
                    <Button label={ svg.return } onSubmit={ () => props.fields.remove(index) }/>
                </li>
            ))
        }
    </ul>
);

class AddEncounterFormComponent
    extends React.Component<AddEncounterFormComponent.Props&InjectedFormProps<{}, AddEncounterFormComponent.Props>> {

    private submitNew = () => {
        const { formData, addEncounter, currentCampaign } = this.props;

        if (formData && formData.values && (formData.values.encounter_name && formData.values.members && currentCampaign)) {
            const payload:EncounterModelProps = {
                name: formData.values.encounter_name,
                campaignId: currentCampaign,
                participants: formData.values.members.map((el:{ _fields:{ [ key:string ]:any } }, index:number) => ({
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

    protected _getCampaignSelectData = () => {
        const { campaigns } = this.props;
        let result:{ id:number, name:string, label:string }[] = [];

        if (campaigns) {
            result = campaigns.map((camp, index) => ({
                id: index,
                name: camp.name,
                label: camp.name,
            }))
        }

        return result;
    };

    render() {
        const { handleSubmit, closeModal, currentCampaign, formData, characters, campaigns } = this.props;
        const selectedCampaign = campaigns && campaigns.find(
            camp => camp.name === (formData && formData.values && formData.values.encounter_campaign) || camp.id === currentCampaign);
        const selectedCampaignId = selectedCampaign && selectedCampaign.id;

        console.log(characters);

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
                {
                    !currentCampaign &&
                    <div className="encounter-campaign">
                        <Field
                            name="encounter_campaign"
                            placeholder="Select Character's Campaign"
                            label="Character campaign"
                            data={ this._getCampaignSelectData() }
                            component={ SelectField as any }/>
                    </div>
                }
                {
                    selectedCampaign &&
                    <div className='encounter-characters'>
                        <h3>Characters from { selectedCampaign.name }</h3>
                        {
                            characters && characters.filter(chara => chara.campaignId === selectedCampaignId)
                                .map((chara, index) =>
                                    <div className='character-info' key={ index }>
                                        <p className='meta'>
                                            <span>{ chara.name }</span> | { chara.class }
                                        </p>
                                        <div className='stats'>
                                            <div className='row'>{ svg.ac } <span>{ chara.ac }</span></div>
                                            <div className='row'>{ svg.hp } <span>{ chara.hp }</span></div>
                                        </div>
                                    </div>)
                        }
                    </div>
                }
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
