import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/modules/index';

import { Footer, Header } from 'app/components';
import { RouterState } from "react-router-redux";

export namespace App {
    export interface Props extends RouteComponentProps<void> {
        router:RouterState,
    }
}

@connect(
    (state:RootState):Pick<App.Props, 'router'> => ({
        router: state.router,
    })
)
export class App extends React.Component<App.Props> {
    static defaultProps:Partial<App.Props> = {

    };

    render() {
        const logotype = <img src={ require('../../../assets/images/DND_LOGO.png') } alt="Brand logotype"/>

        return (
            <div className="normal">
                <Header
                    logotype={ logotype }
                    message='Welcome to Dev&Deliver boilerplate for React apps with TypeScript!'/>
                <Footer/>
            </div>
        );
    }
}
