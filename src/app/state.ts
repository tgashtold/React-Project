import {IQuestionState} from './modules/questions/question.state';
import {defaultQuestionState} from './modules/questions';
import {IUserState} from './modules/users/user.state';
import {defaultUserState} from './modules/users';
import {IAnswerState} from './modules/answers/answer.state';
import {defaultAnswerState} from './modules/answers';

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
