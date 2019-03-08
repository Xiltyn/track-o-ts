import * as React from 'react';

import { ConditionModel } from "app/models/ConditionsModel";
import { CharacterModel } from "app/models/CharacterModel";
import svg from "app/utils/svg";

import './CharacterCard.scss';

export namespace CharacterCard {

    export interface Props {
        id?:string;
        character:CharacterModel;
        updateCharacter:(id:number) => void;
        onClick?:(id:string) => void;
    }

    export interface State {
        showModal:boolean;
        activeCondition:ConditionModel|null;
    }
}

export class CharacterCard extends React.Component<CharacterCard.Props, CharacterCard.State> {
    state:CharacterCard.State = {
        showModal:false,
        activeCondition:null,
    };

    render() {
        const {
            character: {
                name,
                class:characterClass,
                ac,
                hp,
            },
        } = this.props;


        return(
            <div
                className={ `character ${ characterClass && characterClass.toLowerCase() }` }>
                <header className="meta">
                    <h3>{ name }</h3>
                    <p>{ characterClass }</p>
                </header>
                {
                    characterClass &&
                    <div className="class">
                        <div className="class-svg">
                            { svg.classes[ characterClass.toLowerCase() ] }
                        </div>
                    </div>
                }
                <div className='stats'>
                    <div className='row'>{ svg.ac } <span>{ ac }</span></div>
                    <div className='row'>{ svg.hp } <span>{ hp }</span></div>
                </div>
            </div>
        )
    }
}
