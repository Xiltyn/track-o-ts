import { RootState } from "app/modules";
import { handleActions } from "redux-actions";
import { EncountersModel } from "app/models/EncounterModel";
import { EncountersActions } from "app/modules/encounters/actions";

const initialState:RootState.EncounterState = {
    all: [],
};

export const encountersReducer = handleActions<RootState.EncounterState, EncountersModel>(
    {
        [ EncountersActions.Type.SET_ENCOUNTERS ]: (state, action) => ({
            ...state,
            all: action.payload && action.payload.all,
        }),
        [ EncountersActions.Type.TOGGLE_ACTIVE ]: (state, action) => ({
            ...state,
            all: action.payload && action.payload.all,
        }),
}, initialState);
