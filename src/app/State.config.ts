import {applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {IAppState} from './state';
import {Reducer} from './Reducer';
import saga from './saga';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router'

export const history = createBrowserHistory();

export function configureStore(initialState: IAppState): Store<IAppState> {
    const sagaMiddleware = createSagaMiddleware();
    const routeMiddleware = routerMiddleware(history);
    const middlewares = applyMiddleware(sagaMiddleware, routeMiddleware);
    const store = createStore(Reducer(history), initialState, composeWithDevTools(middlewares));

    sagaMiddleware.run(saga);

    return store;
}
