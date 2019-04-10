import * as React from 'react';
import { Route, Switch } from 'react-router';
import { App } from './containers/App';
import { hot } from 'react-hot-loader';
import { Auth } from "./containers/Auth";
import { PrivateRoute } from "app/utils/PrivateRoute/PrivateRoute";

export const Routes = hot(module)(() => (
        <Switch>
            <Route path='/login' component={ Auth }/>
            <PrivateRoute path='/:view?/:paramOne?/:paramTwo?' Component={ App }/>
        </Switch>
    )
);
