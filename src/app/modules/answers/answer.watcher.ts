import {answerWorkers} from './answer.worker';
import {takeEvery} from 'redux-saga/effects';
import {answerActions} from './';

function* watchCreateAnswer() {
    yield takeEvery(answerActions.createAnswer.call, answerWorkers.createAnswerAsync);
}

function* watchAddLikeAndUpdateQuestionAndAnswers() {
    yield takeEvery(answerActions.addLikeToAnswerAndUpdateQuestionAndAnswers.call, answerWorkers.addLikeToAnswerAndUpdateQuestionAndAnswersAsync);
}

function* watchAcceptAnswer() {
    yield takeEvery(answerActions.acceptAnswer.call, answerWorkers.acceptAnswerAsync);
}

function* watchGetQuestionAndAnswers() {
    yield takeEvery(answerActions.getQuestionAndAnswersByQuestionId.call, answerWorkers.getQuestionAndAnswersAsync);
}

function* watchGetUpdatedQuestionAndAnswers() {
    yield takeEvery(answerActions.getUpdatedQuestionAndAnswersByQuestionId.call, answerWorkers.getUpdatedQuestionAndAnswersAsync);
}
function* watchGetAnswersFromRequestedPosition() {
    yield takeEvery(answerActions.getAnswersFromRequestedPosition.call, answerWorkers.getAnswersFromRequestedPositionAsync);
}

export const answerWatchers: any[] = [
    watchAcceptAnswer(),
    watchAddLikeAndUpdateQuestionAndAnswers(),
    watchCreateAnswer(),
    watchGetQuestionAndAnswers(),
    watchGetAnswersFromRequestedPosition(),
    watchGetUpdatedQuestionAndAnswers()
];
