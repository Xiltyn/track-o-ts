import * as React from 'react';
import { sidebarMenuData, sidebarSections } from "app/models/Sidebar.types";
import { SidebarMenu } from "app/components/Sidebar/SidebarMenu/SidebarMenu";
import { SidebarActions } from "app/modules/sidebar/actions";

import { RouteComponentProps, withRouter } from "react-router";
import { Encounters } from "app/components/Encounters/Encounters";
import { EncounterModel } from "app/models/EncounterModel";
import { CampaignModel } from "app/models/CampaignModel";
import { Campaigns } from "app/components/Campaigns/Campaigns";

import './Sidebar.scss';
import { CharacterModel } from "app/models/CharacterModel";

export namespace SidebarComponent {
    export interface Props {
        actions?: SidebarComponentActions,
        menuData: sidebarMenuData,
        currentSection: sidebarSections,
        campaigns?: CampaignModel[],
        characters?: CharacterModel[],
        encounters?: EncounterModel[],
        showSidebar: boolean,
    }

    export type SidebarComponentActions = SidebarActions & Encounters.encountersActions & Campaigns.campaignsActions & {historyPush:(location:string) => void}
}

class SidebarComponent extends React.Component<SidebarComponent.Props & RouteComponentProps> {
    updateSection = (payload:{currentSection:sidebarSections}) => {
        const { actions, history } = this.props;

        if(actions) actions.updateSection(payload);
        history.push(`/${ payload.currentSection }`)

    };

    render() {
        const {
            menuData,
            currentSection,
            encounters,
            campaigns,
            characters,
            showSidebar,
            actions,
        } = this.props;

        const currentMenuItem = menuData.find(el => el.slug === currentSection);

        return(
            <div className={ `sidebar ${ showSidebar ? 'active' : '' }` }>
                <h3 className="section-header">Menu</h3>
                <div className="current-section-container">
                    <SidebarMenu
                        onItemSelect={ this.updateSection }
                        encounters={ encounters }
                        campaigns={ campaigns }
                        characters={ characters }
                        actions={ actions }
                        currentActive={ currentMenuItem && currentMenuItem.id }
                        menuData={ menuData }/>
                </div>
            </div>
        )
    }

}

export const Sidebar = withRouter<SidebarComponent.Props & RouteComponentProps>(SidebarComponent);
