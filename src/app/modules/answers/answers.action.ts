import {createAction} from "redux-actions";
import {IAnswer, IAnswerLikes} from './answer.model';
import {IQuestion} from '../questions/question.model';
import {IUser} from '../users/user.model';
import {IQuestionAnswersObj, AnswersApi} from '../answers';


export const addAnswer = createAction('ADD_ANSWER',
    (answer: IAnswer) => answer);
    export const getAnswers= createAction('GET_ANSWERS', (answers: Array<IAnswer>)=> ({questionAnswers: answers}))
export const updateAnswer = createAction('UPDATE_ANSWER', (answer: IAnswer) => answer );
export const getUserQuestionsAnswersInfo = createAction('GET_ANSWERS_INFO_TO_USERS_QUESTIONS', (answersInfo: Array<IQuestionAnswersObj>) => answersInfo );
export const getAllQuestionsAnswersInfo = createAction('GET_ANSWERS_INFO_TO_ALL_QUESTIONS', (answersInfo: Array<IQuestionAnswersObj>) => answersInfo );
