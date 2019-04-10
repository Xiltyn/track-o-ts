import * as React from "react";

import './EncounterParticipant.scss';
import svg from "app/utils/svg";
import animationContainer from "app/utils/animationContainer/animationContainer";
import { Participant } from "app/models/EncounterModel";

type encounterItemProps = {
    participant:Participant
    isActive:boolean,
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
        className={ `item-strip primary ${ props.isActive ? 'active' : '' }` }
        onClick={ () => props.onClick(props.participant.id) }>
        <div className="details">
            <h4 className="item-name">
                { props.participant.name }
            </h4>
            <div className='stats'>
                <div className='row'>{ svg.ac } <span>{ props.participant.ac }</span></div>
                <div className='row'>{ svg.hp } <span>{ props.participant.hp }</span></div>
                <div className='row'>{ svg.d20 } <span>{ props.participant.roll }</span></div>
            </div>
        </div>
        <ul className="item-statuses">
            {
                props.participant.statuses && props.participant.statuses.map(status => (
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
