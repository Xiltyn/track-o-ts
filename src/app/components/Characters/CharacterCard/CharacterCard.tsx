import * as React from 'react';

import { ConditionModel } from "app/models/ConditionsModel";
import { CharacterModel } from "app/models/CharacterModel";
import svg from "app/utils/svg";

import './CharacterCard.scss';

export namespace CharacterCard {

    export interface Props {
        id?:string;
        character:CharacterModel;
        style?:React.CSSProperties;
        updateCharacter:(id:string) => void;
        setActive:(id:string) => void;
        onClick?:(id:string) => void;
    }

    export interface State {
        showModal:boolean;
        activeCondition:ConditionModel|null;
    }
}

export class CharacterCard extends React.Component<CharacterCard.Props, CharacterCard.State> {
    state:CharacterCard.State = {
        showModal: false,
        activeCondition: null,
    };

    render() {
        const {
            character: {
                id,
                name,
                class: characterClass,
                isActive,
                ac,
                hp,
            },
            style,
            setActive,
        } = this.props;


        return (
            <div
                onClick={ () => id && setActive(id) }
                style={ style }
                className={ `character-container ${ isActive ? 'active' : '' }` }>

                <div
                    className={ `character ${ characterClass && characterClass.toLowerCase() }${ isActive ? ' active' : '' }` }>
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
            </div>
        )
    }
}
