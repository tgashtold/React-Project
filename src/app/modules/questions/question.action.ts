import {createHttpAction} from '../../services/action-creator';

export const questionActions: any = {
    getQuestions: createHttpAction('GET_QUESTIONS'),
    createQuestion: createHttpAction('CREATE_QUESTION'),
    searchQuestionsByTitle: createHttpAction('SEARCH_QUESTIONS_BY_TITLE'),
    getQuestionsTags: createHttpAction('GET_QUESTIONS_TAGS'),
    getQuestionsByTag: createHttpAction('GET_QUESTION_BY_TAG')
};

