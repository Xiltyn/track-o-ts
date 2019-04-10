import * as React from 'react';
import { EncounterModel } from "app/models/EncounterModel";
import { EncounterCard } from "app/components/Encounters/EncounterCard/EncounterCard";
import { Encounters } from "app/components/Encounters/Encounters";
import { CharacterModel } from "app/models/CharacterModel";

import './ActiveEnounter.scss';
import { CharacterCard } from "app/components/Characters/CharacterCard/CharacterCard";
import { FormState } from "redux-form";
import { config } from "react-spring";
import { Spring } from "react-spring/renderprops-universal";

export namespace ActiveEncounter {
    export interface Props {
        characters:CharacterModel[];
        characterFormData:FormState;
        activeEncounter:EncounterModel;
        actions:Encounters.encountersActions;
    }
}

export class ActiveEncounter extends React.Component<ActiveEncounter.Props> {

    private setActiveParticipant = (participantId:number) => {
        const { activeEncounter, actions } = this.props;
        const updatedEncounter = new EncounterModel(activeEncounter);

        for (let participant of updatedEncounter.participants) {
            if (participant.id === participantId) {
                participant.isActive = true;
            }
            else if (participant.isActive) {
                participant.isActive = false;
            }
        }

        actions.updateEncounter(updatedEncounter);
    };

    public render():React.ReactNode {
        const { activeEncounter, characters, actions, characterFormData } = this.props;

        const isActiveCharacter = activeEncounter.participants.find(el => el.isActive && el.characterId !== null);
        const activeCharacter = isActiveCharacter && characters.find(chara => chara.id === isActiveCharacter.characterId);

        return (
            <div className="active-encounter">
                <div className="preview-container">
                    {
                        activeCharacter &&
                        <Spring
                            from={ { opacity: 0 } }
                            config={ config.slow }
                            to={ {
                                opacity: 1,
                                y: activeCharacter.isActive ? 180 : 0,
                            } }>
                            { ({ y, opacity }) => (
                                <CharacterCard
                                    id={ activeCharacter.id }
                                    style={ {
                                        opacity,
                                        width: 280,
                                        minHeight: 440,
                                        transform: `rotateY(${y}deg)`,
                                    } }
                                    character={ activeCharacter }
                                    formData={ characterFormData }
                                    setActive={ actions.setCharacterActive }
                                    updateCharacter={ actions.updateCharacter }/>
                            ) }
                        </Spring>
                    }
                </div>
                <div className="current-encounter">
                    <EncounterCard
                        encounter={ activeEncounter }
                        updateEncounter={ this.setActiveParticipant }
                        addCondition={ actions.addCondition }/>
                </div>
            </div>
        )
    }
}
