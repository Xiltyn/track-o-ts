import { createAction } from 'redux-actions';
import { AuthModel } from 'app/models/index';

export namespace AuthActions {
    export enum Type {
        SIGNIN = 'SIGNIN',
        SIGNIN_FAILED = 'SIGNIN_FAILED',
        SIGNIN_SUCCESSFUL = 'SIGNIN_SUCCESSFUL',
        LOGOUT = 'LOGOUT',
        LOGOUT_SUCCESSFUL = 'LOGOUT_SUCCESSFUL',
        ISLOGGEDIN = 'ISLOGGEDIN',
        ISLOGGEDIN_FAILED = 'ISLOGGEDIN_FAILED',
        ISLOGGEDIN_SUCCESSFUL = 'ISLOGGEDIN_SUCCESSFUL',
        RESET_PASSWORD = 'RESET_PASSWORD',
        RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED',
        RESET_PASSWORD_SUCCESSFUL = 'RESET_PASSWORD_SUCCESSFUL',
        SET_NEW_PASSWORD = 'SET_NEW_PASSWORD',
        SET_NEW_PASSWORD_FAILED = 'SET_NEW_PASSWORD_FAILED',
        SET_NEW_PASSWORD_SUCCESSFUL = 'SET_NEW_PASSWORD_SUCCESSFUL',
        SET_PASSWORD_RESET_TOKEN = 'SET_PASSWORD_RESET_TOKEN'
    }

    export const isLoggedIn = createAction(Type.ISLOGGEDIN);
    export const isLoggedInFailed = createAction<PartialPick<AuthModel, 'statusMessage'>>(Type.ISLOGGEDIN_FAILED);
    export const isLoggedInSuccessful = createAction<PartialPick<AuthModel, 'user'|'token'>>(Type.ISLOGGEDIN_SUCCESSFUL);

    export const signin = createAction(Type.SIGNIN);
    export const signinFailed = createAction<PartialPick<AuthModel, 'statusMessage'>>(Type.SIGNIN_FAILED);
    export const signinSuccessful = createAction<PartialPick<AuthModel, 'user'|'token'>>(Type.SIGNIN_SUCCESSFUL);

    export const logout = createAction(Type.LOGOUT);
    export const logoutSuccessful = createAction(Type.LOGOUT_SUCCESSFUL);

    export const resetPassword = createAction(Type.RESET_PASSWORD);
    export const resetPasswordSuccessful = createAction<PartialPick<AuthModel, 'statusMessage'>>(Type.RESET_PASSWORD_SUCCESSFUL);
    export const resetPasswordRejected = createAction<PartialPick<AuthModel, 'statusMessage'>>(Type.RESET_PASSWORD_FAILED);

    export const setPasswordResetToken = createAction<PartialPick<AuthModel, 'token'>>(Type.SET_PASSWORD_RESET_TOKEN);

    export const setNewPassword = createAction(Type.SET_NEW_PASSWORD);
    export const setNewPasswordSuccessful = createAction<PartialPick<AuthModel, 'statusMessage'>>(Type.SET_NEW_PASSWORD_SUCCESSFUL);
    export const setNewPasswordRejected = createAction<PartialPick<AuthModel, 'statusMessage'>>(Type.SET_NEW_PASSWORD_FAILED);
}

export type AuthActions = Omit<typeof AuthActions, 'Type'>;

