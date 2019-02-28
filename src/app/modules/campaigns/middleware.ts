import { Dispatch } from "redux";
import { RootState } from "app/modules";
import { firebaseDb } from "app/shared/firebase.config";
import { CampaignModel, ICampaignModel } from "app/models/CampaignModel";
import { CampaignsActions } from "app/modules/campaigns/actions";

export default class CampaignsMiddleware {
    static fetchCampaigns = () => async (dispatch:Dispatch) => {
        try {
            const campaigns = await firebaseDb.collection('campaigns').get();

            if(campaigns) {
                const payload:CampaignModel[] = [];

                campaigns.forEach(snapshot => payload.push(new CampaignModel({
                    ...snapshot.data() as any,
                    id: snapshot.id,
                })));

                dispatch(CampaignsActions.setCampaigns({
                    all: payload,
                }))
            }

        } catch (err) {
            console.error(err);
        }
    };

    static initCampaignsListener = () => (dispatch:Dispatch, getState:() => RootState) => {
        firebaseDb.collection('campaigns').onSnapshot((snapshot) => {
            let payload = getState().campaigns.all;

            snapshot.forEach(campaign => {
                if(payload) payload = [ ...payload.filter(el => el.id !== campaign.id), new CampaignModel({
                    ...campaign.data() as any,
                    id: campaign.id,
                }) ];
            });

            dispatch(CampaignsActions.setCampaigns({
                all: payload,
            }))
        });
    };

    static addCampaign = (campaign:ICampaignModel) => (dispatch:Dispatch, getState:() => RootState) => {
        const user = getState().auth.user;
        const uid = user && user.uid;

        console.log('addCampaign payload :: ', campaign);

        if(uid) {
            firebaseDb.collection('campaigns').add({
                ...campaign,
                roles: {
                    [uid]: 'dm',
                }
            })
        }
    };

    static updateCampaign = (updatedCampaign:CampaignModel) => (dispatch:Dispatch) => {
        console.log(updatedCampaign);
        firebaseDb.collection('campaigns').doc(updatedCampaign.id).set(updatedCampaign.plainData).then().catch(err => console.log(err));
    };

    static setActiveCampaign = (id:string) => (dispatch:Dispatch, getState:() => RootState) => {
        const currentCampaigns = getState().campaigns.all;

        const getPayload = ():Array<CampaignModel> => {
            let result:Array<CampaignModel> = [];
            if(currentCampaigns) currentCampaigns.map(campaign => {
                if(campaign.id === id) {
                    campaign.setActive();
                } else if (campaign.isActive) {
                    campaign.setInactive();
                }

                result = [ ...result, campaign ];
            });

            return result;
        };

        dispatch(CampaignsActions.setCampaigns({ all: getPayload() }))
    };
}