import { combineReducers } from 'redux';
import { userReducer } from './modules/users';
import { questionsReducer } from './modules/questions';
import { answerReducer } from './modules/answers';

export interface IAppReducer {
	questions: any;
	user: any;
	answers: any;
}

export const Reducer = combineReducers({
	user: userReducer,
	answers: answerReducer,
	questions: questionsReducer
});
