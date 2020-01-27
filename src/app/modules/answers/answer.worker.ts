import { createSagaWorker } from '../../services';
import { AnswerApi, answerActions } from './';
import { call, put, take } from 'redux-saga/effects';
import { IAddLikeArgs, IGetAswersFromPositionArgs } from './answer.model';
import { push } from 'react-router-redux';
import RoutesConfig from '../../config/Routes.config';

const createAnswerAsync = function* sagaWorker(action: any) {
	try {
		yield put(answerActions.createAnswer.request());

		const result = yield call(AnswerApi.addAnswer, action.payload);

		yield put(answerActions.createAnswer.success(result));
	} catch (error) {
		yield put(answerActions.createAnswer.error(error.message));
	}
};

function* getUpdatedQuestionAndAnswersAsync(action: any) {
	try {
		yield take(answerActions.createAnswer.success);
		yield put(answerActions.getUpdatedQuestionAndAnswersByQuestionId.request(action.payload));

		const result = yield AnswerApi.getQuestionWithAnswersByQuestionId(action.payload);

		yield put(answerActions.getUpdatedQuestionAndAnswersByQuestionId.success(result));
	} catch (error) {
		yield put(answerActions.getUpdatedQuestionAndAnswersByQuestionId.error(error.message));
		yield put(push(RoutesConfig.routes.error));
	}
}

function* getQuestionAndAnswersAsync(action: any) {
	try {
		yield put(answerActions.getQuestionAndAnswersByQuestionId.request(action.payload));

		const result = yield AnswerApi.getQuestionWithAnswersByQuestionId(action.payload);

		yield put(answerActions.getQuestionAndAnswersByQuestionId.success(result));
	} catch (error) {
		yield put(answerActions.getQuestionAndAnswersByQuestionId.error(error.message));
		yield put(push(RoutesConfig.routes.error));
	}
}

const acceptAnswerRequest = (payload: string) => AnswerApi.acceptAnswerByIdAndUpdateQuestion(payload);
const acceptAnswerAsync = createSagaWorker(acceptAnswerRequest, answerActions.acceptAnswer);

const addLikeToAnswerAndUpdateQuestionAndAnswersRequest = (payload: IAddLikeArgs) =>
	AnswerApi.addLikeToAnswerAndUpdateQuestionAndAnswers(payload);
const addLikeToAnswerAndUpdateQuestionAndAnswersAsync = createSagaWorker(
	addLikeToAnswerAndUpdateQuestionAndAnswersRequest,
	answerActions.addLikeToAnswerAndUpdateQuestionAndAnswers
);

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
	addLikeToAnswerAndUpdateQuestionAndAnswersAsync,
	getAnswersFromRequestedPositionAsync,
	getUpdatedQuestionAndAnswersAsync
};
