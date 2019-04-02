import { RootState } from "app/modules";
import { handleActions } from "redux-actions";
import { MonstersActions } from "app/modules/monsters/actions";
import { MonstersModel } from "app/models/MonsterModel";

const initialState:RootState.MonstersState = {
    all: [],
    status: "idle",
};

export const monstersReducer = handleActions<RootState.MonstersState, MonstersModel>(
    {
        [ MonstersActions.Type.SET_MONSTERS ]: (state, action) => ({
            ...state,
            all: action.payload && action.payload.all,
        }),
        [ MonstersActions.Type.SET_STATUS ]: (state, action) => ({
            ...state,
            status: action.payload ? action.payload.status : state.status,
        })
    }, initialState);
