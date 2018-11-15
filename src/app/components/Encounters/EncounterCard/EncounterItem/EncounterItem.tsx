import * as React from "react";
import { Status } from "app/models/EncounterModel";

import './EncounterItem.scss';

type encounterItemProps = {
    id:number,
    name:string,
    isActive:boolean,
    statuses:Array<Status>,
    onClick:(id:number) => void,
}

export const EncounterItem = (props:encounterItemProps) => (
    <li
        className={ `item-strip ${ props.isActive ? 'active' : '' }` } //TODO: Add active/inactive handler
        onClick={ () => props.onClick( props.id ) }>
        <h4 className="item-name">
            { props.name }
        </h4>
        <ul className="item-statuses">
            {
                props.statuses.map(status => (
                    <li
                        key={ status.id }
                        className="status">
                        { status.icon }
                    </li>
                ))
            }
        </ul>
    </li>
);
