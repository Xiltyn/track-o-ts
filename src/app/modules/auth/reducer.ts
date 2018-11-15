import { handleActions } from 'redux-actions';
import { RootState } from '../state';
import { AuthActions } from './actions';
import { AuthModel } from '../../models/index';

const initialState:RootState.AuthState = {
    user: null,
    statusMessage: '',
    started: false,
    completed: false,
    failed: false,
};

export const authReducer = handleActions<RootState.AuthState, AuthModel>(
    {
        [ AuthActions.Type.REQ_DISPATCH ]: state => ({
             ...state,
            started: true,
            failed: false,
            completed: false,
        }),
        [ AuthActions.Type.REQ_FAILURE]: (state, action) => ({
            ...state,
            started: false,
            completed: true,
            failed: true,
            statusMessage: action.payload ? action.payload.statusMessage : '',
        }),
        [ AuthActions.Type.SIGNIN ]: (state, action) => ({
            ...state,
            started: false,
            completed: true,
            failed: false,
            statusMessage: '',
            user: action.payload ? action.payload.user : null,
        }),
        [ AuthActions.Type.LOGOUT ]: () => initialState,
    },
    initialState
);
