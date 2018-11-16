import { Dispatch } from "redux";
import { AuthActions } from "app/modules/auth/actions";
import { firebaseAuth } from "app/shared/firebase.config";

export class AuthMiddleware {
    static fetchUser = (historyPush:(location:string) => void) => (dispatch:Dispatch) => {
        dispatch(AuthActions.requestDispatch());

        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                dispatch(AuthActions.signin({ user: user }));
                historyPush('/');
            }
            else {
                dispatch(AuthActions.logout());
                historyPush('/login');
            }
        });
    };

    static signInWithEmailAndPassword = (credentials:{ email:string, password:string }) => (dispatch:Dispatch) => {
        dispatch(AuthActions.requestDispatch());

        firebaseAuth.signInWithEmailAndPassword(credentials.email, credentials.password).catch(err => {
            console.log('firebase error', err.message);
            dispatch(AuthActions.requestFailure({ statusMessage: err.message }));
        });
    };

    // Logout Functions Starts
    static logout = () => (dispatch:Dispatch) => {
        firebaseAuth.signOut().then(() => dispatch(AuthActions.logout()));
    };
}
