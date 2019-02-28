import { createAction } from "redux-actions";
import { CampaignsModel } from "app/models/CampaignModel";

export namespace CampaignsActions {
    export enum Type {
        SET_CAMPAIGNS = 'SET_CAMPAIGNS',
    }

    export const setCampaigns = createAction<PartialPick<CampaignsModel, 'all'>>(Type.SET_CAMPAIGNS);
}

export type CampaignsActions = Omit<typeof CampaignsActions, 'Type'>;
