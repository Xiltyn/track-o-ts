import * as React from 'react';
import { sidebarMenuData, sidebarSections } from "app/models/Sidebar.types";

export namespace SidebarMenu {
    export interface Props {
        menuData: sidebarMenuData,
        currentActive?: number,
        onItemSelect: (payload:{ currentSection:sidebarSections }) => void,
    }
}

export const SidebarMenu = (props:SidebarMenu.Props) =>
    <ul className="sidebar-menu">
        {
            props.menuData.map(item => (
                <li
                    onClick={ () => props.onItemSelect({ currentSection: item.slug }) }
                    className={ `menu-item ${ item.id === props.currentActive ? 'active' : '' }` }
                    key={ item.id }>
                    <p>{ item.name }</p>
                </li>
            ))
        }
    </ul>;
