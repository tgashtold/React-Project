import {
	increaseAnswersQtyInUserRatingAsync,
	updateUserPersonalInfoAsync,
	createUserAsync,
	logInUserAsync,
	increaseQuestionsQtyInUserRatingAsync
} from './user.worker';
import { takeEvery } from 'redux-saga/effects';
import {
	updateUserPersonalInfo,
	createUser,
	logInUser,
	increaseAnswersQtyInUserRating,
	increaseQuestionsQtyInUserRating
} from './user.action';

function* watchUserQuestion() {
	yield takeEvery(createUser.call, createUserAsync);
}

function* watchLogInUser() {
	yield takeEvery(logInUser.call, logInUserAsync);
}

function* watchUpdateUserPersonalInfo() {
	yield takeEvery(updateUserPersonalInfo.call, updateUserPersonalInfoAsync);
}

function* watchIncreaseAnswersInUserRating() {
	yield takeEvery(increaseAnswersQtyInUserRating.call, increaseAnswersQtyInUserRatingAsync);
}

function* watchIncreaseQuestionsInUserRating() {
	yield takeEvery(increaseQuestionsQtyInUserRating.call, increaseQuestionsQtyInUserRatingAsync);
}

export {
	watchUpdateUserPersonalInfo,
	watchIncreaseAnswersInUserRating,
	watchIncreaseQuestionsInUserRating,
	watchLogInUser,
	watchUserQuestion
};
