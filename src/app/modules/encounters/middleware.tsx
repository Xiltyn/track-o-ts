import { Dispatch } from "redux";
import { getMockEncounters } from "app/components/Encounters/Encounters.mock";
import { EncountersActions } from "app/modules/encounters/actions";
import { RootState } from "app/modules";
import { EncounterModel, EncounterModelProps } from "app/models/EncounterModel";
import { ConditionModel } from "app/models/ConditionsModel";
import { firebaseDb } from "app/shared/firebase.config";

export class EncountersMiddleware {

    static fetchEncounters = () => async (dispatch:Dispatch, getState:() => RootState) => {
        const user = getState().auth.user;
        const uid = user && user.uid;

        try {
            const ownersEncounters = await firebaseDb.collection('encounters').where(`roles.${uid}`, '==', 'owner').get();
            const playersEncounters = await firebaseDb.collection('encounters').where(`roles.${uid}`, '==', 'player').get();

            if(ownersEncounters && playersEncounters) {
                const payload:EncounterModel[] = [];
                ownersEncounters.forEach(snapshot => payload.push(new EncounterModel({
                    ...snapshot.data() as any,
                    id: snapshot.id,
                })));
                playersEncounters.forEach(snapshot => payload.push(new EncounterModel({
                    ...snapshot.data() as any,
                    id: snapshot.id,
                })));

                console.log(payload);
                dispatch(EncountersActions.setEncounters({
                    encounters: payload,
                }))
            }

        } catch (err) {
            console.log(err);
        }
    };

    static initEncountersListener = () => (dispatch:Dispatch, getState:() => RootState) => {
        const user = getState().auth.user;
        const uid = user && user.uid;

        firebaseDb.collection('encounters').where(`roles.${uid}`, '==', 'owner').onSnapshot((snapshot) => {
            let payload = getState().encounters.encounters;

            snapshot.forEach(encounter => {
                console.log('encounter_id', encounter.id);
                if(payload) payload = [ ...payload.filter(el => el.id !== encounter.id), new EncounterModel({
                    ...encounter.data() as any,
                    id: encounter.id,
                }) ];
            });

            dispatch(EncountersActions.setEncounters({
                encounters: payload,
            }))
        });

        firebaseDb.collection('encounters').where(`roles.${uid}`, '==', 'player').onSnapshot((snapshot) => {
            let payload = getState().encounters.encounters;

            snapshot.forEach(encounter => {
                if(payload) payload = [ ...payload.filter(el => el.id !== encounter.id), new EncounterModel({
                    ...encounter.data() as any,
                    id: encounter.id,
                }) ];
            });

            dispatch(EncountersActions.setEncounters({
                encounters: payload,
            }))
        });
    };

    static updateEncounter = (updatedEncounter:EncounterModel) => (dispatch:Dispatch) => {
        console.log(updatedEncounter);
        firebaseDb.collection('encounters').doc(updatedEncounter.id).set(updatedEncounter.plainData).then().catch(err => console.log(err));
    };

    static initMockEncounters = () => (dispatch:Dispatch) => {
        const payload = {
            encounters: getMockEncounters(),
        };

        dispatch(EncountersActions.setEncounters(payload));
    };

    static setActiveEncounter = (id:string) => (dispatch:Dispatch, getState:() => RootState) => {
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

    static addCondition = (encounterId:string, itemId:number, condition:ConditionModel) => (dispatch:Dispatch, getState:() => RootState) => {
        const currentEncounters = getState().encounters.encounters;

        if(currentEncounters) {
            const encounterToUpdate = currentEncounters.find(encounter => encounter.id === encounterId);

            if(encounterToUpdate) {
                const updatedEncounter = new EncounterModel(encounterToUpdate);
                updatedEncounter.addStatus(itemId, condition);

                dispatch(EncountersActions.updateActiveEncounter({ encounters: [
                    ...currentEncounters.filter(el => el.id !== updatedEncounter.id),
                        updatedEncounter,
                    ] }))
            }
        }
    }

    static addEncounter = (encounter:EncounterModelProps) => (dispatch:Dispatch, getState:() => RootState) => {
        const user = getState().auth.user;
        const uid = user && user.uid;

        if(uid) {
            firebaseDb.collection('encounters').add({
                ...encounter,
                roles: {
                    [uid]: 'owner',
                }
            })
        }
    }
}