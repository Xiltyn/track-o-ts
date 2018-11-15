import * as React from "react";
import { getMockEncounters } from "app/components/Encounters/Encounters.mock";
import { EncounterCard } from "app/components/Encounters/EncounterCard/EncounterCard";

import './Encounters.scss';

export namespace Encounters {
    export interface Props {

    }

    export interface State {
        activeEncounter:number,
    }
}

export class Encounters extends React.Component<Encounters.Props, Encounters.State> {
    state:Encounters.State = {
        activeEncounter: 0,
    };

    updateActiveEncouter = (id:number) => {
        this.setState({
            activeEncounter: id,
        })
    };

    render() {
        const mockEncounters = getMockEncounters();
        const { activeEncounter } = this.state;

        return(
            <section className="app-encounters">
                <h2>
                    Encounters
                </h2>
                <div className="encounters-container">
                    {
                        mockEncounters.map(encounter => (
                                <EncounterCard
                                    id={ encounter.id }
                                    key={ encounter.id }
                                    name={ encounter.name }
                                    items={ encounter.items }
                                    onClick={ this.updateActiveEncouter }
                                    isActive={ activeEncounter === encounter.id }/>
                            )
                        )
                    }
                </div>
            </section>
        )
    }
}
