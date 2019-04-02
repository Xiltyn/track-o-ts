import { Dispatch } from "redux";
import { RootState } from "app/modules";
import { firebaseDb } from "app/shared/firebase.config";
import { CampaignModel, ICampaignModel } from "app/models/CampaignModel";
import { CampaignsActions } from "app/modules/campaigns/actions";
import { CharacterModel, ICharacterModel } from "app/models/CharacterModel";

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

        if(uid) {
            firebaseDb.collection('campaigns').add({
                ...campaign,
                roles: {
                    [uid]: 'dm',
                }
            })
        }
    };

    static updateCampaign = (updatedCampaign:CampaignModel) => {
        const data = updatedCampaign.plaintData;
        if(data) firebaseDb.collection('campaigns').doc(updatedCampaign.id).set(data).then().catch(err => console.log(err));
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

    public static addCharacter = (character:ICharacterModel, campaignId:string) => (dispatch:Dispatch, getState:() => RootState) => {
        const currentCampaigns = getState().campaigns.all;
        const campaignRef = currentCampaigns.find(camp => camp.id === campaignId);

        if(campaignRef) {
            const newCampaignObj = new CampaignModel(campaignRef);
            const currentCharacters = newCampaignObj.characters;
            const newCharacterObj = new CharacterModel(character);
            newCampaignObj.setCharacters = currentCharacters ? [ ...currentCharacters, newCharacterObj ] : [ newCharacterObj ];

            CampaignsMiddleware.updateCampaign(newCampaignObj);

            const payload = [ ...currentCampaigns.filter(camp => camp.id !== newCampaignObj.id), newCampaignObj ];
            dispatch(CampaignsActions.setCampaigns({
                all: payload,
            }))

        }

    }
}
