import * as React from 'react';
import { sidebarMenuData, sidebarSections } from "app/models/Sidebar.types";
import { SidebarMenu } from "app/components/Sidebar/SidebarMenu/SidebarMenu";
import { SidebarActions } from "app/modules/sidebar/actions";

import './Sidebar.scss';
import { RouteComponentProps, withRouter } from "react-router";
import { Encounters } from "app/components/Encounters/Encounters";
import { EncounterModel } from "app/models/EncounterModel";
import animationContainer from "app/utils/animationContainer/animationContainer";
import { CampaignModel } from "app/models/CampaignModel";
import { Campaigns } from "app/components/Campaigns/Campaigns";


export namespace SidebarComponent {
    export interface Props {
        actions?: SidebarActions & Encounters.encountersActions & Campaigns.campaignsActions & {historyPush:(location:string) => void},
        menuData: sidebarMenuData,
        campaigns?: CampaignModel[],
        currentSection: sidebarSections,
        encounters?: EncounterModel[],
        showSidebar: boolean,
    }
}

const SidebarEncounters = (props:Pick<SidebarComponent.Props, 'encounters'|'actions'>) => <ul className="sidebar-list sidebar-encounters">
    {
        props.encounters && props.encounters.sort((a,b) => a.name.localeCompare(b.name)).map(encounter => (
            <li
                className={ encounter.isActive ? 'active' : '' }
                onClick={ () => props.actions && props.actions.setActiveEncounter(encounter.id) }
                key={ encounter.id }>
                <p>{ encounter.name }</p>
            </li>
        ))
    }
</ul>;

const SidebarCampaigns = (props:Pick<SidebarComponent.Props, 'campaigns'|'actions'>) => <ul className="sidebar-list sidebar-campaigns">
    {
        props.campaigns && props.campaigns.sort((a,b) => a.name.localeCompare(b.name)).map(campaign => (
            <li
                className={ campaign.isActive ? 'active' : '' }
                onClick={ () => {
                    if(props.actions) {
                        props.actions.setActiveCampaign(campaign.id)
                        props.actions.historyPush(`/encounters/${campaign.id}`)
                    }
                } }
                key={ campaign.id }>
                <p>{ campaign.name }</p>
            </li>
        ))
    }
</ul>;

const AnimatedSidebarEncounters = animationContainer(SidebarEncounters);
const AnimatedSidebarCampaigns = animationContainer(SidebarCampaigns);

class SidebarComponent extends React.Component<SidebarComponent.Props & RouteComponentProps> {
    updateSection = (payload:{currentSection:sidebarSections}) => {
        const { actions, history } = this.props;

        if(actions) actions.updateSection(payload);
        history.push(`/${ payload.currentSection !== 'menu' && payload.currentSection }`)

    };

    render() {
        const {
            menuData,
            currentSection,
            encounters,
            campaigns,
            showSidebar,
            actions,
        } = this.props;

        const currentMenuItem = menuData.find(el => el.slug === currentSection);

        return(
            <div className={ `sidebar ${ showSidebar ? 'active' : '' }` }>
                <h3 className="section-header">
                    Menu
                    { /*<button className="btn-back">*/ }
                        { /*{ svg.return }*/ }
                    { /*</button>*/ }
                </h3>
                <div className="current-section-container">
                    <SidebarMenu
                        onItemSelect={ this.updateSection }
                        currentActive={ currentMenuItem && currentMenuItem.id }
                        menuData={ menuData }/>
                    <AnimatedSidebarEncounters
                        isMounted={ currentMenuItem && currentMenuItem.slug === 'encounters' }
                        encounters={ encounters }
                        actions={ actions }/>
                    <AnimatedSidebarCampaigns
                        isMounted={ currentMenuItem && currentMenuItem.slug === 'campaigns' }
                        campaigns={ campaigns }
                        actions={ actions }/>

                </div>
            </div>
        )
    }

}

export const Sidebar = withRouter<SidebarComponent.Props & RouteComponentProps>(SidebarComponent);
