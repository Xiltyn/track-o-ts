import * as React from "react";
import { FormState } from "redux-form";
import { RouteComponentProps } from "react-router";

import svg from "app/utils/svg";
import animationContainer from "app/utils/animationContainer/animationContainer";

import Button from "app/components/__universal/Button/Button";
import { AddEncounterForm } from "app/components/AddEncounterForm/AddEncounterForm";
import { EncountersList } from "app/components/Encounters/EncountersList/EncountersList";

import { EncounterModel, EncounterModelProps } from "app/models/EncounterModel";
import { ConditionModel } from "app/models/ConditionsModel";
import { ActionModal } from "app/components/__universal/ActionModal/ActionModal";
import { CampaignModel } from "app/models/CampaignModel";
import { CharacterModel } from "app/models/CharacterModel";

import './Encounters.scss';
import { getURLFriendlyString } from "app/utils/getURLFriendlyString/getURLFriendlyString";
import { connect } from "react-redux";
import { RootState } from "app/modules";
import { bindActionCreators, Dispatch } from "redux";
import { EncountersMiddleware } from "app/modules/encounters/middleware";
import { push } from "react-router-redux";
import { ActiveEncounter } from "app/components/Encounters/ActiveEncounter/ActiveEncounter";
import { CharactersMiddleware } from "app/modules/characters/middleware";

export namespace Encounters {
    export interface Props {
        actions:encountersActions;
        encounterFormData:FormState;
        characterFormData:FormState;
        encounters:EncounterModel[];
        campaigns:CampaignModel[];
        characters:CharacterModel[];
    }

    export interface State {
        showAddEncounterModal:boolean;
    }

    export type matchParams = {
        campaign?:string,
        encounter?:string,
    }

    export type encountersActions = {
        addEncounter:(encounter:EncounterModelProps) => void;
        updateEncounter:(encounter:EncounterModel) => void;
        initMockEncounters:() => void;
        setActiveEncounter:(id:string) => void;
        addCondition:(encounterId:string, itemId:number, condition:ConditionModel) => void;
        historyPush:(location:string) => void;
        updateCharacter:(character:CharacterModel) => void;
        setCharacterActive:(characterId:string) => void;
    }
}

const AnimatedActionModal = animationContainer(ActionModal);


@connect(
    (state:RootState):Pick<Encounters.Props, 'encounters'|'characterFormData'|'encounterFormData'|'campaigns'|'characters'> => ({
        encounters: state.encounters.all,
        campaigns: state.campaigns.all,
        characters: state.characters.all,
        encounterFormData: state.form.add_encounter,
        characterFormData: state.form.add_character,
    }),
    (dispatch:Dispatch):Pick<Encounters.Props, 'actions'> => ({
        actions: bindActionCreators({
            updateEncounter: (updatedEncounter) => EncountersMiddleware.updateEncounter(updatedEncounter),
            setActiveEncounter: (id) => EncountersMiddleware.setActiveEncounter(id),
            initMockEncounters: () => EncountersMiddleware.initMockEncounters(),
            addEncounter: (encounter) => EncountersMiddleware.addEncounter(encounter),
            addCondition: (encounterId, itemId, condition) => EncountersMiddleware.addCondition(encounterId, itemId,
                condition),
            historyPush: (location) => push(location),
            updateCharacter:(character) => CharactersMiddleware.updateCharacter(character),
            setCharacterActive:(characterId) => CharactersMiddleware.setCharacterActive(characterId),
        }, dispatch)
    }),
)
export class Encounters extends React.Component<Encounters.Props&RouteComponentProps<Encounters.matchParams>, Encounters.State> {
    public state:Encounters.State = {
        showAddEncounterModal: false,
    };

    protected _getActiveCampaign = ():CampaignModel|undefined => {
        const {
            campaigns,
            match: { params: { campaign } },
        } = this.props;

        return campaigns && campaigns.find(camp => getURLFriendlyString(camp.name) === campaign);
    };

    protected _getActiveEncounter = ():EncounterModel|undefined => {
        const {
            encounters,
            match: { params: { encounter:encounterId } },
        } = this.props;

        return encounters && encounters.find(encounter => encounter.id === encounterId);
    };

    protected _getRelevantEncounters = ():EncounterModel[] => {
        const {
            encounters,
        } = this.props;

        const activeCampaign = this._getActiveCampaign();

        let result:EncounterModel[] = [];

        if (encounters) {
            if (activeCampaign) {
                result = encounters.filter(encounter => encounter.campaignId === activeCampaign.id)
                    .sort((a, b) => a.name.localeCompare(b.name));
            }
            else {
                result = encounters.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        return result;
    };

    private updateActiveEncounter = (id:string) => {
        const { actions: { updateEncounter, historyPush }, encounters } = this.props;
        const activeCampaign = this._getActiveCampaign();

        for (let encounter of encounters) {
            if (encounter.id === id) {
                const updatedEncounter = new EncounterModel(encounter);
                updatedEncounter.setActive();

                updateEncounter(updatedEncounter);
            }
            else {
                const updatedEncounter = new EncounterModel(encounter);
                updatedEncounter.setInactive();

                updateEncounter(updatedEncounter);
            }
        }

        if(activeCampaign) {
            historyPush(`/encounters/${getURLFriendlyString(activeCampaign.name)}/${id}`)
        }

    };

    render() {
        const { actions, encounterFormData, campaigns, characters, characterFormData } = this.props;
        const { showAddEncounterModal } = this.state;
        const activeCampaign = this._getActiveCampaign();
        const activeEncounter = this._getActiveEncounter();

        const currentCampaignCharacters = characters && activeCampaign && characters.filter(
            chara => chara.campaignId === activeCampaign.id);

        return !activeEncounter ? (
            <section className="app-encounters">
                <h2>
                   Encounters
                </h2>

                <EncountersList
                    actions={ actions }
                    updateActiveEncounter={ this.updateActiveEncounter }
                    encounters={ this._getRelevantEncounters().sort((a, b) => a.name.localeCompare(b.name)) }/>

                <AnimatedActionModal
                    header='Create Encounter'
                    description='Below, you can create a new encounter'
                    identifier='add-encounter-modal'
                    isMounted={ showAddEncounterModal }>
                    <AddEncounterForm
                        formData={ encounterFormData }
                        campaigns={ campaigns }
                        characters={ characters }
                        initialValues={ {
                            members: currentCampaignCharacters && currentCampaignCharacters.map(chara => ({
                                _fields: {
                                    name: chara.name,
                                    hp: chara.hp,
                                    ac: chara.ac,
                                    roll: 10,
                                    characterId: chara.id,
                                }
                            }))
                        } }
                        currentCampaign={ activeCampaign && activeCampaign.id }
                        addEncounter={ (encounter) => {
                            actions.addEncounter(encounter);
                            this.setState({ showAddEncounterModal: false })
                        } }
                        closeModal={ () => this.setState({ showAddEncounterModal: false }) }/>
                </AnimatedActionModal>
                <Button
                    buttonClass='add-encounter'
                    label={ svg.add }
                    onSubmit={ () => this.setState({ showAddEncounterModal: true }) }/>
            </section>
        ) : <ActiveEncounter
            characters={ characters }
            characterFormData={ characterFormData }
            actions={ actions }
            activeEncounter={ activeEncounter } />
    }
}
