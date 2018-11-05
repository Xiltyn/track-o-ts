import { RouterState } from 'react-router-redux';
import { FormStateMap } from 'redux-form';
import { AuthModel } from '../models/AuthModel';

export interface RootState {
    router:RouterState;
    form:FormStateMap;
    auth:AuthModel;
}

export namespace RootState {
    export type AuthState = AuthModel;
}
