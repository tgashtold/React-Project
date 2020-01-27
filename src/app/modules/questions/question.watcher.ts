import {questionWorkers} from './question.worker';
import {takeEvery} from 'redux-saga/effects';
import {questionActions} from './';

function* watchCreateQuestion() {
    yield takeEvery(questionActions.createQuestion.call, questionWorkers.createQuestionAsync);
}

function* watchGetQuestions() {
    yield takeEvery(questionActions.getQuestions.call, questionWorkers.getQuestionsAsync);
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
    watchSearchQuestionByTitle(),
    watchGetQuestionsByTag(),
    watchGetQuestionsTags(),
];
