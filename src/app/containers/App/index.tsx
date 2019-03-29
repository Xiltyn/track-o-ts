import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/modules/index';

import { Footer, Header } from 'app/components';
import { push, RouterState } from "react-router-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AuthMiddleware } from "app/modules/auth/middleware";
import { Sidebar } from "app/components/Sidebar/Sidebar";
import { SidebarActions } from "app/modules/sidebar/actions";
import { sidebarSections } from "app/models/Sidebar.types";
import animationContainer from "app/utils/animationContainer/animationContainer";
import { Encounters } from "app/components/Encounters/Encounters";
import { EncountersMiddleware } from "app/modules/encounters/middleware";
import { EncounterModel } from "app/models/EncounterModel";
import { FormStateMap } from "redux-form";
import CampaignsMiddleware from "app/modules/campaigns/middleware";
import { CampaignModel } from "app/models/CampaignModel";
import { Campaigns } from "app/components/Campaigns/Campaigns";
import { Characters } from 'app/components/Characters/Characters';
import { CharactersMiddleware } from "app/modules/characters/middleware";
import { CharacterModel } from "app/models/CharacterModel";

export namespace App {
    export interface Props extends RouteComponentProps<{view:string, id:string}> {
        forms:FormStateMap;
        router:RouterState,
        sidebar:RootState.SidebarState,
        appActions:appActions,
        campaigns?:CampaignModel[],
        encounters?:EncounterModel[],
        characters?:CharacterModel[],
        sidebarActions:SidebarActions & {historyPush:(location:string) => void},
        encountersActions:Encounters.encountersActions,
        campaignsActions:Campaigns.campaignsActions,
        charactersActions:Characters.charactersActions,
    }

    export type appActions = {
        logout:() => void,
    }
}

const AnimatedEncounters = animationContainer(Encounters);
const AnimatedCharacters = animationContainer(Characters);
const AnimatedCampaigns = animationContainer(Campaigns);

@connect(
    (state:RootState):Pick<App.Props, 'router'|'sidebar'|'encounters'|'forms'|'campaigns'|'characters'> => ({
        router: state.router,
        sidebar: state.sidebar,
        encounters: state.encounters.all,
        campaigns: state.campaigns.all,
        characters: state.characters.all,
        forms: state.form,
    }),
    (dispatch:Dispatch):Pick<App.Props, 'appActions'|'sidebarActions'|'encountersActions'|'campaignsActions'|'charactersActions'> => ({
        appActions: bindActionCreators({
            logout: () => AuthMiddleware.logout(),
        }, dispatch),
        sidebarActions: bindActionCreators({
            updateSection: (payload:{currentSection:sidebarSections}) => SidebarActions.updateSection(payload),
            toggleSidebar: () => SidebarActions.toggleSidebar(),
            historyPush:(location) => push(location),
        }, dispatch),
        encountersActions: bindActionCreators({
            initEncountersListener:() => EncountersMiddleware.initEncountersListener(),
            fetchEncounters:() => EncountersMiddleware.fetchEncounters(),
            updateEncounter:(updatedEncounter) => EncountersMiddleware.updateEncounter(updatedEncounter),
            setActiveEncounter:(id) => EncountersMiddleware.setActiveEncounter(id),
            initMockEncounters:() => EncountersMiddleware.initMockEncounters(),
            addEncounter:(encounter) => EncountersMiddleware.addEncounter(encounter),
            addCondition:(encounterId, itemId, condition) => EncountersMiddleware.addCondition(encounterId, itemId, condition),
        }, dispatch),
        campaignsActions: bindActionCreators({
            initCampaignsListener:() => CampaignsMiddleware.initCampaignsListener(),
            fetchCampaigns:() => CampaignsMiddleware.fetchCampaigns(),
            addCampaign:(campaign) => CampaignsMiddleware.addCampaign(campaign),
            updateCampaign:(campaign) => CampaignsMiddleware.updateCampaign(campaign),
            setActiveCampaign:(id) => CampaignsMiddleware.setActiveCampaign(id),
        }, dispatch),
        charactersActions: bindActionCreators({
            initCharactersListener:() => CharactersMiddleware.initCharactersListener(),
            fetchCharacters:() => CharactersMiddleware.fetchCharacters(),
            addCharacter:(character) => CharactersMiddleware.addCharacter(character),
            updateCharacter:(character) => CharactersMiddleware.updateCharacter(character),
            setCharacterActive:(characterId) => CharactersMiddleware.setCharacterActive(characterId),
        }, dispatch),
    }),
)
export class App extends React.Component<App.Props & RouteComponentProps<{view:string, id:string}>> {
    public componentDidMount():void {
        const { sidebarActions, campaignsActions, encountersActions, charactersActions, match } = this.props;

        if(campaignsActions) {
            campaignsActions.fetchCampaigns();
            campaignsActions.initCampaignsListener();
        }

        if(encountersActions) {
            encountersActions.fetchEncounters();
            encountersActions.initEncountersListener();
        }

        if(charactersActions) {
            charactersActions.fetchCharacters();
            charactersActions.initCharactersListener();
        }

        if(!match.params.view && sidebarActions) {
            sidebarActions.historyPush('/campaigns')
        }
    }

    render() {
        const {
            encountersActions,
            sidebarActions,
            campaignsActions,
            charactersActions,
            appActions,
            characters,
            sidebar,
            encounters,
            campaigns,
            match,
            forms,
        } = this.props;

        return (
            <div className="app-container">
                <Sidebar
                    currentSection={ sidebar.currentSection }
                    encounters={ encounters }
                    campaigns={ campaigns }
                    characters={ characters }
                    showSidebar={ sidebar.showSidebar }
                    menuData={ sidebar.menuData }
                    actions={ { ...sidebarActions, ...encountersActions, ...campaignsActions} }/>
                <div className={ `content ${ sidebar.showSidebar ? 'showSidebar' : '' }` }>
                    <Header
                        logout={ appActions.logout }
                        toggleSidebar={ sidebarActions.toggleSidebar }/>
                    <AnimatedEncounters
                        actions={ encountersActions }
                        formData={ forms.add_encounter }
                        campaigns={ campaigns }
                        characters={ characters }
                        activeCampaign={ match.params && match.params.id }
                        encounters={ encounters }
                        isMounted={ match.params && match.params.view === 'encounters' }/>
                    <AnimatedCharacters
                        actions={ charactersActions }
                        formData={ forms.add_character }
                        activeCampaign={ match.params && match.params.id }
                        characters={ characters }
                        campaigns={ campaigns }
                        isMounted={ match.params && match.params.view === 'characters' }/>
                    <AnimatedCampaigns
                        actions={ { ...campaignsActions, ...sidebarActions, ...encountersActions, ...charactersActions } }
                        campaigns={ campaigns }
                        encounters={ encounters }
                        characters={ characters }
                        campaignFormData={ forms.add_campaign }
                        encounterFormData={ forms.add_encounter }
                        charactersFormData={ forms.add_character }
                        isMounted={ match.params && match.params.view === 'campaigns' }/>
                    <Footer/>
                </div>
            </div>
        );
    }
}
