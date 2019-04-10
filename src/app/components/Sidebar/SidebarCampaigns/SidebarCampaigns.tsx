import * as React from "react";
import { SidebarComponent } from "app/components/Sidebar/Sidebar";
import { getURLFriendlyString } from "app/utils/getURLFriendlyString/getURLFriendlyString";

export const SidebarCampaigns = (props:Pick<SidebarComponent.Props, 'campaigns'|'actions'>) => <ul className="sidebar-list sidebar-campaigns">
    {
        props.campaigns && props.campaigns.sort((a,b) => a.name.localeCompare(b.name)).map(campaign => (
            <li
                className={ campaign.isActive ? 'active' : '' }
                onClick={ () => {
                    if(props.actions) {
                        if(props.actions.setActiveCampaign) { props.actions.setActiveCampaign(campaign.id) }
                        props.actions.historyPush(`/encounters/${getURLFriendlyString(campaign.name)}`)
                    }
                } }
                key={ campaign.id }>
                <p>{ campaign.name }</p>
            </li>
        ))
    }
</ul>;
