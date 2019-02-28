import { RootState } from "app/modules";
import { handleActions } from "redux-actions";
import { CampaignsModel } from "app/models/CampaignModel";
import { CampaignsActions } from "app/modules/campaigns/actions";

const initialState:RootState.CampaignsState = {
    all: [],
};

export const campaignsReducer = handleActions<RootState.CampaignsState, CampaignsModel>(
    {
        [ CampaignsActions.Type.SET_CAMPAIGNS ]: (state, action) => ({
            ...state,
            all: action.payload ? action.payload.all : state.all,
        }),
    }, initialState);
