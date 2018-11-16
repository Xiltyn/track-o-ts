import * as React from 'react';
import { Route, Switch } from 'react-router';
import { App } from './containers/App';
import { hot } from 'react-hot-loader';
import { PrivateRoute } from "./utils/PrivateRoute/PrivateRoute";
import { Auth } from "./containers/Auth";

export const Routes = hot(module)(() => (
        <Switch>
            <Route path='/login' component={ Auth }/>
            <PrivateRoute path='/:view?' Component={ App }/>
        </Switch>
    )
);
