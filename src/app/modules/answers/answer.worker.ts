import { createSagaWorker } from '../../services';
import { createAnswer, getQuestionAndAnswersByQuestionId, acceptAnswer, addLikeToAnswer, AnswerApi, getAnswersFromRequestedPosition } from './';
import {  IAddLikeArgs, IGetAswersFromPositionArgs, IGetQuestionAndAswersArgs, ICreateAnswerArgs } from './answer.model';

const createAnswerRequest = (payload: ICreateAnswerArgs) => AnswerApi.addAnswer(payload);
const createAnswerAsync = createSagaWorker(createAnswerRequest, createAnswer);

const getQuestionAndAnswersRequest = (payload: IGetQuestionAndAswersArgs) => AnswerApi.getQuestionWithAnswersByQuestionId(payload);
const getQuestionAndAnswersAsync = createSagaWorker(getQuestionAndAnswersRequest, getQuestionAndAnswersByQuestionId);

const acceptAnswerRequest = (payload: string) => AnswerApi.acceptAnswerByIdAndUpdateAuthorRating(payload);
const acceptAnswerAsync = createSagaWorker(acceptAnswerRequest, acceptAnswer);

const addLikeToAnswerRequest = (payload: IAddLikeArgs) => AnswerApi.addLikeToAnswerAndUpdateAuthorRating(payload);
const addLikeToAnswerAsync = createSagaWorker(addLikeToAnswerRequest, addLikeToAnswer);

const getAnswersFromRequestedPositionRequest = (payload: IGetAswersFromPositionArgs) => AnswerApi.getAnswersFromRequestedPosition(payload);
const getAnswersFromRequestedPositionAsync = createSagaWorker(getAnswersFromRequestedPositionRequest, getAnswersFromRequestedPosition);

export { createAnswerAsync, getQuestionAndAnswersAsync, acceptAnswerAsync, addLikeToAnswerAsync, getAnswersFromRequestedPositionAsync };
