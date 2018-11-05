import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { configureStore } from 'app/store';
import { Routes } from 'app/Routes';

import 'app/style/main.scss';

// prepare store
const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <Routes/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
