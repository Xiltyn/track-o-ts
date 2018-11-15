import { createAction } from "redux-actions";
import { SidebarModel } from "app/models/SidebarModel";

export namespace SidebarActions {
    export enum Type {
        UPDATE_SECTION = 'UPDATE_SECTION',
        TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR',
    }

    export const updateSection = createAction<PartialPick<SidebarModel, 'currentSection'>>(Type.UPDATE_SECTION);
    export const toggleSidebar = createAction(Type.TOGGLE_SIDEBAR);
}

export type SidebarActions = Omit<typeof SidebarActions, 'Type'>;
