import { createAction } from "redux-actions";
import { MonstersModel } from "app/models/MonsterModel";

export namespace MonstersActions {
    export enum Type {
        SET_MONSTERS = 'SET_MONSTERS',
        SET_STATUS = 'SET_STATUS',
    }

    export const setMonsters = createAction<PartialPick<MonstersModel, 'all'>>(Type.SET_MONSTERS);
    export const setStatus = createAction<PartialPick<MonstersModel, 'status'>>(Type.SET_STATUS);
}

export type MonstersActions = Omit<typeof MonstersActions, 'Type'>;
