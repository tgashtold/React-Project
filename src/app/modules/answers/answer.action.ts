import {createHttpAction} from '../../services/action-creator';

export const answerActions: any = {
    getQuestionAndAnswersByQuestionId: createHttpAction('GET_QUESTION_AND_ANSWERS_BY_QUESTION_ID'),
    createAnswer: createHttpAction('CREATE_ANSWER'),
    addLikeToAnswer: createHttpAction('ADD_LIKE_TO_ANSWER'),
    acceptAnswer: createHttpAction('ACCEPT_ANSWER'),
    getAnswersFromRequestedPosition: createHttpAction('GET_ANSWERS_FROM_REQUESTED_POSITION')
};

