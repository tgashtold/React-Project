import {createHttpAction} from '../../services/action-creator';

export const answerActions: any = {
    getQuestionAndAnswersByQuestionId: createHttpAction('GET_QUESTION_AND_ANSWERS_BY_QUESTION_ID'),
    getUpdatedQuestionAndAnswersByQuestionId: createHttpAction('GET_QUESTION_UPDATED_AND_ANSWERS_BY_QUESTION_ID'),
    createAnswer: createHttpAction('CREATE_ANSWER'),
    addLikeToAnswerAndUpdateQuestionAndAnswers: createHttpAction('ADD_LIKE_TO_ANSWER_AND_UPDATE_QUESTION_AND_ANSWERS'),
    acceptAnswer: createHttpAction('ACCEPT_ANSWER'),
    getAnswersFromRequestedPosition: createHttpAction('GET_ANSWERS_FROM_REQUESTED_POSITION')
};

