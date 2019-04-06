import * as React from 'react';
import { MonsterSummary } from "app/components/Monsters/MonsterCard/MonsterSummary/MonsterSummary";
import { MonsterDetails } from "app/components/Monsters/MonsterCard/MonsterDetails/MonsterDetails";

import { ConditionModel } from "app/models/ConditionsModel";
import { MonsterModel } from "app/models/MonsterModel";

import './MonsterCard.scss';

export namespace MonsterCard {

    export interface Props {
        id?:string;
        monster:MonsterModel;
        style?:React.CSSProperties;
        setActive?:(id:string) => void;
        setInactive?:(id:string) => void;
        onClick?:(id:string) => void;
    }

    export interface State {
        showModal:boolean;
        activeCondition:ConditionModel|null;
    }
}

export class MonsterCard extends React.Component<MonsterCard.Props, MonsterCard.State> {
    state:MonsterCard.State = {
        showModal: false,
        activeCondition: null,
    };

    render() {
        const {
            monster,
            style,
            setActive,
            setInactive,
        } = this.props;

        return (
            <div
                onClick={ () => setActive && monster.id && setActive(monster.id) }
                style={ style }
                className={ `monster-container ${ monster.isActive ? 'active' : 'inactive' }` }>

                <div className={ `monster ${ monster.isActive ? 'active' : 'inactive' }` }>

                    {
                        !monster.isActive
                            ? <MonsterSummary monster={ monster }/>
                            : <MonsterDetails monster={ monster } setInactive={ setInactive } />
                    }

                </div>

            </div>
        )
    }
}
