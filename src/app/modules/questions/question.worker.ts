import {createSagaWorker} from '../../services';
import {
    createQuestion,
    getQuestions,
    updateQuestion,
    QuestionsApi,
    updateQuestionAnswersInfo,
    searchQuestionsByTitle,
    getQuestionsByTag,
    getQuestionsTags

} from './';
import {IQuestionInfo, IQuestion, IUpdateQuestionAnswersArgs} from './question.model';

const createQuestionRequest = (payload: IQuestion) => QuestionsApi.addQuestion(payload);
const createQuestionAsync = createSagaWorker(createQuestionRequest, createQuestion);

const getQuestionsRequest = () => QuestionsApi.getActiveQuestions();
const getQuestionsAsync = createSagaWorker(getQuestionsRequest, getQuestions);

const searchQuestionsByTitleRequest = (payload: string) => QuestionsApi.searchQuestionsByTitle(payload);
const searchQuestionsByTitleAsync = createSagaWorker(searchQuestionsByTitleRequest, searchQuestionsByTitle);

const updateQuestionRequest = (payload: IQuestionInfo) => QuestionsApi.changeQuestion(payload);
const updateQuestionAsync = createSagaWorker(updateQuestionRequest, updateQuestion);

const updateQuestionAnswersInfoRequest = (payload: IUpdateQuestionAnswersArgs) =>
    QuestionsApi.addNewQuestionAnswer(payload);
const updateQuestionAnswersInfoAsync = createSagaWorker(updateQuestionAnswersInfoRequest, updateQuestionAnswersInfo);

const getQuestionsTagsRequest = () => QuestionsApi.getQuestionsTags();
const getQuestionsTagsAsync = createSagaWorker(getQuestionsTagsRequest, getQuestionsTags);

const getQuestionsByTagRequest = (payload: string) => QuestionsApi.getQuestionsByTag(payload);
const getQuestionsByTagAsync = createSagaWorker(getQuestionsByTagRequest, getQuestionsByTag);

export {
    createQuestionAsync,
    getQuestionsAsync,
    updateQuestionAsync,
    updateQuestionAnswersInfoAsync,
    searchQuestionsByTitleAsync,
    getQuestionsTagsAsync,
    getQuestionsByTagAsync
};
