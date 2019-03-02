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
        openAddCharacterModal:() => void;
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
                characters,
                isActive
            },
            onClick,
            encounters,
            openAddEncounterModal,
            openAddCharacterModal,
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
                <div className="action-block campaign-encounters">
                    <h4>Encounters</h4>
                    {
                        campaignEncounters && campaignEncounters.length ?
                            campaignEncounters.map((encounter, index) => <p key={ index }>{ encounter.name }</p>) :
                            <span>Add some Encounters to your { name } campaign!</span>
                    }
                    <Button
                        label="Create"
                        onSubmit={ openAddEncounterModal }/>
                </div>
                <div className="action-block campaign-characters">
                    <h4>Characters</h4>
                    {
                        characters && characters.length ?
                            characters.map(chara => <p key={ chara.id }>{ chara.name }</p>) :
                            <span>Assign PCs to your { name } campaign!</span>
                    }
                    <Button
                        label="Assign"
                        onSubmit={ openAddCharacterModal }/>
                </div>
                <div className="action-block campaign-players">
                    <h4>Players</h4>
                    {
                        players && players.map((email, index) => <p key={ index }>{ email }</p>)
                    }
                </div>
            </div>
        )
    }
}
