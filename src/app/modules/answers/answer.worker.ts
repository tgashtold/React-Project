import {createSagaWorker} from '../../services';
import {AnswerApi, answerActions} from './';
import {IAddLikeArgs, IGetAswersFromPositionArgs, IGetQuestionAndAswersArgs, IAnswer} from './answer.model';

const createAnswerRequest = (payload: IAnswer) => AnswerApi.addAnswer(payload);
const createAnswerAsync = createSagaWorker(createAnswerRequest, answerActions.createAnswer);

const getQuestionAndAnswersRequest = (payload: IGetQuestionAndAswersArgs) => AnswerApi.getQuestionWithAnswersByQuestionId(payload);
const getQuestionAndAnswersAsync = createSagaWorker(getQuestionAndAnswersRequest, answerActions.getQuestionAndAnswersByQuestionId);

const acceptAnswerRequest = (payload: string) => AnswerApi.acceptAnswerByIdAndUpdateAuthorRating(payload);
const acceptAnswerAsync = createSagaWorker(acceptAnswerRequest, answerActions.acceptAnswer);

const addLikeToAnswerRequest = (payload: IAddLikeArgs) => AnswerApi.addLikeToAnswerAndUpdateAuthorRating(payload);
const addLikeToAnswerAsync = createSagaWorker(addLikeToAnswerRequest, answerActions.addLikeToAnswer);

const getAnswersFromRequestedPositionRequest = (payload: IGetAswersFromPositionArgs) => AnswerApi.getAnswersFromRequestedPosition(payload);
const getAnswersFromRequestedPositionAsync = createSagaWorker(getAnswersFromRequestedPositionRequest, answerActions.getAnswersFromRequestedPosition);

export const answerWorkers: any = {
    createAnswerAsync,
    getQuestionAndAnswersAsync,
    acceptAnswerAsync,
    addLikeToAnswerAsync,
    getAnswersFromRequestedPositionAsync
};
