import * as React from 'react';
import { sidebarSections } from "app/models/Sidebar.types";
import { SidebarMenu } from "app/components/Sidebar/SidebarMenu/SidebarMenu";
import { SidebarActions } from "app/modules/sidebar/actions";

import { RouteComponentProps, withRouter } from "react-router";
import { CampaignModel } from "app/models/CampaignModel";
import { Campaigns } from "app/components/Campaigns/Campaigns";

import './Sidebar.scss';
import { CharacterModel } from "app/models/CharacterModel";
import { connect } from "react-redux";
import { RootState } from "app/modules";
import { bindActionCreators, Dispatch } from "redux";
import { MonsterModel } from "app/models/MonsterModel";
import { SidebarModel } from "app/models/SidebarModel";
import { push } from "react-router-redux";
import CampaignsMiddleware from "app/modules/campaigns/middleware";
import { AppLoader } from "app/components";

export namespace SidebarComponent {
    export interface Props {
        actions?: SidebarComponentActions,
        campaigns?: CampaignModel[],
        characters?: CharacterModel[],
        monsters?: MonsterModel[],
        sidebar?: SidebarModel,
    }

    export type SidebarComponentActions = SidebarActions & Partial<Campaigns.campaignsActions> & {historyPush:(location:string) => void}
}

@connect(
    (state:RootState):Pick<SidebarComponent.Props, 'campaigns'|'characters'|'monsters'|'sidebar'> => ({
        campaigns: state.campaigns.all,
        characters: state.characters.all,
        monsters: state.monsters.all,
        sidebar: state.sidebar,
    }),
    (dispatch:Dispatch):Pick<SidebarComponent.Props, 'actions'> => ({
        actions: bindActionCreators({
            updateSection: (payload) => SidebarActions.updateSection(payload),
            toggleSidebar: (payload) => SidebarActions.toggleSidebar(payload),
            setActiveCampaign: (campaignId) => CampaignsMiddleware.setActiveCampaign(campaignId),
            historyPush: (location) => push(location),
        }, dispatch)
    }),
)

class SidebarComponent extends React.Component<SidebarComponent.Props & RouteComponentProps> {
    updateSection = (payload:{currentSection:sidebarSections}) => {
        const { actions, history } = this.props;

        if(actions) actions.updateSection(payload);
        history.push(`/${ payload.currentSection }`)

    };

    render() {
        const {
            sidebar,
            campaigns,
            characters,
            actions,
        } = this.props;

        const currentMenuItem = sidebar && sidebar.menuData.find(el => el.slug === sidebar.currentSection);

        return sidebar ? (
            <div className={ `sidebar ${ sidebar.showSidebar ? 'active' : '' }` }>
                <h3 className="section-header">Menu</h3>
                <div className="current-section-container">
                    <SidebarMenu
                        onItemSelect={ this.updateSection }
                        campaigns={ campaigns }
                        characters={ characters }
                        actions={ actions }
                        currentActive={ currentMenuItem && currentMenuItem.id }
                        menuData={ sidebar.menuData }/>
                </div>
            </div>
        ) : (
            <AppLoader/>
        )
    }

}

export const Sidebar = withRouter<SidebarComponent.Props & RouteComponentProps>(SidebarComponent);
