import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { History } from 'history';
import { logger } from 'app/store/middleware';
import { rootReducer, RootState } from 'app/modules/index';

export function configureStore(history:History, initialState?:RootState):Store<RootState> {
    let middleware = applyMiddleware(logger, routerMiddleware(history), thunk);

    if (process.env.NODE_ENV !== 'production') {
        middleware = composeWithDevTools(middleware);
    }

    const store = createStore(rootReducer as any, initialState as any, middleware) as Store<RootState>;

    if (module.hot) {
        module.hot.accept('app/modules', () => {
            const nextReducer = require('app/modules/index');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
