import * as React from 'react';
import { Redirect, Route, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { RootState } from "../../modules";
import { appLoader, AppLoader } from "../../components/__universal/AppLoader/AppLoader";

export namespace PrivateRoute {
    export interface Props extends RouteComponentProps<void> {
        isAuthenticated:boolean,
        isBusy:boolean,
        Component:React.ReactNode,
    }
}

@connect(
    (state:RootState):Pick<PrivateRoute.Props, 'isAuthenticated'|'isBusy'> => {
        return {
            isAuthenticated: state.auth.user.email !== undefined,
            isBusy: state.auth.started !== undefined && state.auth.started,
        }
    }
)

export class PrivateRoute extends React.Component<any|PrivateRoute.Props> {
    static defaultProps:Pick<PrivateRoute.Props, 'isAuthenticated'|'isBusy'> = {
        isAuthenticated: false,
        isBusy: false,
    };

    render() {
        const {
            isAuthenticated,
            isBusy,
            Component,
            ...rest
        } = this.props;

        console.log('isAuthenticated', isAuthenticated);

        return (
            <Route { ...rest } render={ (props:any) => (
                isBusy
                    ? <AppLoader type={ appLoader.loaderType.FULL } />
                    : isAuthenticated
                    ? <Component { ...props } />
                    : <Redirect to='/login'/>
            ) }/>
        )
    }
}
