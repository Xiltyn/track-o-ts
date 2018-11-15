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

export namespace App {
    import SidebarState = RootState.SidebarState;

    export interface Props extends RouteComponentProps<{view:string}> {
        router:RouterState,
        sidebar:SidebarState,
        appActions:appActions,
        sidebarActions:SidebarActions,
    }

    export type appActions = {
        logout:() => void,
    }
}

const AnimatedEncounters = animationContainer(Encounters);

@connect(
    (state:RootState):Pick<App.Props, 'router'|'sidebar'> => ({
        router: state.router,
        sidebar: state.sidebar,
    }),
    (dispatch:Dispatch):Pick<App.Props, 'appActions'|'sidebarActions'> => ({
        appActions: bindActionCreators({
            logout: () => AuthMiddleware.logout(),
        }, dispatch),
        sidebarActions: bindActionCreators({
            updateSection: (payload:{currentSection:sidebarSections}) => SidebarActions.updateSection(payload),
            toggleSidebar: () => SidebarActions.toggleSidebar(),
        }, dispatch),
    }),
)
export class App extends React.Component<App.Props & RouteComponentProps> {
    static defaultProps:Partial<App.Props> = {

    };

    render() {
        const {
            sidebarActions,
            appActions,
            sidebar,
            match,
        } = this.props;

        console.log(match.params);

        return (
            <div className="app-container">
                <Sidebar
                    currentSection={ sidebar.currentSection }
                    showSidebar={ sidebar.showSidebar }
                    menuData={ sidebar.menuData }
                    actions={ sidebarActions }/>
                <div className={ `content ${ sidebar.showSidebar ? 'showSidebar' : '' }` }>
                    <Header
                        logout={ appActions.logout }
                        toggleSidebar={ sidebarActions.toggleSidebar }/>
                        <AnimatedEncounters
                            isMounted={ match.params && match.params.view === 'encounters' }/>
                    <Footer/>
                </div>
            </div>
        );
    }
}
