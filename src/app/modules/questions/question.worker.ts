import {createSagaWorker} from '../../services';
import {questionActions, QuestionsApi,} from './';
import {IQuestion, IQuestionInfo, IUpdateQuestionAnswersArgs} from './question.model';

const createQuestionRequest = (payload: IQuestion) => QuestionsApi.addQuestion(payload);
const createQuestionAsync = createSagaWorker(createQuestionRequest, questionActions.createQuestion);

const getQuestionsRequest = () => QuestionsApi.getActiveQuestions();
const getQuestionsAsync = createSagaWorker(getQuestionsRequest, questionActions.getQuestions);

const searchQuestionsByTitleRequest = (payload: string) => QuestionsApi.searchQuestionsByTitle(payload);
const searchQuestionsByTitleAsync = createSagaWorker(searchQuestionsByTitleRequest, questionActions.searchQuestionsByTitle);

const updateQuestionRequest = (payload: IQuestionInfo) => QuestionsApi.changeQuestion(payload);
const updateQuestionAsync = createSagaWorker(updateQuestionRequest, questionActions.updateQuestion);

const updateQuestionAnswersInfoRequest = (payload: IUpdateQuestionAnswersArgs) =>
    QuestionsApi.addNewQuestionAnswer(payload);
const updateQuestionAnswersInfoAsync = createSagaWorker(updateQuestionAnswersInfoRequest, questionActions.updateQuestionAnswersInfo);

const getQuestionsTagsRequest = () => QuestionsApi.getQuestionsTags();
const getQuestionsTagsAsync = createSagaWorker(getQuestionsTagsRequest, questionActions.getQuestionsTags);

const getQuestionsByTagRequest = (payload: string) => QuestionsApi.getQuestionsByTag(payload);
const getQuestionsByTagAsync = createSagaWorker(getQuestionsByTagRequest, questionActions.getQuestionsByTag);

export const questionWorkers: any = {
    createQuestionAsync,
    getQuestionsAsync,
    updateQuestionAsync,
    updateQuestionAnswersInfoAsync,
    searchQuestionsByTitleAsync,
    getQuestionsTagsAsync,
    getQuestionsByTagAsync
};
