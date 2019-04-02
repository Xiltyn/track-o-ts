import * as React from 'react';

import { ConditionModel } from "app/models/ConditionsModel";
import { CharacterModel } from "app/models/CharacterModel";
import { CardSummary } from "app/components/Characters/CharacterCard/CardSummary/CardSummary";

import './CharacterCard.scss';
import { AddCharacterForm } from 'app/components/AddCharacterForm/AddCharacterForm';
import { FormState } from "redux-form";
import { CampaignModel } from "app/models/CampaignModel";

export namespace CharacterCard {

    export interface Props {
        id?:string;
        formData:FormState;
        character:CharacterModel;
        campaigns?:CampaignModel[];
        style?:React.CSSProperties;
        updateCharacter:(updated:CharacterModel) => void;
        setActive:(id:string) => void;
        onClick?:(id:string) => void;
    }

    export interface State {
        showModal:boolean;
        activeCondition:ConditionModel|null;
    }
}

export class CharacterCard extends React.Component<CharacterCard.Props, CharacterCard.State> {
    state:CharacterCard.State = {
        showModal: false,
        activeCondition: null,
    };

    render() {
        const {
            character,
            style,
            setActive,
            updateCharacter,
            formData,
            campaigns,
        } = this.props;

        const characterCampaign = campaigns && campaigns.find(camp => camp.id === character.campaignId);

        return (
            <div
                onClick={ () => character.id && !character.isActive && setActive(character.id) }
                style={ style }
                className={ `character-container ${ character.isActive ? 'active' : '' }` }>

                <div className={ `character ${ character.class && character.class.toLowerCase() } ${ character.isActive ? 'active' : '' }` }>
                    {
                        character.isActive ?
                            <div className='card-form back'>
                                <AddCharacterForm
                                    formData={ formData }
                                    campaigns={ campaigns }
                                    currentCharacter={ character }
                                    initialValues={ {
                                        ...character.formData,
                                        character_campaign: characterCampaign && characterCampaign.name,
                                    } }
                                    editCharacter={ updateCharacter }
                                    closeModal={ () => character.id && setActive(character.id) }/>
                            </div> :
                            <CardSummary
                                chara={ character }/>
                    }
                </div>

            </div>
        )
    }
}
