import {
    createQuestionAsync,
    getQuestionsAsync,
    updateQuestionAsync,
    updateQuestionAnswersInfoAsync,
    searchQuestionsByTitleAsync,
    getQuestionsByTagAsync,
    getQuestionsTagsAsync
} from './question.worker';
import {takeEvery} from 'redux-saga/effects';
import {
    createQuestion,
    getQuestions,
    updateQuestion,
    getQuestionsTags,
    getQuestionsByTag,
    updateQuestionAnswersInfo,
    searchQuestionsByTitle
} from './';

function* watchCreateQuestion() {
    yield takeEvery(createQuestion.call, createQuestionAsync);
}

function* watchGetQuestions() {
    yield takeEvery(getQuestions.call, getQuestionsAsync);
}

function* watchUpdateQuestion() {
    yield takeEvery(updateQuestion.call, updateQuestionAsync);
}

function* watchUpdateQuestionAnswersInfo() {
    yield takeEvery(updateQuestionAnswersInfo.call, updateQuestionAnswersInfoAsync);
}

function* watchSearchQuestionByTitle() {
    yield takeEvery(searchQuestionsByTitle.call, searchQuestionsByTitleAsync);
}

function* watchGetQuestionsByTag() {
    yield takeEvery(getQuestionsByTag.call, getQuestionsByTagAsync);
}

function* watchGetQuestionsTags() {
    yield takeEvery(getQuestionsTags.call, getQuestionsTagsAsync);
}

export {
    watchCreateQuestion,
    watchGetQuestions,
    watchUpdateQuestion,
    watchUpdateQuestionAnswersInfo,
    watchSearchQuestionByTitle,
    watchGetQuestionsByTag,
    watchGetQuestionsTags,
};
