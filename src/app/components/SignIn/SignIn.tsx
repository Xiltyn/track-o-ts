import * as React from 'react';
import { RootState } from "../../modules";
import { Form, FormStateMap, InjectedFormProps, reduxForm } from "redux-form";
import { Auth } from "../../containers/Auth";
import { AppLoader } from "../../components";
import { appLoader } from '../__universal/AppLoader/AppLoader';
import { InputField } from "../__universal/InputField/InputField";
import AuthState = RootState.AuthState;
import authActions = Auth.authActions;
import animationContainer from "app/utils/animationContainer/animationContainer";
import './SignIn.scss';

export namespace SignInComponent {
    export interface Props {
        auth:AuthState,
        actions:authActions,
        forms:FormStateMap,
        animateOut:() => void,
    }

    export interface State {
        shouldRender: boolean,
    }
}


const SignInModal = (props:{handleSubmit:(evt:Event) => void}) => {
    const {
        handleSubmit,
    } = props;

    return (
        <div className="signin-container">
            <h1>
                Sign In
            </h1>
            <Form
                className="signin-form"
                onSubmit={ handleSubmit }>
                <InputField
                    className='field-email'
                    label='Email'
                    placeholder='regular.gnoll@happy.mail'
                    name='email'/>
                <InputField
                    className='field-password'
                    label='Password'
                    placeholder='*********'
                    name='password'
                    type='password'/>
                <button>
                    SUBMIT
                </button>
            </Form>
        </div>
    );
};

const AnimatedSignIn = animationContainer(SignInModal);

class SignInComponent extends React.Component<SignInComponent.Props & InjectedFormProps<{}, SignInComponent.Props>, SignInComponent.State> {
    state:SignInComponent.State = {
        shouldRender: false,
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                shouldRender: true,
            })
        }, 0)
    }
    componentDidUpdate(oldProps:SignInComponent.Props & InjectedFormProps<{}, SignInComponent.Props>) {
        if(!oldProps.auth.user.email && this.props.auth.user.email) {
            this.props.actions.historyPush('/app');
        }
    }

    handleSubmit = (evt:Event) => {
        evt.preventDefault();
        const { actions: { signIn }, forms: { signin: { values } } } = this.props;

        if(values) {
            if(values.email && values.password) {
                this.setState({
                   shouldRender: false,
                });

                setTimeout(() => {
                    signIn(values.email, values.password);
                }, 1000);
            }
        }
    };

    render() {
        const {
            auth,
        } = this.props;

        const {
            shouldRender,
        } = this.state;

        return auth.started && (!auth.completed || !auth.failed )
            ? <AppLoader type={ appLoader.loaderType.FULL }/>
            : (
            <AnimatedSignIn
                handleSubmit={ this.handleSubmit }
                isMounted={ shouldRender }
                identifier="signin"/>
        )
    }
}

export const SignIn = reduxForm<{}, SignInComponent.Props>({
    form: 'signin',
})(SignInComponent);
