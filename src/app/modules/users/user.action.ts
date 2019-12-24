import {createAction} from "redux-actions";
import {IUser, IUserRating, IPersonalInfo} from './user.model';
import {IQuestion} from '../questions/question.model';

export const createUser = createAction('CREATE_USER', (password: string, personalInfo: IPersonalInfo) => ({
    password: password,
    personalInfo: personalInfo
}));
export const updateUserPersonalInfo = createAction('UPDATE_PERSONAL_INFO',
    (personalInfo: IPersonalInfo) => ({personalInfo: personalInfo}));
export const logInUser = createAction('LOG_IN_USER',
    (user: IUser) => user);
export const addUserQuestion = createAction('ADD_USER_QUESTION',
    (question: IQuestion) => question);
export const updateUserRating = createAction('UPDATE_USER_RATING',
    (newRating: IUserRating) => ({rating: newRating}));

export const logOutUser = createAction('LOG_OUT_USER',
    (user: IUser) => user);
export const updateUserQuestion = createAction('UPDATE_USER_QUESTIONS',
    (questions: IQuestion) => questions);
    export const addQuestionToUserRating=createAction('ADD_QUESTION_TO_USER_RATING');
    export const addAnswerToUserRating=createAction('ADD_ANSWER_TO_USER_RATING');
    export const addAcceptedAnswerToUserRating=createAction('ADD_ACCEPTED_ANSWER_TO_USER_RATING');
    export const addLikedAnswerToUserRating=createAction('ADD_LIKED_ANSWER_TO_USER_RATING');


  