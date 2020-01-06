import {createHttpAction} from '../../services/action-creator';
import {createAction} from 'redux-actions';

export const questionActions: any = {
    getQuestions: createHttpAction('GET_QUESTIONS'),
    createQuestion: createHttpAction('CREATE_QUESTION'),
    updateQuestion: createHttpAction('UPDATE_QUESTION'),
    updateQuestionAnswersInfo: createHttpAction('UPDATE_QUESTION_ANSWERS'),
    allowToCreateQuestion: createAction('ALLOW_TO_CREATE_QUESTION'),
    forbidToCreateQuestion: createAction('FORBID_TO_CREATE_QUESTION'),
    searchQuestionsByTitle: createHttpAction('SEARCH_QUESTIONS_BY_TITLE'),
    getQuestionsTags: createHttpAction('GET_QUESTIONS_TAGS'),
    getQuestionsByTag: createHttpAction('GET_QUESTION_BY_TAG')
};

