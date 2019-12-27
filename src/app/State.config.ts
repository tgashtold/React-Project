import { createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IAppState } from './state';
import { Reducer } from './Reducer';
import saga from './saga';

export function configureStore(initialState: IAppState): Store<IAppState> {
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = applyMiddleware(sagaMiddleware);
	const store = createStore(Reducer, initialState, composeWithDevTools(middlewares));

	sagaMiddleware.run(saga);

	return store;
}
