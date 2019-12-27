import { IQuestionState } from './modules/questions/question.model';
import { defaultQuestionState } from './modules/questions';
import { IUserState } from './modules/users/user.model';
import { defaultUserState } from './modules/users';
import { IAnswerState } from './modules/answers/answer.model';
import { defaultAnswerState } from './modules/answers';

export interface IAppState {
	questions: IQuestionState;
	user: IUserState;
	answers: IAnswerState;
}

export const InitialState: IAppState = {
	questions: defaultQuestionState,
	user: defaultUserState,
	answers: defaultAnswerState
};
