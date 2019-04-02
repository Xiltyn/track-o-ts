import * as React from 'react';
import { Redirect, Route, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { RootState } from "../../modules";
import { AppLoader } from "../../components/__universal/AppLoader/AppLoader";

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
            isAuthenticated: (state.auth.user && state.auth.user.email) !== null,
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

        return (
            <Route { ...rest } render={ (props:any) => (
                isBusy
                    ? <AppLoader style={ {
                        width: 24,
                        height: 24,
                        margin: '-12px',
                    } } />
                    : isAuthenticated
                    ? <Component { ...props } />
                    : <Redirect to='/login'/>
            ) }/>
        )
    }
}
