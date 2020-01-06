import {userWorkers} from './user.worker';
import {takeEvery} from 'redux-saga/effects';
import {userActions} from './user.action';

function* watchUserQuestion() {
    yield takeEvery(userActions.createUser.call, userWorkers.createUserAsync);
}

function* watchLogInUser() {
    yield takeEvery(userActions.logInUser.call, userWorkers.logInUserAsync);
}

function* watchUpdateUserPersonalInfo() {
    yield takeEvery(userActions.updateUserPersonalInfo.call, userWorkers.updateUserPersonalInfoAsync);
}

function* watchIncreaseAnswersInUserRating() {
    yield takeEvery(userActions.increaseAnswersQtyInUserRating.call, userWorkers.increaseAnswersQtyInUserRatingAsync);
}

function* watchIncreaseQuestionsInUserRating() {
    yield takeEvery(userActions.increaseQuestionsQtyInUserRating.call, userWorkers.increaseQuestionsQtyInUserRatingAsync);
}

export const userWatchers: any[] = [
    watchUpdateUserPersonalInfo(),
    watchIncreaseAnswersInUserRating(),
    watchIncreaseQuestionsInUserRating(),
    watchLogInUser(),
    watchUserQuestion()
];
