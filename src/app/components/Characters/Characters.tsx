import * as React from "react";

import svg from "app/utils/svg";
import animationContainer from "app/utils/animationContainer/animationContainer";

import Button from "app/components/__universal/Button/Button";
import { CharacterCard } from "app/components/Characters/CharacterCard/CharacterCard";
import { AddCharacterForm } from "app/components/AddCharacterForm/AddCharacterForm";

import { CharacterModel, ICharacterModel } from "app/models/CharacterModel";
import { ActionModal } from "app/components/__universal/ActionModal/ActionModal";
import { FormState } from "redux-form";

import './Characters.scss';
import { CampaignModel } from "app/models/CampaignModel";

export namespace Characters {
    export interface Props {
        actions:charactersActions;
        characters:Array<CharacterModel>|undefined;
        campaigns?:CampaignModel[];
        activeCampaign?:string;
        formData:FormState;
    }

    export interface State {
        showAddCharacterModal:boolean;
    }

    export type charactersActions = {
        fetchCharacters:() => void;
        initCharactersListener:() => void;
        addCharacter:(character:ICharacterModel) => void;
        updateCharacter:(character:CharacterModel) => void;
    }
}

const AnimatedActionModal = animationContainer(ActionModal);

export class Characters extends React.Component<Characters.Props, Characters.State> {
    state:Characters.State = {
        showAddCharacterModal: false,
    };

    protected _getRelevantCharacters = ():CharacterModel[] => {
        const {
            characters,
            activeCampaign,
        } = this.props;

        let result:CharacterModel[] = [];

        if (characters) {
            if (activeCampaign) {
                result = characters.filter(character => character.campaignId === activeCampaign)
                    .sort((a, b) => a.name.localeCompare(b.name));
            }
            else {
                result = characters.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        return result;
    };

    render() {
        const { actions, formData, campaigns } = this.props;
        const { showAddCharacterModal } = this.state;

        return (
            <section className="app-characters">
                <h2>
                    Characters
                </h2>
                <div className="characters-container">
                    {
                        this._getRelevantCharacters().sort((a, b) => a.name.localeCompare(b.name)).map(character => (
                                <CharacterCard
                                    id={ character.id }
                                    key={ character.id }
                                    character={ character }
                                    updateCharacter={ () => {
                                        const updatedCharacter = new CharacterModel(character);

                                        actions.updateCharacter(updatedCharacter);
                                    } }/>
                            )
                        )
                    }
                </div>

                <AnimatedActionModal
                    header='Create Character'
                    description='Below, you can create a new character'
                    onCancel={ () => this.setState({ showAddCharacterModal: false }) }
                    identifier='add-character-modal'
                    isMounted={ showAddCharacterModal }>
                    <AddCharacterForm
                        formData={ formData }
                        campaigns={ campaigns }
                        addCharacter={ actions.addCharacter }
                        closeModal={ () => this.setState({ showAddCharacterModal: false }) }/>
                </AnimatedActionModal>
                <Button
                    buttonClass='add-character'
                    label={ svg.add }
                    onSubmit={ () => this.setState({ showAddCharacterModal: true }) }/>
            </section>
        )
    }
}
