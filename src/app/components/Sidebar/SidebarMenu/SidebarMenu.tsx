import * as React from 'react';
import { sidebarMenuData, sidebarSections } from "app/models/Sidebar.types";

export namespace SidebarMenu {
    export interface Props {
        menuData: sidebarMenuData,
        onItemSelect: (payload:{ currentSection:sidebarSections }) => void,
    }
}

export const SidebarMenu = (props:SidebarMenu.Props) =>
    <ul className="sidebar-menu">
        {
            props.menuData.map(item => (
                <li
                    onClick={ () => props.onItemSelect({ currentSection: item.slug }) }
                    className="menu-item"
                    key={ item.id }>
                    { item.name }
                </li>
            ))
        }
    </ul>;
