import {
	createQuestionAsync,
	getQuestionsAsync,
	updateQuestionAsync,
	updateQuestionAnswersInfoAsync
} from './question.worker';
import { takeEvery } from 'redux-saga/effects';
import { createQuestion, getQuestions, updateQuestion, updateQuestionAnswersInfo } from './';

function* watchCreateQuestion() {
	yield takeEvery(createQuestion.call, createQuestionAsync);
}

function* watchGetQuestions() {
	yield takeEvery(getQuestions.call, getQuestionsAsync);
}

function* watchUpdateQuestion() {
	yield takeEvery(updateQuestion.call, updateQuestionAsync);
}

function* watchupdateQuestionAnswersInfo() {
	yield takeEvery(updateQuestionAnswersInfo.call, updateQuestionAnswersInfoAsync);
}

export { watchCreateQuestion, watchGetQuestions, watchUpdateQuestion, watchupdateQuestionAnswersInfo };
