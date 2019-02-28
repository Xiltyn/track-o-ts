import * as React from 'react';

import { ConditionModel } from "app/models/ConditionsModel";
import { CampaignModel } from "app/models/CampaignModel";

import './CampaignCard.scss';
import Button from "app/components/__universal/Button/Button";
import { EncounterModel } from "app/models/EncounterModel";

export namespace CampaignCard {

    export interface Props {
        campaign:CampaignModel;
        encounters:EncounterModel[];
        openAddEncounterModal:() => void;
        updateCampaign:(campaign:CampaignModel) => void;
        onClick:(id:string) => void;
    }

    export interface State {
        showModal:boolean,
        activeCondition:ConditionModel|null,
    }
}

export class CampaignCard extends React.Component<CampaignCard.Props, CampaignCard.State> {
    state:CampaignCard.State = {
        showModal: false,
        activeCondition: null,
    };

    render() {
        const {
            campaign: {
                id,
                name,
                players,
                description,
                isActive
            },
            onClick,
            encounters,
            openAddEncounterModal,
        } = this.props;

        const campaignEncounters = encounters.filter(encounter => encounter.campaignId === id);

        return (
            <div className={ `campaign ${ isActive ? 'active' : '' }` }>
                <header className="campaign-header" onClick={ () => onClick(id) }>
                    <div className="name">
                        <h3>{ name }</h3>
                        <span>{ name }</span>
                    </div>
                    <div className="description">
                        <p>{ description }</p>
                    </div>
                </header>
                <div className="campaign-players">
                    <h4>Players</h4>
                    {
                        players && players.map((email, index) => <p key={ index }>{ email }</p>)
                    }
                </div>
                <div className="campaign-encounters">
                    <h4>Encounters</h4>
                    {
                        campaignEncounters.length ?
                            campaignEncounters.map(encounter => <p>{ encounter.name }</p>) :
                            <span>Add some Encounters to your { name } campaign!</span>
                    }
                    <Button
                        label="Add Encounter"
                        onSubmit={ openAddEncounterModal }/>
                </div>
            </div>
        )
    }
}
