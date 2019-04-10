import * as React from "react";
import { change, FormState } from "redux-form";
import * as _ from 'lodash';

import { CampaignModel } from "app/models/CampaignModel";
import { MonsterModel } from "app/models/MonsterModel";
import { MonsterCard } from "app/components/Monsters/MonsterCard/MonsterCard";
import { MonstersFilters } from "app/components/Monsters/MonstersFilters/MonstersFilters";

import './Monsters.scss';
import { connect } from "react-redux";
import { RootState } from "app/modules";
import { bindActionCreators, Dispatch } from "redux";
import { MonstersMiddleware } from "app/modules/monsters/middleware";

export namespace Monsters {
    export interface Props {
        actions:monstersActions;
        monsters:MonsterModel[];
        campaigns:CampaignModel[];
        searchFormData?:FormState;
    }

    export interface State {
        shouldFixFilters:boolean;
    }

    export type monstersActions = {
        fetchMonsters:() => void;
        setMonsterActive:(monsterId:string) => void;
        setMonsterInactive:(monsterId:string) => void;
        updateForm:(form:String, field:String, value:any) => void;
    }
}

@connect(
    (state:RootState):Pick<Monsters.Props, 'monsters'|'campaigns'|'searchFormData'> => ({
        monsters: state.monsters.all,
        campaigns: state.campaigns.all,
        searchFormData: state.form.monsters_filters,
    }),
    (dispatch:Dispatch):Pick<Monsters.Props, 'actions'> => ({
        actions: bindActionCreators({
            fetchMonsters:() => MonstersMiddleware.fetchMonsters(),
            setMonsterActive:(monsterId) => MonstersMiddleware.setActiveMonster(monsterId),
            setMonsterInactive:(monsterId) => MonstersMiddleware.setInactiveMonster(monsterId),
            updateForm:(form, field, value) => change(form, field, value),
        }, dispatch),
    }),
)

export class Monsters extends React.Component<Monsters.Props, Monsters.State> {
    public state:Monsters.State = {
        shouldFixFilters: false,
    };

    public componentDidMount():void {
        const { actions } = this.props;

        actions.fetchMonsters();

        if (this._wrapperRef) {
            this._wrapperRef.addEventListener('scroll', _.debounce(this.handleScrolling, 500));
        }

    }

    public componentWillUnmount():void {
        if (this._wrapperRef) this._wrapperRef.removeEventListener('scroll', _.debounce(this.handleScrolling));
    }

    protected _wrapperRef:HTMLElement|null = null;

    private handleScrolling = (evt:Event) => {
        const evtTarget = evt.target as any;
        const { scrollTop } = evtTarget;

        if (scrollTop > 320) {
            this.setState({
                shouldFixFilters: true,
            })
        }
        else {
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
                }
                else {
                    result = monsters;
                }

                const formValuesKeys = Object.keys(searchFormData.values);

                for (let key of formValuesKeys) {
                    if (searchFormData.values[ key ] === true) {
                        switch (key) {
                            case 'sortByCr':
                                result.sort((a:any, b:any) => a.cr - b.cr);
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

        console.log(this.getMonstersList());

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
                                setActive={ actions.setMonsterActive }
                                setInactive={ actions.setMonsterInactive }
                            />
                        ))
                    }
                </div>
            </section>
        )
    }
}
