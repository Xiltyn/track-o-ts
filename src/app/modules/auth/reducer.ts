import { handleActions } from 'redux-actions';
import { RootState } from '../state';
import { AuthActions } from './actions';
import { AuthModel } from '../../models/index';

const initialState:RootState.AuthState = {
    user: {},
    token: '',
    statusMessage: '',
    started: false,
    completed: false,
    failed: false,
};

export const authReducer = handleActions<RootState.AuthState, AuthModel>(
    {
        [ AuthActions.Type.SIGNIN || AuthActions.Type.ISLOGGEDIN ]: state => ({
             ...state,
            started: true,
            failed: false,
            completed: false,
        }),
        [ AuthActions.Type.SIGNIN_FAILED || AuthActions.Type.ISLOGGEDIN_FAILED ]: (state, action) => ({
            ...state,
            started: false,
            completed: true,
            failed: true,
            statusMessage: action.payload ? action.payload.statusMessage : '',
        }),
        [ AuthActions.Type.SIGNIN_SUCCESSFUL || AuthActions.Type.ISLOGGEDIN_SUCCESSFUL ]: (state, action) => ({
            ...state,
            started: false,
            completed: true,
            failed: false,
            user: action.payload ? action.payload.user : {},
            token: action.payload ? action.payload.token : '',
        }),
    },
    initialState
);
