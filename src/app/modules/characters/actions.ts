import { createAction } from "redux-actions";
import { CharactersModel } from "app/models/CharacterModel";

export namespace CharactersActions {
    export enum Type {
        SET_CHARACTERS = 'SET_CHARACTERS',
    }

    export const setCharacters = createAction<PartialPick<CharactersModel, 'all'>>(Type.SET_CHARACTERS);
}

export type CharactersActions = Omit<typeof CharactersActions, 'Type'>;
