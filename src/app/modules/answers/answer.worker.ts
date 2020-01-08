import { createSagaWorker } from '../../services';
import { AnswerApi, answerActions } from './';
import { call, put, take } from 'redux-saga/effects';
import { IAddLikeArgs, IGetAswersFromPositionArgs, IGetQuestionAndAswersArgs } from './answer.model';
import { userActions } from '../users';

const createAnswerAsync = function* sagaWorker(action: any) {
	try {
		yield put(answerActions.createAnswer.request());
		const result = yield call(AnswerApi.addAnswer, action.payload);
		yield put(answerActions.createAnswer.success(result));
		console.log('finish creating answer');
	} catch (error) {
		yield put(answerActions.createAnswer.error(error.message));
	}
};

function* getUpdatedQuestionAndAnswersAsync(action: any) {
	try {
		yield take(answerActions.createAnswer.success);
		yield take(userActions.increaseAnswersQtyInUserRating.success);

		yield put(answerActions.getUpdatedQuestionAndAnswersByQuestionId.request(action.payload));

		const result = yield AnswerApi.getQuestionWithAnswersByQuestionId(action.payload);

		yield put(answerActions.getUpdatedQuestionAndAnswersByQuestionId.success(result));

		console.log('finish getting question and answers');
	} catch (error) {
		yield put(answerActions.getUpdatedQuestionAndAnswersByQuestionId.error(error.message));
	}
}

const getQuestionAndAnswersRequest = (payload: IGetQuestionAndAswersArgs) =>
	AnswerApi.getQuestionWithAnswersByQuestionId(payload);
const getQuestionAndAnswersAsync = createSagaWorker(
	getQuestionAndAnswersRequest,
	answerActions.getQuestionAndAnswersByQuestionId
);

const acceptAnswerRequest = (payload: string) => AnswerApi.acceptAnswerByIdAndUpdateAuthorRating(payload);
const acceptAnswerAsync = createSagaWorker(acceptAnswerRequest, answerActions.acceptAnswer);

const addLikeToAnswerRequest = (payload: IAddLikeArgs) => AnswerApi.addLikeToAnswerAndUpdateAuthorRating(payload);
const addLikeToAnswerAsync = createSagaWorker(addLikeToAnswerRequest, answerActions.addLikeToAnswer);

const getAnswersFromRequestedPositionRequest = (payload: IGetAswersFromPositionArgs) =>
	AnswerApi.getAnswersFromRequestedPosition(payload);
const getAnswersFromRequestedPositionAsync = createSagaWorker(
	getAnswersFromRequestedPositionRequest,
	answerActions.getAnswersFromRequestedPosition
);

export const answerWorkers: any = {
	createAnswerAsync,
	getQuestionAndAnswersAsync,
	acceptAnswerAsync,
	addLikeToAnswerAsync,
	getAnswersFromRequestedPositionAsync,
	getUpdatedQuestionAndAnswersAsync
};
