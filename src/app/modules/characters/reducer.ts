import { RootState } from "app/modules";
import { handleActions } from "redux-actions";
import { CharactersActions } from "app/modules/characters/actions";
import { CharactersModel } from "app/models/CharacterModel";

const initialState:RootState.CharactersState = {
    all: [],
};

export const charactersReducer = handleActions<RootState.CharactersState, CharactersModel>(
    {
        [ CharactersActions.Type.SET_CHARACTERS ]: (state, action) => ({
            ...state,
            all: action.payload && action.payload.all,
        }),
}, initialState);
