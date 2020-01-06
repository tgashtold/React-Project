import {answerWorkers} from './answer.worker';
import {takeEvery} from 'redux-saga/effects';
import {answerActions} from './';

function* watchCreateAnswer() {
    yield takeEvery(answerActions.createAnswer.call, answerWorkers.createAnswerAsync);
}

function* watchAddLike() {
    yield takeEvery(answerActions.addLikeToAnswer.call, answerWorkers.addLikeToAnswerAsync);
}

function* watchAcceptAnswer() {
    yield takeEvery(answerActions.acceptAnswer.call, answerWorkers.acceptAnswerAsync);
}

function* watchGetQuestionAndAnswers() {
    yield takeEvery(answerActions.getQuestionAndAnswersByQuestionId.call, answerWorkers.getQuestionAndAnswersAsync);
}

function* watchGetAnswersFromRequestedPosition() {
    yield takeEvery(answerActions.getAnswersFromRequestedPosition.call, answerWorkers.getAnswersFromRequestedPositionAsync);
}

export const answerWatchers: any[] = [
    watchAcceptAnswer(),
    watchAddLike(),
    watchCreateAnswer(),
    watchGetQuestionAndAnswers(),
    watchGetAnswersFromRequestedPosition()
];
