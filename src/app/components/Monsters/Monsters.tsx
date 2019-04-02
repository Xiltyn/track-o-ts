import * as React from "react";
import { FormState } from "redux-form";
import * as _ from 'lodash';

import { CampaignModel } from "app/models/CampaignModel";
import { MonsterModel } from "app/models/MonsterModel";
import { MonsterCard } from "app/components/Monsters/MonsterCard/MonsterCard";
import { MonstersFilters } from "app/components/Monsters/MonstersFilters/MonstersFilters";
import { App } from "app/containers/App";

import './Monsters.scss';

export namespace Monsters {
    export interface Props {
        actions:monstersActions&App.formsActions;
        monsters?:MonsterModel[];
        campaigns?:CampaignModel[];
        searchFormData?:FormState;
        activeCampaign?:string;
    }

    export interface State {
        shouldFixFilters:boolean;
    }

    export type monstersActions = {
        fetchMonsters:() => void;
        //initMonstersListener:() => void;
        //addMonster:(monster:IMonsterModel) => void;
        //updateMonster:(monster:MonsterModel) => void;
        //setMonsterActive:(monsterId:string) => void;
    }
}

export class Monsters extends React.Component<Monsters.Props, Monsters.State> {
    public state:Monsters.State = {
        shouldFixFilters: false,
    };

    public componentDidMount():void {
        if(this._wrapperRef) this._wrapperRef.addEventListener('scroll', _.debounce(this.handleScrolling, 500));
    }

    public componentWillUnmount():void {
        if(this._wrapperRef) this._wrapperRef.removeEventListener('scroll', _.debounce(this.handleScrolling));
    }

    protected _wrapperRef:HTMLElement|null = null;

    private handleScrolling = (evt:Event) => {
        const evtTarget = evt.target as any;
        const { scrollTop } = evtTarget;

        if(scrollTop > 320) {
            this.setState({
                shouldFixFilters: true,
            })
        } else {
            this.setState({
                shouldFixFilters: false,
            })
        }
    };

    private getMonstersList = ():MonsterModel[] => {
        const { monsters, searchFormData } = this.props;
        let result:MonsterModel[] = [];

        if (monsters) {
            if (searchFormData && searchFormData.values) {
                if (searchFormData.values.search && searchFormData.values.search !== '') {
                    for (let monster of monsters) {
                        if (monster.name.toLowerCase().includes(searchFormData.values.search.toLowerCase())) {
                            result.push(monster);
                        }
                    }
                } else {
                    result = monsters;
                }

                const formValuesKeys = Object.keys(searchFormData.values);

                for (let key of formValuesKeys) {
                    if (searchFormData.values[ key ] === true) {
                        switch (key) {
                            case 'sortByCr':
                                result.sort((a, b) => a.cr - b.cr);
                                break;
                            case 'sortByHp':
                                result.sort((a, b) => a.getComputedValue('hp') - b.getComputedValue('hp'));
                                break;
                            case 'sortByAc':
                                result.sort((a, b) => a.getComputedValue('ac') - b.getComputedValue('ac'));
                                break;
                            default:
                                result.sort((a, b) => a.name.localeCompare(b.name));
                                break;
                        }
                    }
                }
            }
        }

        return result;
    };

    public render() {
        const { actions, searchFormData } = this.props;
        const { shouldFixFilters } = this.state;

        return (
            <section
                className="app-monsters"
                ref={ section => this._wrapperRef = section }>
                <h2>
                    Monsters
                </h2>
                <MonstersFilters
                    initialValues={ {
                        sortByName: true,
                        sortByAc: false,
                        sortByHp: false,
                        sortByCr: false
                    } }
                    fixToTop={ shouldFixFilters }
                    formData={ searchFormData }
                    updateForm={ actions.updateForm }/>
                <div className="monsters-container">
                    {
                        this.getMonstersList().map((monster):React.ReactNode => (
                            <MonsterCard
                                key={ monster.id }
                                monster={ monster }
                                //setActive={ actions.setMonsterActive }
                            />

                        ))
                    }
                </div>
            </section>
        )
    }
}
