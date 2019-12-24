import {createHttpAction} from '../../services/action-creator'

export const getQuestions = createHttpAction('GET_QUESTIONS');
export const createQuestion = createHttpAction('CREATE_QUESTION');
export const updateQuestion = createHttpAction('UPDATE_QUESTION');
export const closeQuestion = createHttpAction('CLOSE_QUESTION');
export const updateQuestionAnswersInfo = createHttpAction('UPDATE_QUESTION_ANSWERS');


