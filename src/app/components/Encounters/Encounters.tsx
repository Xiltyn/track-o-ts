import * as React from "react";
import { EncounterCard } from "app/components/Encounters/EncounterCard/EncounterCard";

import './Encounters.scss';
import { EncounterModel } from "app/models/EncounterModel";
import { ConditionModel } from "app/models/ConditionsModel";

export namespace Encounters {
    export interface Props {
        actions:encountersActions,
        encounters:Array<EncounterModel>|undefined,
    }

    export interface State {

    }

    export type encountersActions = {
        initMockEncounters:() => void,
        setActiveEncounter:(id:number) => void,
        addCondition:(encounterId:number, itemId:number, condition:ConditionModel) => void,
    }
}

export class Encounters extends React.Component<Encounters.Props, Encounters.State> {
    componentDidMount() {
        const { actions: { initMockEncounters } } = this.props;

        if(initMockEncounters) initMockEncounters();
    }

    updateActiveEncouter = (id:number) => {
        const { actions: { setActiveEncounter } } = this.props;

        if(setActiveEncounter) setActiveEncounter(id);
    };

    render() {
        const { encounters, actions } = this.props;

        return(
            <section className="app-encounters">
                <h2>
                    Encounters
                </h2>
                <div className="encounters-container">
                    {
                        encounters && encounters.map(encounter => (
                                <EncounterCard
                                    id={ encounter.id }
                                    key={ encounter.id }
                                    name={ encounter.name }
                                    items={ encounter.items }
                                    addCondition={ actions.addCondition }
                                    onClick={ this.updateActiveEncouter }
                                    isActive={ encounter.isActive }/>
                            )
                        )
                    }
                </div>
            </section>
        )
    }
}
