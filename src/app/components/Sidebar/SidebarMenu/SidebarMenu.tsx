import * as React from 'react';
import { sidebarMenuData, sidebarSections } from "app/models/Sidebar.types";
import { CampaignModel } from "app/models/CampaignModel";
import { CharacterModel } from "app/models/CharacterModel";
import { SidebarComponent } from "app/components/Sidebar/Sidebar";

export namespace SidebarMenu {
    export interface Props {
        menuData: sidebarMenuData,
        characters?: CharacterModel[];
        campaigns?: CampaignModel[];
        actions?: SidebarComponent.SidebarComponentActions;
        currentActive?: number,
        onItemSelect: (payload:{ currentSection:sidebarSections }) => void,
    }
}

export const SidebarMenu = (props:SidebarMenu.Props) =>
    <ul className="sidebar-menu">
        {
            props.menuData.map(item => (
                <li key={ item.id }
                    className={ `menu-item ${ item.id === props.currentActive ? 'active' : '' }` }>
                    <div
                        onClick={ () => props.onItemSelect({ currentSection: item.slug }) }
                        className="item-header">
                        <p>{ item.name }</p>
                    </div>
                    <div className="list-container">
                        {
                            props.currentActive === item.id &&
                            <item.component
                                campaigns={ props.campaigns }
                                characters={ props.characters }
                                actions={ props.actions }/>
                        }
                    </div>
                </li>
            ))
        }
    </ul>;
