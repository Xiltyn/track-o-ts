import * as React from 'react';

import animationContainer from "app/utils/animationContainer/animationContainer";

import { EncounterItem } from "app/components/Encounters/EncounterCard/EncounterItem/EncounterItem";
import { ActionModal } from "app/components/__universal/ActionModal/ActionModal";
import { ConditionsPicker } from "app/components/ConditionsPicker/ConditionsPicker";

import { ConditionModel } from "app/models/ConditionsModel";
import { Item } from "app/models/EncounterModel";
import './EncounterCard.scss';

export namespace EncounterCard {

    export interface Props {
        id:string,
        name:string,
        updateEncounter:(id:number) => void,
        isActive:boolean,
        items:Array<Item>,
        addCondition:(encounterId:string, itemId:number, condition:ConditionModel) => void,
        onClick:(id:string) => void,
    }

    export interface State {
        showModal:boolean,
        activeCondition:ConditionModel|null,
    }
}

const AnimatedActionModal = animationContainer(ActionModal);

export class EncounterCard extends React.Component<EncounterCard.Props, EncounterCard.State> {
    state:EncounterCard.State = {
        showModal:false,
        activeCondition:null,
    };

    render() {
        const {
            id,
            name,
            items,
            onClick,
            isActive,
            addCondition,
            updateEncounter,
        } = this.props;

        const {
            showModal,
            activeCondition,
        } = this.state;

        return(
            <div
                onClick={ () => onClick( id ) }
                className={ `encounter ${ isActive ? 'active' : '' }` }>
                <header className="encounter-name">
                    <h3>{ name }</h3>
                </header>
                <ul className="encounter-items">
                    {
                        items.sort((a:Item, b:Item) => b.roll - a.roll).map(item => (
                            <EncounterItem
                                key={ item.id }
                                id={ item.id }
                                name={ item.name }
                                color={ typeof item.color === "string" ? item.color : '#F15025' }
                                onClick={ isActive ? updateEncounter : () => console.log('Encounter not active > handler disabled') }
                                addStatus={ () => this.setState({ showModal: true }) }
                                statuses={ item.statuses }
                                isActive={ item.isActive && isActive }/>
                        ))
                    }
                </ul>
                <AnimatedActionModal
                    isMounted={ showModal }
                    header={ 'Add Status' }
                    identifier={ 'conditions' }
                    description={ 'Choose a status from the ones below to add to the creature' }
                    onCancel={ () => this.setState({ showModal: false }) }
                    onConfirm={ () => {
                        const activeItem = items.find(el => el.isActive);
                        if(activeCondition && activeItem) addCondition(id, activeItem.id, activeCondition);
                        this.setState({ showModal: false })
                    } }
                    enableNav>
                    <ConditionsPicker
                        dispatchAction={ condition => this.setState({ activeCondition: condition }) }/>
                </AnimatedActionModal>
            </div>
        )
    }
}