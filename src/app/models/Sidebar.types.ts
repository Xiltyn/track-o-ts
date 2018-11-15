export type sidebarMenuData = Array<sidebarMenuElement>;

export type sidebarMenuElement = {
    id:number,
    name:string,
    slug:sidebarSections,
};

export type sidebarSections = 'menu'|'campaigns'|'encounters';
