import { createSagaWorker } from '../../services';
import { 
	createQuestion, 
	getQuestions, 
	updateQuestion, 
	QuestionsApi, 
	updateQuestionAnswersInfo } from './';
import { IQuestionInfo, IQuestion, IUpdateQuestionAnswersArgs } from './question.model';

const createQuestionRequest = (payload: IQuestion) => QuestionsApi.addQuestion(payload);
const createQuestionAsync = createSagaWorker(createQuestionRequest, createQuestion);

const getQuestionsRequest = () => QuestionsApi.getActiveQuestions();
const getQuestionsAsync = createSagaWorker(getQuestionsRequest, getQuestions);

const updateQuestionRequest = (payload: IQuestionInfo) => QuestionsApi.changeQuestion(payload);
const updateQuestionAsync = createSagaWorker(updateQuestionRequest, updateQuestion);

const updateQuestionAnswersInfoRequest = (payload: IUpdateQuestionAnswersArgs) =>
	QuestionsApi.addNewQuestionAnswer(payload);
const updateQuestionAnswersInfoAsync = createSagaWorker(updateQuestionAnswersInfoRequest, updateQuestionAnswersInfo);

export { 
	createQuestionAsync, 
	getQuestionsAsync, 
	updateQuestionAsync, 
	updateQuestionAnswersInfoAsync };
