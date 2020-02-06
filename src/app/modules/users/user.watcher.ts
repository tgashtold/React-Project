import { userWorkers } from './user.worker';
import { takeEvery } from 'redux-saga/effects';
import { userActions } from './user.action';

function* watchUserQuestion() {
	yield takeEvery(userActions.createUser.call, userWorkers.createUserAsync);
}

function* watchLogInUser() {
	yield takeEvery(userActions.logInUser.call, userWorkers.logInUserAsync);
}

function* watchLogOutUser() {
	yield takeEvery(userActions.logOutUser.call, userWorkers.logOutUserAsync);
}

function* watchUpdateUserPersonalInfo() {
	yield takeEvery(userActions.updateUserPersonalInfo.call, userWorkers.updateUserPersonalInfoAsync);
}

function* watchAuthorizationCheck() {
	yield takeEvery(userActions.isUserAuthorized.call, userWorkers.isUserAuthorizedAsync);
}

function* watchGetUserById() {
	yield takeEvery(userActions.getUserById.call, userWorkers.getUserByIdAsync);
}

export const userWatchers: any[] = [
	watchUpdateUserPersonalInfo(),
	watchLogInUser(),
	watchUserQuestion(),
	watchGetUserById(),
	watchAuthorizationCheck(),
	watchLogOutUser()
];
