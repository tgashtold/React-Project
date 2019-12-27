import { createSagaWorker } from '../../services';
import { createAnswer, getQuestionAndAnswersByQuestionId, acceptAnswer, addLikeToAnswer, AnswerApi } from './';
import { IAnswer, IAddLikeArgs } from './answer.model';

const createAnswerRequest = (payload: IAnswer) => AnswerApi.addAnswer(payload);
const createAnswerAsync = createSagaWorker(createAnswerRequest, createAnswer);

const getQuestionAndAnswersRequest = (payload: string) => AnswerApi.getQuestionWithAnswersByQuestionId(payload);
const getQuestionAndAnswersAsync = createSagaWorker(getQuestionAndAnswersRequest, getQuestionAndAnswersByQuestionId);

const acceptAnswerRequest = (payload: string) => AnswerApi.acceptAnswerByIdAndUpdateAuthorRating(payload);
const acceptAnswerAsync = createSagaWorker(acceptAnswerRequest, acceptAnswer);

const addLikeToAnswerRequest = (payload: IAddLikeArgs) => AnswerApi.addLikeToAnswerAndUpdateAuthorRating(payload);
const addLikeToAnswerAsync = createSagaWorker(addLikeToAnswerRequest, addLikeToAnswer);

export { createAnswerAsync, getQuestionAndAnswersAsync, acceptAnswerAsync, addLikeToAnswerAsync };
