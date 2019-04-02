import * as React from 'react';

import { ConditionModel } from "app/models/ConditionsModel";
import { MonsterModel } from "app/models/MonsterModel";

import './MonsterCard.scss';
import svg from "app/utils/svg";

export namespace MonsterCard {

    export interface Props {
        id?:string;
        monster:MonsterModel;
        style?:React.CSSProperties;
        setActive?:(id:string) => void;
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
        } = this.props;

        return (
            <div
                onClick={ () => setActive && monster.id && !monster.isActive && setActive(monster.id) }
                style={ style }
                className={ `monster-container ${ monster.isActive ? 'active' : '' }` }>

                <div className={ `monster ${ monster.isActive ? 'active' : '' }` }>
                    <div className="meta">
                        <h3 className="name">
                            { monster.name }
                        </h3>
                        <p className="details">
                            { monster.meta }
                        </p>
                    </div>
                    <div className='stats'>
                        <div className='col'>{ svg.ac } <span>{ monster.getComputedValue('ac') }</span></div>
                        <div className='col'>{ svg.hp } <span>{ monster.getComputedValue('hp') }</span></div>
                        <div className='col'>{ svg.cr } <span>{ monster.getCrString(monster.cr) }</span></div>
                    </div>
                </div>

            </div>
        )
    }
}
