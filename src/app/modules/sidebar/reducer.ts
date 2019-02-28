import { RootState } from "app/modules";
import { handleActions } from "redux-actions";
import { SidebarModel } from "app/models/SidebarModel";
import { SidebarActions } from "app/modules/sidebar/actions";

const initialState:RootState.SidebarState = {
    showSidebar: false,
    currentSection:"campaigns",
    menuData:[
        {
            id: 1,
            name: 'Campaigns',
            slug: 'campaigns',
        }
    ]
};

export const sidebarReducer = handleActions<RootState.SidebarState, SidebarModel>(
    {
        [ SidebarActions.Type.UPDATE_SECTION ]: (state, action) => ({
            ...state,
            currentSection: action.payload && action.payload.currentSection || null
        }),
        [ SidebarActions.Type.TOGGLE_SIDEBAR ]: (state) => ({
            ...state,
            showSidebar: !state.showSidebar,
        }),
    },
    initialState,
);
