import { createSagaWorker } from '../../services';
import {
	logInUser,
	createUser,
	updateUserPersonalInfo,
	increaseAnswersQtyInUserRating,
	increaseQuestionsQtyInUserRating
} from './user.action';
import { IUser, IUserLogInArgs, IUpdatePersonalInfoArgs } from './user.model';

import { UserApi } from './';

const logInUserRequest = (payload: IUserLogInArgs) => UserApi.getUserByEmailAndPassword(payload);
const logInUserAsync = createSagaWorker(logInUserRequest, logInUser);

const createUserRequest = (payload: IUser) => UserApi.addUser(payload);
const createUserAsync = createSagaWorker(createUserRequest, createUser);

const updateUserPersonalInfoRequest = (payload: IUpdatePersonalInfoArgs) => UserApi.changeUserPersonalInfo(payload);
const updateUserPersonalInfoAsync = createSagaWorker(updateUserPersonalInfoRequest, updateUserPersonalInfo);

const increaseAnswersQtyInUserRatingRequest = (userId: string) => UserApi.increaseAnswersQtyInRating(userId);
const increaseAnswersQtyInUserRatingAsync = createSagaWorker(
	increaseAnswersQtyInUserRatingRequest,
	increaseAnswersQtyInUserRating
);

const increaseQuestionsQtyInUserRatingRequest = (userId: string) => UserApi.increaseQuestionsQtyInRating(userId);
const increaseQuestionsQtyInUserRatingAsync = createSagaWorker(
	increaseQuestionsQtyInUserRatingRequest,
	increaseQuestionsQtyInUserRating
);

export {
	updateUserPersonalInfoAsync,
	logInUserAsync,
	createUserAsync,
	increaseAnswersQtyInUserRatingAsync,
	increaseQuestionsQtyInUserRatingAsync
};
