import * as React from "react";

import svg from "app/utils/svg";
import animationContainer from "app/utils/animationContainer/animationContainer";

import Button from "app/components/__universal/Button/Button";
import { EncounterCard } from "app/components/Encounters/EncounterCard/EncounterCard";
import { AddEncounterForm } from "app/components/AddEncounterForm/AddEncounterForm";

import { EncounterModel, EncounterModelProps } from "app/models/EncounterModel";
import { ConditionModel } from "app/models/ConditionsModel";
import { ActionModal } from "app/components/__universal/ActionModal/ActionModal";
import { FormState } from "redux-form";

import './Encounters.scss';

export namespace Encounters {
    export interface Props {
        actions:encountersActions;
        encounters:Array<EncounterModel>|undefined;
        activeCampaign?:string;
        formData:FormState;
    }

    export interface State {
        showAddEncounterModal:boolean;
    }

    export type encountersActions = {
        fetchEncounters:() => void;
        initEncountersListener:() => void;
        addEncounter:(encounter:EncounterModelProps) => void;
        updateEncounter:(encounter:EncounterModel) => void;
        initMockEncounters:() => void;
        setActiveEncounter:(id:string) => void;
        addCondition:(encounterId:string, itemId:number, condition:ConditionModel) => void;
    }
}

const AnimatedActionModal = animationContainer(ActionModal);

export class Encounters extends React.Component<Encounters.Props, Encounters.State> {
    state:Encounters.State = {
        showAddEncounterModal: false,
    };

    updateActiveEncounter = (id:string) => {
        const { actions: { updateEncounter }, encounters } = this.props;

        if(encounters) {
            for(let encounter of encounters) {
                if(encounter.id === id) {
                    const updatedEncounter = new EncounterModel(encounter);
                    console.log(updatedEncounter);
                    updatedEncounter.setActive();

                    updateEncounter(updatedEncounter);
                } else {
                    const updatedEncounter = new EncounterModel(encounter);
                    updatedEncounter.setInactive();

                    updateEncounter(updatedEncounter);
                }
            }
        }
    };

    render() {
        const { encounters, actions, formData, activeCampaign } = this.props;
        const { showAddEncounterModal } = this.state;

        return(
            <section className="app-encounters">
                <h2>
                    Encounters
                </h2>
                <div className="encounters-container">
                    {
                        encounters && encounters.filter(encounter => encounter.campaignId === activeCampaign).sort((a, b) => a.name.localeCompare(b.name)).map(encounter => (
                                <EncounterCard
                                    id={ encounter.id }
                                    key={ encounter.id }
                                    name={ encounter.name }
                                    participants={ encounter.participants }
                                    updateEncounter={ id => {
                                        const updatedEncounter = new EncounterModel(encounter);

                                        for(let participant of updatedEncounter.participants) {
                                            if(participant.id === id) {
                                                participant.isActive = true;
                                            } else if (participant.isActive) {
                                                participant.isActive = false;
                                            }
                                        }

                                        actions.updateEncounter(updatedEncounter);
                                    } }
                                    addCondition={ actions.addCondition }
                                    onClick={ this.updateActiveEncounter }
                                    isActive={ encounter.isActive }/>
                            )
                        )
                    }
                </div>

                <AnimatedActionModal
                    header='Create Encounter'
                    description='Below, you can create a new encounter'
                    onCancel={ () => this.setState({ showAddEncounterModal: false }) }
                    identifier='add-encounter-modal'
                    isMounted={ showAddEncounterModal }>
                    {
                        activeCampaign && <AddEncounterForm
                            formData={ formData }
                            currentCampaign={ activeCampaign }
                            addEncounter={ actions.addEncounter }
                            closeModal={ () => this.setState({ showAddEncounterModal: false }) }/>
                    }
                </AnimatedActionModal>
                <Button
                    buttonClass='add-encounter'
                    label={ svg.add }
                    onSubmit={ () => this.setState({ showAddEncounterModal: true }) }/>
            </section>
        )
    }
}
