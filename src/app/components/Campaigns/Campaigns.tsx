import * as React from "react";

import svg from "app/utils/svg";
import animationContainer from "app/utils/animationContainer/animationContainer";

import Button from "app/components/__universal/Button/Button";
import { CampaignCard } from "app/components/Campaigns/CampaignCard/CampaignCard";
import { AddCampaignForm } from "app/components/AddCampaignForm/AddCampaignForm";

import { CampaignModel, ICampaignModel } from "app/models/CampaignModel";
import { ActionModal } from "app/components/__universal/ActionModal/ActionModal";
import { FormState } from "redux-form";

import './Campaigns.scss';
import { EncounterModel } from "app/models/EncounterModel";
import { Encounters } from "../Encounters/Encounters";
import { AddEncounterForm } from "app/components/AddEncounterForm/AddEncounterForm";

export namespace Campaigns {
    export interface Props {
        actions:campaignsActions & Encounters.encountersActions & {historyPush:(location:string) => void},
        campaigns:Array<CampaignModel>,
        encounters:Array<EncounterModel>,
        encounterFormData:FormState;
        campaignFormData:FormState;
    }

    export interface State {
        showAddCampaignModal:boolean,
        showAddEncounterModal:boolean,
        currentCampaign?:string,
    }

    export type campaignsActions = {
        initCampaignsListener:() => void;
        fetchCampaigns:() => void;
        addCampaign:(campaign:ICampaignModel) => void;
        updateCampaign:(campaign:CampaignModel) => void;
        setActiveCampaign:(id:string) => void;
    }
}

const AnimatedActionModal = animationContainer(ActionModal);

export class Campaigns extends React.Component<Campaigns.Props, Campaigns.State> {
    state:Campaigns.State = {
        showAddCampaignModal: false,
        showAddEncounterModal: false,
    };

    componentDidMount() {
        const { actions: { fetchCampaigns, initCampaignsListener } } = this.props;

        fetchCampaigns();
        initCampaignsListener();


        //firebaseDb.collection('encounters').doc('iyNPovVMfHL1nqhfbMyR').get().then(res => console.log(res.data()));

        //if(initMockCampaigns) initMockCampaigns();
    }

    render() {
        const { encounters, campaigns, actions, encounterFormData, campaignFormData } = this.props;
        const { showAddCampaignModal, showAddEncounterModal, currentCampaign } = this.state;

        const currentCampaignObject = campaigns.find(campaign => campaign.id === currentCampaign);

        return(
            <section className="app-encounters">
                <h2>
                    Campaigns
                </h2>
                <div className="encounters-container">
                    {
                        campaigns && campaigns.sort((a, b) => a.name.localeCompare(b.name)).map(campaign => (
                                <CampaignCard
                                    key={ campaign.id }
                                    updateCampaign={ actions.updateCampaign }
                                    openAddEncounterModal={ () => this.setState({ showAddEncounterModal: true, currentCampaign: campaign.id }) }
                                    encounters={ encounters }
                                    onClick={ () => actions.historyPush(`/encounters/${campaign.id}`) }
                                    campaign={ campaign }
                                />
                            )
                        )
                    }
                </div>

                <AnimatedActionModal
                    header='Create Campaign'
                    description='Below, you can create a new encounter'
                    onCancel={ () => this.setState({ showAddCampaignModal: false }) }
                    identifier='add-encounter-modal'
                    isMounted={ showAddCampaignModal }>
                    <AddCampaignForm
                        formData={ campaignFormData }
                        addCampaign={ actions.addCampaign }
                        closeModal={ () => this.setState({ showAddCampaignModal: false }) }/>
                </AnimatedActionModal>

                <AnimatedActionModal
                    header={ `Add Encounter to ${ currentCampaignObject && currentCampaignObject.name }` }
                    description='Below, you can create a new encounter'
                    onCancel={ () => this.setState({ showAddEncounterModal: false, currentCampaign: undefined }) }
                    identifier='add-encounter-modal'
                    isMounted={ showAddEncounterModal && currentCampaign }>
                    {
                        currentCampaign && <AddEncounterForm
                            formData={ encounterFormData }
                            currentCampaign={ currentCampaign }
                            addEncounter={ actions.addEncounter }
                            closeModal={ () => this.setState({ showAddEncounterModal: false }) }/>
                    }
                </AnimatedActionModal>
                <Button
                    buttonClass='add-encounter'
                    label={ svg.add }
                    onSubmit={ () => this.setState({ showAddCampaignModal: true }) }/>
            </section>
        )
    }
}