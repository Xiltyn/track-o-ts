import { Dispatch } from "redux";
import { AuthActions } from "app/modules/auth/actions";

export class AuthMiddleware {
    static signInWithEmailAndPassword = (email:string, password:string) => (dispatch:Dispatch) => {
        if(email && password) {
            dispatch(AuthActions.signin());

            setTimeout(() => {
                dispatch(AuthActions.signinSuccessful({
                    user: { email:email },
                    token: 'fake_token'
                }))
            }, 3000);
        }
    }
}
