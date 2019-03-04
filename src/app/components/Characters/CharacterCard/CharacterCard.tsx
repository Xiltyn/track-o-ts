import * as React from 'react';

import { ConditionModel } from "app/models/ConditionsModel";

import './CharacterCard.scss';

export namespace CharacterCard {

    export interface Props {
        id?:string,
        name:string,
        updateCharacter:(id:number) => void,
        onClick?:(id:string) => void,
    }

    export interface State {
        showModal:boolean,
        activeCondition:ConditionModel|null,
    }
}

export class CharacterCard extends React.Component<CharacterCard.Props, CharacterCard.State> {
    state:CharacterCard.State = {
        showModal:false,
        activeCondition:null,
    };

    render() {
        const {
            name,
        } = this.props;


        return(
            <div
                className='encounter'>
                <header className="encounter-name">
                    <h3>{ name }</h3>
                </header>
            </div>
        )
    }
}
