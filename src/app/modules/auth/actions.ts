import { createAction } from 'redux-actions';
import { AuthModel } from 'app/models/index';

export namespace AuthActions {
    export enum Type {
        REQ_DISPATCH = 'REQ_DISPATCH',
        REQ_FAILURE = 'REQ_FAILURE',
        SIGNIN = 'SIGNIN',
        SIGNIN_FAILED = 'SIGNIN_FAILED',
        SIGNIN_SUCCESSFUL = 'SIGNIN_SUCCESSFUL',
        LOGOUT = 'LOGOUT',
        ISLOGGEDIN = 'ISLOGGEDIN',
        ISLOGGEDIN_FAILED = 'ISLOGGEDIN_FAILED',
        ISLOGGEDIN_SUCCESSFUL = 'ISLOGGEDIN_SUCCESSFUL',
        RESET_PASSWORD = 'RESET_PASSWORD',
        SET_NEW_PASSWORD = 'SET_NEW_PASSWORD',
    }

    export const requestDispatch = createAction(Type.REQ_DISPATCH);
    export const requestFailure = createAction<PartialPick<AuthModel, 'statusMessage'>>(Type.REQ_FAILURE);

    export const signin = createAction<PartialPick<AuthModel, 'user'>>(Type.SIGNIN);
    export const logout = createAction(Type.LOGOUT);
    export const resetPassword = createAction<PartialPick<AuthModel, 'statusMessage'>>(Type.RESET_PASSWORD);
    export const setNewPassword = createAction(Type.SET_NEW_PASSWORD);
}

export type AuthActions = Omit<typeof AuthActions, 'Type'>;

