import * as React from 'react';
import { Item } from "app/models/EncounterModel";
import { EncounterItem } from "app/components/Encounters/EncounterCard/EncounterItem/EncounterItem";

import './EncounterCard.scss';
import animationContainer from "app/utils/animationContainer/animationContainer";
import { ActionModal } from "app/components/__universal/ActionModal/ActionModal";
import { ConditionsPicker } from "app/components/ConditionsPicker/ConditionsPicker";
import { ConditionModel } from "app/models/ConditionsModel";

export namespace EncounterCard {
    export interface Props {
        id:number,
        name:string,
        isActive:boolean,
        items:Array<Item>,
        addCondition:(encounterId:number, itemId:number, condition:ConditionModel) => void,
        onClick:(id:number) => void,
    }

    export interface State {
        activeItem:number,
        showModal:boolean,
        activeCondition:ConditionModel|null,
    }
}

const AnimatedActionModal = animationContainer(ActionModal);

export class EncounterCard extends React.Component<EncounterCard.Props, EncounterCard.State> {
    state:EncounterCard.State = {
        activeItem: 0,
        showModal:false,
        activeCondition:null,
    };

    updateActive = (id:number) => {
        this.setState({
            activeItem: id,
        })
    };

    render() {
        const {
            id,
            name,
            items,
            onClick,
            isActive,
            addCondition,
        } = this.props;

        const {
            activeItem,
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
                        items.map(item => (
                            <EncounterItem
                                key={ item.id }
                                id={ item.id }
                                name={ item.name }
                                color={ item.color }
                                onClick={ isActive ? this.updateActive : () => console.log('Encounter not active > handler disabled') }
                                addStatus={ () => this.setState({ showModal: true }) }
                                statuses={ item.statuses }
                                isActive={ isActive && activeItem === item.id }/>
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
                        if(activeCondition) addCondition(id, activeItem, activeCondition);
                        this.setState({ showModal: false })
                    } }>
                    <ConditionsPicker
                        dispatchAction={ condition => this.setState({ activeCondition: condition }) }/>
                </AnimatedActionModal>
            </div>
        )
    }
}
