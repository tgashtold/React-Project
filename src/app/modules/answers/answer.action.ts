import { createHttpAction } from '../../services/action-creator';

export const getQuestionAndAnswersByQuestionId = createHttpAction('GET_QUESTION_AND_ANSWERS_BY_QUESTION_ID');
export const createAnswer = createHttpAction('CREATE_ANSWER');
export const addLikeToAnswer = createHttpAction('ADD_LIKE_TO_ANSWER');
export const acceptAnswer = createHttpAction('ACCEPT_ANSWER');
export const getAnswersFromRequestedPosition= createHttpAction('GET_ANSWERS_FROM_REQUESTED_POSITION');

