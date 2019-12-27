import { createHttpAction } from '../../services/action-creator';
import { createAction } from 'redux-actions';

export const getQuestions = createHttpAction('GET_QUESTIONS');
export const createQuestion = createHttpAction('CREATE_QUESTION');
export const updateQuestion = createHttpAction('UPDATE_QUESTION');
export const updateQuestionAnswersInfo = createHttpAction('UPDATE_QUESTION_ANSWERS');
export const allowToCreateQuestion = createAction('ALLOW_TO_CREATE_QUESTION');
export const forbidToCreateQuestion = createAction('FORBID_TO_CREATE_QUESTION');
