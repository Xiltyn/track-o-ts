import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/modules/index';

import { Footer, Header } from 'app/components';
import { RouterState } from "react-router-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AuthMiddleware } from "app/modules/auth/middleware";
import { Sidebar } from "app/components/Sidebar/Sidebar";
import { SidebarActions } from "app/modules/sidebar/actions";
import { sidebarSections } from "app/models/Sidebar.types";
import animationContainer from "app/utils/animationContainer/animationContainer";
import { Encounters } from "app/components/Encounters/Encounters";
import { EncountersMiddleware } from "app/modules/encounters/middleware";
import { EncounterModel } from "app/models/EncounterModel";

export namespace App {
    import SidebarState = RootState.SidebarState;
    import encountersActions = Encounters.encountersActions;

    export interface Props extends RouteComponentProps<{view:string}> {
        router:RouterState,
        sidebar:SidebarState,
        appActions:appActions,
        encounters:Array<EncounterModel>|undefined,
        sidebarActions:SidebarActions,
        encountersActions:encountersActions,
    }

    export type appActions = {
        logout:() => void,
    }
}

const AnimatedEncounters = animationContainer(Encounters);

@connect(
    (state:RootState):Pick<App.Props, 'router'|'sidebar'|'encounters'> => ({
        router: state.router,
        sidebar: state.sidebar,
        encounters: state.encounters.encounters,
    }),
    (dispatch:Dispatch):Pick<App.Props, 'appActions'|'sidebarActions'|'encountersActions'> => ({
        appActions: bindActionCreators({
            logout: () => AuthMiddleware.logout(),
        }, dispatch),
        sidebarActions: bindActionCreators({
            updateSection: (payload:{currentSection:sidebarSections}) => SidebarActions.updateSection(payload),
            toggleSidebar: () => SidebarActions.toggleSidebar(),
        }, dispatch),
        encountersActions: bindActionCreators({
            setActiveEncounter:(id:number) => EncountersMiddleware.setActiveEncounter(id),
            initMockEncounters:() => EncountersMiddleware.initMockEncounters(),
        }, dispatch)
    }),
)
export class App extends React.Component<App.Props & RouteComponentProps> {
    static defaultProps:Partial<App.Props> = {

    };

    render() {
        const {
            encountersActions,
            sidebarActions,
            appActions,
            sidebar,
            encounters,
            match,
        } = this.props;

        console.log(match.params);

        return (
            <div className="app-container">
                <Sidebar
                    currentSection={ sidebar.currentSection }
                    encounters={ encounters }
                    showSidebar={ sidebar.showSidebar }
                    menuData={ sidebar.menuData }
                    actions={ { ...sidebarActions, ...encountersActions} }/>
                <div className={ `content ${ sidebar.showSidebar ? 'showSidebar' : '' }` }>
                    <Header
                        logout={ appActions.logout }
                        toggleSidebar={ sidebarActions.toggleSidebar }/>
                        <AnimatedEncounters
                            actions={ encountersActions }
                            encounters={ encounters }
                            isMounted={ match.params && match.params.view === 'encounters' }/>
                    <Footer/>
                </div>
            </div>
        );
    }
}
