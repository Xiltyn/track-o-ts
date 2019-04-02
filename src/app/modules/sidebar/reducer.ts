import { RootState } from "app/modules";
import { handleActions } from "redux-actions";
import { SidebarModel } from "app/models/SidebarModel";
import { SidebarActions } from "app/modules/sidebar/actions";
import { SidebarCampaigns } from "app/components/Sidebar/SidebarCampaigns/SidebarCampaigns";
import { SidebarEncounters } from "app/components/Sidebar/SidebarEncounters/SidebarEncounters";
import { SidebarCharacters } from "app/components/Sidebar/SidebarCharacters/SidebarCharacters";
import { SidebarMonsters } from "app/components/Sidebar/SidebarMonsters/SidebarMonsters";

const initialState:RootState.SidebarState = {
    showSidebar: false,
    currentSection:"campaigns",
    menuData:[
        {
            id: 1,
            name: 'Campaigns',
            slug: 'campaigns',
            component: SidebarCampaigns,
        },
        {
            id: 2,
            name: 'Encounters',
            slug: 'encounters',
            component: SidebarEncounters,
        },
        {
            id: 3,
            name: 'Characters',
            slug: 'characters',
            component: SidebarCharacters,
        },
        {
            id: 4,
            name: 'Monsters',
            slug: 'monsters',
            component: SidebarMonsters,
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
