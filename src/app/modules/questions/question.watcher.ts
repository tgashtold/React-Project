import {questionWorkers} from './question.worker';
import {takeEvery} from 'redux-saga/effects';
import {questionActions} from './';

function* watchCreateQuestion() {
    yield takeEvery(questionActions.createQuestion.call, questionWorkers.createQuestionAsync);
}

function* watchGetQuestions() {
    yield takeEvery(questionActions.getQuestions.call, questionWorkers.getQuestionsAsync);
}

function* watchUpdateQuestion() {
    yield takeEvery(questionActions.updateQuestion.call, questionWorkers.updateQuestionAsync);
}

function* watchUpdateQuestionAnswersInfo() {
    yield takeEvery(questionActions.updateQuestionAnswersInfo.call, questionWorkers.updateQuestionAnswersInfoAsync);
}

function* watchSearchQuestionByTitle() {
    yield takeEvery(questionActions.searchQuestionsByTitle.call, questionWorkers.searchQuestionsByTitleAsync);
}

function* watchGetQuestionsByTag() {
    yield takeEvery(questionActions.getQuestionsByTag.call, questionWorkers.getQuestionsByTagAsync);
}

function* watchGetQuestionsTags() {
    yield takeEvery(questionActions.getQuestionsTags.call, questionWorkers.getQuestionsTagsAsync);
}

export const questionWatchers: any[] = [
    watchCreateQuestion(),
    watchGetQuestions(),
    watchUpdateQuestion(),
    watchUpdateQuestionAnswersInfo(),
    watchSearchQuestionByTitle(),
    watchGetQuestionsByTag(),
    watchGetQuestionsTags(),
];
