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
import { CampaignModel } from "app/models/CampaignModel";

const simpleNumberLocalizer = require('react-widgets-simple-number');

simpleNumberLocalizer();

export namespace AddCharacterFormComponent {
    export interface Props {
        closeModal:() => void;
        formData:FormState;
        currentCampaign?:string;
        campaigns?:CampaignModel[];
        addCharacter:(character:ICharacterModel) => void;
    }
}

const renderNumberPicker = (props:any) => <NumberPicker
    inputProps={ props.input }
    onChange={ props.input.onChange }
    { ...props }
/>;


class AddCharacterFormComponent
    extends React.Component<AddCharacterFormComponent.Props&InjectedFormProps<{}, AddCharacterFormComponent.Props>> {

    private submitNew = () => {
        const { formData: { values }, addCharacter, currentCampaign, campaigns } = this.props;
        const currentCampaignObject = (campaigns && values) && campaigns.find(camp => camp.name === values.character_campaign);

        if (values && (values.character_name)) {
            const payload:ICharacterModel = {
                name: values.character_name,
                class: values.character_class,
                ac: values.character_ac || 10,
                hp: values.character_hp || 10,
                campaignId: currentCampaign || currentCampaignObject && currentCampaignObject.id || '',
            };

            addCharacter(payload);
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
        const { handleSubmit, closeModal, currentCampaign } = this.props;

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
                {
                    !currentCampaign &&
                        <div className="character-campaign">
                            <Field
                                name="character_campaign"
                                placeholder="Select Character's Campaign"
                                label="Character campaign"
                                data={ this._getCampaignSelectData() }
                                component={ SelectField as any }/>
                        </div>
                }
                <div className="character-class">
                    <Field
                        name="character_class"
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
