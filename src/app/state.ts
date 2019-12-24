import {defaultUserState} from './modules/users';
import {IUser} from './modules/users/user.model';
import {IQuestionState} from './modules/questions/questions.state';
import {defaultQuestionState} from './modules/questions';

export interface IAppState{
  questions: IQuestionState;
  user: any;
}

export const InitialState: IAppState={
questions: defaultQuestionState,
user: {},
}