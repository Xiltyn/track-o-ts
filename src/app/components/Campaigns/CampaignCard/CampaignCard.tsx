import * as React from 'react';

import { ConditionModel } from "app/models/ConditionsModel";
import { CampaignModel } from "app/models/CampaignModel";

import './CampaignCard.scss';
import Button from "app/components/__universal/Button/Button";
import { EncounterModel } from "app/models/EncounterModel";
import svg from "app/utils/svg";
import { CharacterModel } from "app/models/CharacterModel";
import CampaignsMiddleware from "app/modules/campaigns/middleware";

export namespace CampaignCard {

    export interface Props {
        campaign:CampaignModel;
        encounters:EncounterModel[];
        characters?:CharacterModel[];
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
    public state:CampaignCard.State = {
        showModal: false,
        activeCondition: null,
    };

    private handleRemoveCharacter = (campaign:CampaignModel, character:CharacterModel) => {
        const newCampaign = new CampaignModel(campaign);
        newCampaign.removeCharacter(character.name);

        CampaignsMiddleware.updateCampaign(newCampaign);
    };

    public render() {
        const {
            campaign: {
                id,
                name,
                players,
                description,
                isActive
            },
            onClick,
            characters,
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
                            characters.map((chara, index) =>
                                <div className='character-info' key={ index }>
                                    <p className='meta'>
                                        <span>{ chara.name }</span> | { chara.class }
                                    </p>
                                    <div className='stats'>
                                        <div className='row'>{ svg.ac } <span>{ chara.ac }</span></div>
                                        <div className='row'>{ svg.hp } <span>{ chara.hp }</span></div>
                                    </div>
                                    <Button onSubmit={ () => this.handleRemoveCharacter(this.props.campaign, chara) } label={ svg.return }/>
                                </div>) :
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
