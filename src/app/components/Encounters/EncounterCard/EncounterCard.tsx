import * as React from 'react';
import { Item } from "app/models/EncounterModel";
import { EncounterItem } from "app/components/Encounters/EncounterCard/EncounterItem/EncounterItem";

import './EncounterCard.scss';

export namespace EncounterCard {
    export interface Props {
        id:number,
        name:string,
        isActive:boolean,
        items:Array<Item>,
        onClick:(id:number) => void,
    }

    export interface State {
        activeItem:number,
    }
}

export class EncounterCard extends React.Component<EncounterCard.Props, EncounterCard.State> {
    state:EncounterCard.State = {
        activeItem: 0,
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
        } = this.props;

        const {
            activeItem,
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
                                onClick={ isActive ? this.updateActive : () => console.log('Encounter not active > handler disabled') }
                                statuses={ item.statuses }
                                isActive={ isActive && activeItem === item.id }/>
                        ))
                    }
                </ul>
            </div>
        )
    }
}
