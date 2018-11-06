import * as React from 'react';
import { RootState } from "../../modules";
import { Form, FormStateMap, InjectedFormProps, reduxForm } from "redux-form";
import { Auth } from "../../containers/Auth";
import { InputField } from "../__universal/InputField/InputField";
import AuthState = RootState.AuthState;
import authActions = Auth.authActions;
import animationContainer from "app/utils/animationContainer/animationContainer";
import './SignIn.scss';
import Button from "app/components/__universal/Button/Button";

export namespace SignInComponent {
    export interface Props {
        auth:AuthState,
        actions:authActions,
        forms:FormStateMap,
        animateOut:() => void,
    }

    export interface State {
    }
}


const SignInModal = (props:{handleSubmit:(evt:Event) => void, isBusy:boolean},) => {
    const {
        handleSubmit,
        isBusy
    } = props;

    return (
            <div className="signin-container">
                <h1 className='logo'>
                    <span className='big-letter'>t</span>rack<span className='logo-o'>o</span>
                </h1>
                <Form
                    className="signin-form"
                    onSubmit={ handleSubmit }>
                    <h2>
                        Sign In
                    </h2>
                    <InputField
                        className='field-email'
                        name='email'
                        label='email'
                        placeholder='john.lemon@fritz.cola'/>
                    <InputField
                        className='field-password'
                        name='password'
                        type='password'
                        label='password'
                        placeholder='qwerty123'/>
                    <Button
                        buttonClass='submit-btn'
                        onSubmit={ handleSubmit }
                        isBusy={ isBusy }/>
                </Form>
            </div>
    );
};

const AnimatedSignIn = animationContainer(SignInModal);

class SignInComponent extends React.Component<SignInComponent.Props & InjectedFormProps<{}, SignInComponent.Props>, SignInComponent.State> {
    state:SignInComponent.State = {
        shouldRender: false,
    };

    componentDidUpdate(oldProps:SignInComponent.Props & InjectedFormProps<{}, SignInComponent.Props>) {
        if((oldProps.auth.user && !oldProps.auth.user.email) && (this.props.auth.user && this.props.auth.user.email)) {
            this.props.actions.historyPush('/app');
        }
    }

    handleSubmit = (evt:Event) => {
        evt.preventDefault();
        const { actions: { signIn }, forms: { signin: { values } } } = this.props;

        if(values) {
            if(values.email && values.password) {
                setTimeout(() => {
                    if(signIn) signIn(values.email, values.password);
                }, 1000);
            }
        }
    };

    render() {
        const {
            auth,
        } = this.props;

        return (
            <AnimatedSignIn
                handleSubmit={ this.handleSubmit }
                isMounted={ auth.user === null }
                isBusy={ auth.started && (!auth.completed || !auth.failed ) }
                identifier="signin"/>
        )
    }
}

export const SignIn = reduxForm<{}, SignInComponent.Props>({
    form: 'signin',
})(SignInComponent);
