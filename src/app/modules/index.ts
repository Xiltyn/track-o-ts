import { combineReducers } from 'redux';
import { RootState } from './state';
import { routerReducer, RouterState } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { authReducer } from "./auth/reducer";
import { sidebarReducer } from "app/modules/sidebar/reducer";
import { encountersReducer } from "app/modules/encounters/reducer";

export { RootState, RouterState };

// NOTE: current type definition of Reducer in 'react-router-redux' and 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
    router: routerReducer as any,
    form: formReducer as any,
    auth: authReducer as any,
    sidebar: sidebarReducer as any,
    encounters: encountersReducer as any,
});


