import * as React from 'react';
import svg from "app/utils/svg";
import { CharacterModel } from "app/models/CharacterModel";

export namespace CardSummary {
    export interface Props {
        chara:CharacterModel;
    }
}

export const CardSummary = (props:CardSummary.Props) => {
    const {
        chara: {
            name,
            class: characterClass,
            ac,
            hp,
        }
    } = props;

    return (
        <div className="card-summary front">
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
