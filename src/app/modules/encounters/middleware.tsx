import { Dispatch } from "redux";
import { getMockEncounters } from "app/components/Encounters/Encounters.mock";
import { EncountersActions } from "app/modules/encounters/actions";
import { RootState } from "app/modules";
import { EncounterModel } from "app/models/EncounterModel";
import { ConditionModel } from "app/models/ConditionsModel";

export class EncountersMiddleware {
    static initMockEncounters = () => (dispatch:Dispatch) => {
        const payload = {
            encounters: getMockEncounters(),
        };

        dispatch(EncountersActions.setEncounters(payload));
    };

    static setActiveEncounter = (id:number) => (dispatch:Dispatch, getState:() => RootState) => {
          const currentEncounters = getState().encounters.encounters;
          const getPayload = ():Array<EncounterModel> => {
              let result:Array<EncounterModel> = [];
              if(currentEncounters) currentEncounters.map(encounter => {
                  if(encounter.id === id) {
                      encounter.setActive();
                  } else if (encounter.isActive) {
                      encounter.setInactive();
                  }

                  result = [ ...result, encounter ];
              });

              return result;
          };

          dispatch(EncountersActions.updateActiveEncounter({ encounters: getPayload() }))
    }

    static addCondition = (encounterId:number, itemId:number, condition:ConditionModel) => (dispatch:Dispatch, getState:() => RootState) => {
        const currentEncounters = getState().encounters.encounters;

        if(currentEncounters) {
            const encounterToUpdate = currentEncounters.find(encounter => encounter.id === encounterId);

            if(encounterToUpdate) encounterToUpdate.addStatus(itemId, condition);

            dispatch(EncountersActions.updateActiveEncounter({ encounters: currentEncounters }))
        }


    }
}
