import {createSagaWorker} from '../../services';
import {IUser} from '../users/user.model';
import {createQuestion,closeQuestion,getQuestions,updateQuestion, QuestionsApi,updateQuestionAnswersInfo} from './';
import { IQuestionInfo } from './question.model';

export interface IQuestionCreationInfo{
	author: IUser; 
	title: string; 
	description: string
}

export interface IUpdateQuestionAnswersArgs{
	questionId: string; 
	newAnswerDate: Date;
}

export const createQuestionRequest = (payload:IQuestionCreationInfo)=>QuestionsApi.addQuestion(payload);
export const createQuestionAsync = createSagaWorker(createQuestionRequest, createQuestion);

export const getQuestionsRequest = ()=> QuestionsApi.getQuestions();
export const getQuestionsAsync = createSagaWorker(getQuestionsRequest, getQuestions);

export const updateQuestionRequest = (payload: IQuestionInfo)=> QuestionsApi.changeQuestion(payload);
export const updateQuestionAsync = createSagaWorker(updateQuestionRequest, updateQuestion);

export const closeQuestionRequest = (payload: string)=> QuestionsApi.closeQuestion(payload);
export const closeQuestionAsync = createSagaWorker(closeQuestionRequest, closeQuestion);

export const updateQuestionAnswersInfoRequest = (payload: IUpdateQuestionAnswersArgs)=> QuestionsApi.addNewQuestionAnswer(payload);
export const updateQuestionAnswersInfoAsync = createSagaWorker(updateQuestionAnswersInfoRequest, updateQuestionAnswersInfo);


