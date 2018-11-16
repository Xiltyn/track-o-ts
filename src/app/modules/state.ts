import { RouterState } from 'react-router-redux';
import { FormStateMap } from 'redux-form';
import { AuthModel } from '../models/AuthModel';
import { SidebarModel } from "app/models/SidebarModel";
import { EncountersModel } from "app/models/EncounterModel";

export interface RootState {
    router:RouterState,
    form:FormStateMap,
    auth:AuthModel,
    sidebar:SidebarModel,
    encounters:EncountersModel,
}

export namespace RootState {
    export type AuthState = AuthModel;
    export type SidebarState = SidebarModel;
    export type EncounterState = EncountersModel;

}
