import { ComponentClass, StatelessComponent } from "react";

export type sidebarMenuData = Array<sidebarMenuElement>;

export type sidebarMenuElement = {
    id:number,
    name:string,
    slug:sidebarSections,
    component:ComponentClass<any>|StatelessComponent<any>
};

export type sidebarSections = 'campaigns'|'characters'|'encounters'|null;
