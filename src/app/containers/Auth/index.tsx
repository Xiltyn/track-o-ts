import * as React from 'react';
import { RootState } from "app/modules";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { SignIn } from "app/components/SignIn/SignIn";
import { FormStateMap } from "redux-form";
import { AuthMiddleware } from "app/modules/auth/middleware";
import { push } from "react-router-redux";
import { RouteComponentProps } from "react-router";

export namespace Auth {
    export interface Props {
        auth:RootState.AuthState,
        forms:FormStateMap,
        actions: authActions,
    }

    export type authActions = {
        signIn:(email:string, password:string) => void,
        historyPush:(location:string) => void,
    }
}

@connect(
    (state:RootState):Pick<Auth.Props, 'auth'|'forms'> => ({
        auth: state.auth,
        forms: state.form,
    }),
    (dispatch:Dispatch):Pick<Auth.Props, 'actions'> => ({
        actions: bindActionCreators({
            signIn: (email:string, password: string) => AuthMiddleware.signInWithEmailAndPassword(email, password),
            historyPush: (location: string) => push(location),
        }, dispatch),
    }),
)

export class Auth extends React.Component<Auth.Props & RouteComponentProps> {
    render() {
        const {
            auth,
            forms,
            actions,
        } = this.props;

        return(
            <div className="auth-container">
                <SignIn
                    animateOut={ () => this.setState({ shouldAnimate: false }) }
                    auth={ auth }
                    forms={ forms }
                    actions={ actions }/>
            </div>
        )
    }
}
