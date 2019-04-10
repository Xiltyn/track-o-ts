import * as React from 'react';
import { EncounterCard } from "app/components/Encounters/EncounterCard/EncounterCard";
import { EncounterModel } from "app/models/EncounterModel";
import { Encounters } from "app/components/Encounters/Encounters";
import { AppLoader } from "app/components";

export namespace EncountersList {
    import encountersActions = Encounters.encountersActions;

    export interface Props {
        encounters?:EncounterModel[];
        actions?:encountersActions;
        updateActiveEncounter:(id:string) => void;
    }
}

export const EncountersList = (props:EncountersList.Props) => {
    const {
        encounters,
        actions,
        updateActiveEncounter,
    } = props;

    return (actions && encounters) ? (
        <div className="encounters-list">
            {
                encounters.map(encounter => (
                        <EncounterCard
                            key={ encounter.id }
                            encounter={ encounter }
                            updateEncounter={ id => {
                                const updatedEncounter = new EncounterModel(encounter);

                                for (let participant of updatedEncounter.participants) {
                                    if (participant.id === id) {
                                        participant.isActive = true;
                                    }
                                    else if (participant.isActive) {
                                        participant.isActive = false;
                                    }
                                }

                                actions.updateEncounter(updatedEncounter);
                            } }
                            addCondition={ actions.addCondition }
                            onClick={ updateActiveEncounter }/>
                    )
                )
            }
        </div>
    ) : <AppLoader/>
};
