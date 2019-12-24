import {createAction} from "redux-actions";
import {IAnswer, IAnswerLikes} from './answer.model';
import {IQuestion} from '../questions/question.model';
import {IUser} from '../users/user.model';

export const createAnswer = createAction('CREATE_ANSWER',
    (author: IUser, question: IQuestion, text: string) => ({
        author: author,
        text: text,
        question: question,
    }));
export const addAnswerLike = createAction('ADD_ANSWER_LIKE',
    (user: IUser) => ({user}));
export const acceptAnswer = createAction('ACCEPT_ANSWER');
export const updateAnswerAuthor = createAction('UPDATE_ANSWER_AUTHOR',
    (author: IUser) => ({author: author}));
export const updateAnswerQuestion = createAction('UPDATE_ANSWER_QUESTION',
    (question: IQuestion) => ({question: question}));