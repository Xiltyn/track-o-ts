import * as React from "react";

import svg from "app/utils/svg";
import animationContainer from "app/utils/animationContainer/animationContainer";

import Button from "app/components/__universal/Button/Button";
import { EncounterCard } from "app/components/Encounters/EncounterCard/EncounterCard";
import { AddEncounterForm } from "app/components/AddEncounterForm/AddEncounterForm";

import { EncounterModel, EncounterModelProps } from "app/models/EncounterModel";
import { ConditionModel } from "app/models/ConditionsModel";
import './Encounters.scss';
import { ActionModal } from "app/components/__universal/ActionModal/ActionModal";
import { FormState } from "redux-form";

export namespace Encounters {
    export interface Props {
        actions:encountersActions,
        encounters:Array<EncounterModel>|undefined,
        formData:FormState;
    }

    export interface State {
        showAddEncounterModal:boolean,
    }

    export type encountersActions = {
        fetchEncounters:() => void,
        addEncounter:(encounter:EncounterModelProps) => void,
        initEncountersListener:() => void,
        updateEncounter:(encounter:EncounterModel) => void,
        initMockEncounters:() => void,
        setActiveEncounter:(id:string) => void,
        addCondition:(encounterId:string, itemId:number, condition:ConditionModel) => void,
    }
}

const AnimatedActionModal = animationContainer(ActionModal);

export class Encounters extends React.Component<Encounters.Props, Encounters.State> {
    state:Encounters.State = {
        showAddEncounterModal: false,
    };

    componentDidMount() {
        const { actions: { fetchEncounters, initEncountersListener } } = this.props;

        fetchEncounters();
        initEncountersListener();

        //firebaseDb.collection('encounters').doc('iyNPovVMfHL1nqhfbMyR').get().then(res => console.log(res.data()));

        //if(initMockEncounters) initMockEncounters();
    }

    updateActiveEncouter = (id:string) => {
        const { actions: { updateEncounter }, encounters } = this.props;

        if(encounters) {
            for(let encounter of encounters) {
                if(encounter.id === id) {
                    const updatedEncounter = new EncounterModel(encounter);
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
        const { encounters, actions, formData } = this.props;
        const { showAddEncounterModal } = this.state;

        return(
            <section className="app-encounters">
                <h2>
                    Encounters
                </h2>
                <div className="encounters-container">
                    {
                        encounters && encounters.sort((a, b) => a.name.localeCompare(b.name)).map(encounter => (
                                <EncounterCard
                                    id={ encounter.id }
                                    key={ encounter.id }
                                    name={ encounter.name }
                                    items={ encounter.items }
                                    updateEncounter={ id => {
                                        const updatedEncounter = new EncounterModel(encounter);

                                        for(let item of updatedEncounter.items) {
                                            if(item.id === id) {
                                                item.isActive = true;
                                            } else if (item.isActive) {
                                                item.isActive = false;
                                            }
                                        }

                                        actions.updateEncounter(updatedEncounter);
                                    } }
                                    addCondition={ actions.addCondition }
                                    onClick={ this.updateActiveEncouter }
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
                    <AddEncounterForm
                        formData={ formData }
                        addEncounter={ actions.addEncounter }
                        closeModal={ () => this.setState({ showAddEncounterModal: false }) }/>
                </AnimatedActionModal>
                <Button
                    buttonClass='add-encounter'
                    label={ svg.add }
                    onSubmit={ () => this.setState({ showAddEncounterModal: true }) }/>
            </section>
        )
    }
}
