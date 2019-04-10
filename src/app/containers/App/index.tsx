import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps } from 'react-router';
import { RootState } from 'app/modules/index';

import { Footer, Header } from 'app/components';
import { bindActionCreators, Dispatch } from "redux";
import { AuthMiddleware } from "app/modules/auth/middleware";
import { Sidebar } from "app/components/Sidebar/Sidebar";
import { SidebarActions } from "app/modules/sidebar/actions";
import { Encounters } from "app/components/Encounters/Encounters";
import { Campaigns } from "app/components/Campaigns/Campaigns";
import { Characters } from 'app/components/Characters/Characters';
import { Monsters } from "app/components/Monsters/Monsters";
import { EncountersMiddleware } from "app/modules/encounters/middleware";
import CampaignsMiddleware from "app/modules/campaigns/middleware";
import { CharactersMiddleware } from "app/modules/characters/middleware";

export namespace App {
    export interface Props extends RouteComponentProps<{ view:string, id:string }> {
        appActions:appActions;
        showSidebar: boolean,
        sidebarActions:Pick<SidebarActions, 'toggleSidebar'>;
    }

    export type appActions = {
        logout:() => void;
        initEncounters: () => void;
        initCampaigns: () => void;
        initCharacters: () => void;
    }
}

@connect(
    (state:RootState):Pick<App.Props, 'showSidebar'> => ({
        showSidebar: state.sidebar.showSidebar,
    }),
    (dispatch:Dispatch):Pick<App.Props, 'appActions'|'sidebarActions'> => ({
        appActions: bindActionCreators({
            logout: () => AuthMiddleware.logout(),
            initEncounters: () => EncountersMiddleware.initEncountersListener(),
            initCampaigns: () => CampaignsMiddleware.initCampaignsListener(),
            initCharacters: () => CharactersMiddleware.initCharactersListener(),
        }, dispatch),
        sidebarActions: bindActionCreators({
            toggleSidebar: () => SidebarActions.toggleSidebar(),
        }, dispatch),
    }),
)
export class App extends React.Component<App.Props&RouteComponentProps<{ view:string, id:string }>> {
    public componentDidMount():void {
        const { appActions } = this.props;

        appActions.initEncounters();
        appActions.initCampaigns();
        appActions.initCharacters();
    }

    render() {
        const {
            sidebarActions,
            appActions,
            showSidebar,
        } = this.props;

        return (
            <div className="app-container">
                <Sidebar/>

                <div className={ `content ${ showSidebar ? 'showSidebar' : '' }` }>
                    <Header
                        logout={ appActions.logout }
                        toggleSidebar={ sidebarActions.toggleSidebar }/>

                    <Route
                        path='/encounters/:campaign?/:encounter?'
                        component={ Encounters }/>
                    <Route
                        path='/characters/:campaign?'
                        component={ Characters }/>
                    <Route
                        path='/campaigns'
                        component={ Campaigns }/>
                    <Route
                        path='/monsters/:monster?'
                        component={ Monsters }/>
                    <Footer/>
                </div>
            </div>
        );
    }
}
