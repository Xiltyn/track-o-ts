import * as React from 'react';
import ReactHtmlParser from "react-html-parser";

import { MonsterModel } from "app/models/MonsterModel";
import svg from "app/utils/svg";

import './MonsterDetails.scss';

export namespace MonsterDetails {
    export interface Props {
        monster:MonsterModel;
        setInactive?:(monsterId:string) => void;
    }
}

export const MonsterDetails = (props:MonsterDetails.Props) => {
    const { monster, setInactive } = props;

    return (
        <div className="monster-details">
            <div className="close-btn" onClick={ () => monster.id && setInactive && setInactive(monster.id) }/>
            <div className="meta">
                <h3>{ monster.name }</h3>
                <p>{ monster.meta }</p>
            </div>
            <div className="contents">
                <div
                    className="img-container"
                    style={ {
                        backgroundImage: `url(${ monster.img_url })`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'top center'
                    } }/>
                <div className="body">
                    <div className='essentials'>
                        <div className='col ac'>{ svg.ac } <span>{ monster.getComputedValue('ac') }</span></div>
                        <div className='col hp'>{ svg.hp } <span>{ monster.getComputedValue('hp') }</span></div>
                        <div className='col cr'>{ svg.cr } <span>{ monster.cr && monster.getCrString(monster.cr) }</span></div>
                    </div>
                    <div className="description">
                        { monster.senses &&
                          <article><span>Senses: </span>{ ReactHtmlParser(monster.senses) }</article> }
                        { monster.speed &&
                          <article><span>Speed: </span>{ ReactHtmlParser(monster.speed) }</article> }
                        { monster.languages &&
                          <article><span>Languages: </span>{ ReactHtmlParser(monster.languages) }</article> }
                        { monster.saving_throws &&
                          <article><span>Saving Throws: </span>{ ReactHtmlParser(monster.saving_throws) }
                          </article> }
                        { monster.skills &&
                          <article><span>Skills: </span>{ ReactHtmlParser(monster.skills) }</article> }
                        <div className="separator"/>
                        { monster.traits &&
                          <article><span>Traits: </span>{ ReactHtmlParser(monster.traits) }</article> }
                        { monster.actions &&
                          <article><span>Actions: </span>{ ReactHtmlParser(monster.actions) }</article> }
                        { monster.legendary_actions &&
                          <article><span>Legendary Actions: </span>{ ReactHtmlParser(monster.legendary_actions) }
                          </article> }
                    </div>
                </div>
            </div>
            <div className="stats">
                {
                    monster.stats && Object.keys(monster.stats).map(stat =>
                    monster.stats && <div key={ stat } className={ `stat-block ${ stat }` }>
                        <h5>{ stat }</h5>
                        <div className="numbers">
                            <p>{ monster.stats[ stat ].modifier > 0 ? `+${ monster.stats[ stat ].modifier }` : monster.stats[ stat ].modifier }</p>
                            <p>( { monster.stats[ stat ].value } )</p>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    )
}
