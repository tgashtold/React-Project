import {
	addLikeToAnswerAsync,
	acceptAnswerAsync,
	getQuestionAndAnswersAsync,
	createAnswerAsync,
	getAnswersFromRequestedPositionAsync
} from './answer.worker';
import { takeEvery } from 'redux-saga/effects';
import { addLikeToAnswer, acceptAnswer, getQuestionAndAnswersByQuestionId, createAnswer, getAnswersFromRequestedPosition } from './';

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

function* watchGetAnswersFromRequestedPosition() {
	yield takeEvery(getAnswersFromRequestedPosition.call, getAnswersFromRequestedPositionAsync);
}

export { watchAcceptAnswer, watchAddLike, watchCreateAnswer, watchGetQuestionAndAnswers,watchGetAnswersFromRequestedPosition };
