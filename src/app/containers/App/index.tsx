import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/modules/index';

import { Footer, Header } from 'app/components';
import { RouterState } from "react-router-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AuthMiddleware } from "app/modules/auth/middleware";

export namespace App {
    export interface Props extends RouteComponentProps<void> {
        router:RouterState,
        actions:appActions,
    }

    export type appActions = {
        logout:() => void,
    }
}

@connect(
    (state:RootState):Pick<App.Props, 'router'> => ({
        router: state.router,
    }),
    (dispatch:Dispatch):Pick<App.Props, 'actions'> => ({
        actions: bindActionCreators({
            logout: () => AuthMiddleware.logout(),
        }, dispatch)
    }),
)
export class App extends React.Component<App.Props> {
    static defaultProps:Partial<App.Props> = {

    };

    render() {
        const { actions } = this.props;

        const logotype = <img src={ require('../../../assets/images/DND_LOGO.png') } alt="Brand logotype"/>

        return (
            <div className="normal">
                <Header
                    logotype={ logotype }
                    actions={ actions }
                    message='Welcome to Dev&Deliver boilerplate for React apps with TypeScript!'/>
                <Footer/>
            </div>
        );
    }
}
