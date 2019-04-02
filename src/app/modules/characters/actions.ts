import { createAction } from "redux-actions";
import { CharactersModel } from "app/models/CharacterModel";

export namespace CharactersActions {
    export enum Type {
        SET_CHARACTERS = 'SET_CHARACTERS',
        SET_STATUS = 'SET_STATUS',
    }

    export const setCharacters = createAction<PartialPick<CharactersModel, 'all'>>(Type.SET_CHARACTERS);
    export const setStatus = createAction<PartialPick<CharactersModel, 'status'>>(Type.SET_STATUS);
}

export type CharactersActions = Omit<typeof CharactersActions, 'Type'>;
