import { combineReducers } from 'redux';
import { userReducer } from './modules/users';
import { questionsReducer } from './modules/questions';
import { answerReducer } from './modules/answers';
import { connectRouter } from 'connected-react-router';

export interface IAppReducer {
	questions: any;
	user: any;
	answers: any;
	router: any;
}

export const Reducer = (history: any) =>
	combineReducers({
		router: connectRouter(history),
		user: userReducer,
		answers: answerReducer,
		questions: questionsReducer
	});
