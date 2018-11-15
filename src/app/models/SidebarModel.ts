import { sidebarMenuData, sidebarSections } from "app/models/Sidebar.types";

export interface SidebarModel {
    currentSection:sidebarSections,
    menuData:sidebarMenuData,
    showSidebar:boolean,
}
