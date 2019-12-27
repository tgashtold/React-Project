import {
	addLikeToAnswerAsync,
	acceptAnswerAsync,
	getQuestionAndAnswersAsync,
	createAnswerAsync
} from './answer.worker';
import { takeEvery } from 'redux-saga/effects';
import { addLikeToAnswer, acceptAnswer, getQuestionAndAnswersByQuestionId, createAnswer } from './';

function* watchCreateAnswer() {
	yield takeEvery(createAnswer.call, createAnswerAsync);
}

function* watchAddLike() {
	yield takeEvery(addLikeToAnswer.call, addLikeToAnswerAsync);
}

function* watchAcceptAnswer() {
	yield takeEvery(acceptAnswer.call, acceptAnswerAsync);
}

function* watchGetQuestionAndAnswers() {
	yield takeEvery(getQuestionAndAnswersByQuestionId.call, getQuestionAndAnswersAsync);
}

export { watchAcceptAnswer, watchAddLike, watchCreateAnswer, watchGetQuestionAndAnswers };
