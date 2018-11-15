import { RouterState } from 'react-router-redux';
import { FormStateMap } from 'redux-form';
import { AuthModel } from '../models/AuthModel';
import { SidebarModel } from "app/models/SidebarModel";

export interface RootState {
    router:RouterState,
    form:FormStateMap,
    auth:AuthModel,
    sidebar:SidebarModel,
}

export namespace RootState {
    export type AuthState = AuthModel;
    export type SidebarState = SidebarModel;
}
