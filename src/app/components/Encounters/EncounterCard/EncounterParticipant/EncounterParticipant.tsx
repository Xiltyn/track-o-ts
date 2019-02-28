import * as React from "react";

import './EncounterParticipant.scss';
import svg from "app/utils/svg";
import animationContainer from "app/utils/animationContainer/animationContainer";
import { ConditionsState } from "app/models/ConditionsModel";

type encounterItemProps = {
    id:number,
    name:string,
    isActive:boolean,
    color:string,
    statuses?:ConditionsState,
    addStatus:() => void,
    onClick:(id:number) => void,
}

const AddButton = (props:{ onClick:(...params:any) => void }) => <li
    onClick={ props.onClick }
    className="status add-new">
    { svg.add }
</li>;

const AnimatedAddButton = animationContainer(AddButton);

export const EncounterParticipant = (props:encounterItemProps) => (
    <li
        className={ `item-strip primary ${ props.isActive ? 'active' : '' }` } //TODO: Add active/inactive handler
        onClick={ () => props.onClick(props.id) }>
        <h4 className="item-name">
            { props.name }
        </h4>
        <ul className="item-statuses">
            {
                props.statuses && props.statuses.map(status => (
                    <li
                        key={ status.id }
                        className={ `status ${ status.name }` }>
                        { svg.conditions[ status.icon ] }
                    </li>
                ))
            }
            <AnimatedAddButton
                isMounted={ props.isActive }
                onClick={ props.addStatus }
                delayTime={ 600 }
                poses={ {
                    preEnter: {
                        opacity: 1,
                        transition: {
                            default: {
                                duration: 600
                            }
                        },
                    },
                    enter: {
                        opacity: 1,
                        transition: {
                            default: {
                                duration: 600
                            }
                        },
                    },
                    exit: {
                        opacity: 0,
                        transition: {
                            default: {
                                duration: 600
                            }
                        },
                    },
                } }
            />
        </ul>
    </li>
);
