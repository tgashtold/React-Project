import {createSagaWorker} from '../../services';
import {questionActions, QuestionsApi,} from './';
import {call, put} from 'redux-saga/effects';
import RoutesConfig from '../../config/Routes.config';
import {push} from 'connected-react-router'


const createQuestionAsync = function* sagaWorker(action: any) {
    try {
        yield put(questionActions.createQuestion.request());
        const result = yield call(QuestionsApi.addQuestion, action.payload);
        yield put(questionActions.createQuestion.success(result));
        yield put(push(RoutesConfig.routes.questionsList));
    } catch (error) {
        yield put(questionActions.createQuestion.error(error.message));
    }
};

const getQuestionsRequest = () => QuestionsApi.getActiveQuestions();
const getQuestionsAsync = createSagaWorker(getQuestionsRequest, questionActions.getQuestions);

const searchQuestionsByTitleRequest = (payload: string) => QuestionsApi.searchQuestionsByTitle(payload);
const searchQuestionsByTitleAsync = createSagaWorker(searchQuestionsByTitleRequest, questionActions.searchQuestionsByTitle);

const getQuestionsTagsRequest = () => QuestionsApi.getQuestionsTags();
const getQuestionsTagsAsync = createSagaWorker(getQuestionsTagsRequest, questionActions.getQuestionsTags);

const getQuestionsByTagRequest = (payload: string) => QuestionsApi.getQuestionsByTag(payload);
const getQuestionsByTagAsync = createSagaWorker(getQuestionsByTagRequest, questionActions.getQuestionsByTag);

export const questionWorkers: any = {
    createQuestionAsync,
    getQuestionsAsync,
    searchQuestionsByTitleAsync,
    getQuestionsTagsAsync,
    getQuestionsByTagAsync
};
