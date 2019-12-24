import {
	closeQuestionAsync,
	createQuestionAsync,
	getQuestionsAsync,
	updateQuestionAsync,
	updateQuestionAnswersInfoAsync
} from './question.worker';
import { takeEvery} from 'redux-saga/effects';
import {createQuestion,closeQuestion,getQuestions,updateQuestion, updateQuestionAnswersInfo} from './';


export function* watchCreateQuestion() {
  yield takeEvery(createQuestion.fetch, createQuestionAsync);
}

export function* watchGetQuestions() {
  yield takeEvery(getQuestions.fetch, getQuestionsAsync);
}

export function* watchUpdateQuestion() {
  yield takeEvery(updateQuestion.fetch, updateQuestionAsync);
}

export function* watchCloseQuestion() {
  yield takeEvery(closeQuestion.fetch, closeQuestionAsync);
}

export function* watchupdateQuestionAnswersInfo() {
  yield takeEvery(updateQuestionAnswersInfo.fetch, updateQuestionAnswersInfoAsync);
}
