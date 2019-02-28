import { createAction } from "redux-actions";
import { EncountersModel } from "app/models/EncounterModel";

export namespace EncountersActions {
    export enum Type {
        TOGGLE_ACTIVE = 'TOGGLE_ACTIVE',
        SET_ENCOUNTERS = 'SET_ENCOUNTERS',
    }

    export const updateActiveEncounter = createAction<PartialPick<EncountersModel, 'all'>>(Type.TOGGLE_ACTIVE);
    export const setEncounters = createAction<PartialPick<EncountersModel, 'all'>>(Type.SET_ENCOUNTERS);
}

export type EncountersActions = Omit<typeof EncountersActions, 'Type'>;
