import { createSagaWorker } from '../../services';
import { userActions } from './user.action';
import { IUpdatePersonalInfoArgs, IUser, IUserLogInArgs } from './user.model';
import { UserApi } from './';
import { call, put } from 'redux-saga/effects';
import RoutesConfig from '../../config/Routes.config';
import { push } from 'connected-react-router';
import { UserService } from './user.service';

const logInUserRequest = (payload: IUserLogInArgs) => UserApi.getUserByEmailAndPassword(payload);
const logInUserAsync = createSagaWorker(logInUserRequest, userActions.logInUser);

const createUserRequest = (payload: IUser) => UserApi.addUser(payload);
const createUserAsync = createSagaWorker(createUserRequest, userActions.createUser);

const updateUserPersonalInfoRequest = (payload: IUpdatePersonalInfoArgs) => UserApi.changeUserPersonalInfo(payload);
const updateUserPersonalInfoAsync = createSagaWorker(updateUserPersonalInfoRequest, userActions.updateUserPersonalInfo);

const getUserByIdRequest = (payload: string) => UserApi.getUserById(payload);
const getUserByIdAsync = createSagaWorker(getUserByIdRequest, userActions.getUserById);

function* isUserAuthorizedAsync(action: any) {
	try {
		yield put(userActions.isUserAuthorized.request());
		const result = yield call(UserApi.isAuthorized);
		yield put(userActions.isUserAuthorized.success(result));
	} catch (error) {
		yield put(push(RoutesConfig.routes.error));
	}
}

function* logOutUserAsync(action: any) {
	try {
		yield put(userActions.logOutUser.request());
		UserService.removeUserFromLS();
		yield put(userActions.logOutUser.success());
	} catch (error) {
		yield put(userActions.logOutUser.error(error.message));
		yield put(push(RoutesConfig.routes.error));
	}
}

export const userWorkers: any = {
	updateUserPersonalInfoAsync,
	logInUserAsync,
	createUserAsync,
	getUserByIdAsync,
	isUserAuthorizedAsync,
	logOutUserAsync
};
