import * as React from 'react';
import svg from "app/utils/svg";

import { MonsterModel } from "app/models/MonsterModel";

import './MonsterSummary.scss'

export namespace MonsterSummary {
    export interface Props {
        monster:MonsterModel;
    }
}

export const MonsterSummary = (props:MonsterSummary.Props) => {
    const {
        monster,
    } = props;

    return (
        <React.Fragment>
            <div className="meta">
                <h3 className="name">
                    { monster.name }
                </h3>
                <p className="details">
                    { monster.meta }
                </p>
            </div>
            <div className='essentials'>
                <div className='col'>{ svg.ac } <span>{ monster.getComputedValue('ac') }</span></div>
                <div className='col'>{ svg.hp } <span>{ monster.getComputedValue('hp') }</span></div>
                <div className='col'>{ svg.cr } <span>{ monster.cr && monster.getCrString(monster.cr) }</span></div>
            </div>
        </React.Fragment>
    )
}
