import {createSagaWorker} from '../../services';
import {userActions} from './user.action';
import {IUpdatePersonalInfoArgs, IUser, IUserLogInArgs} from './user.model';

import {UserApi} from './';

const logInUserRequest = (payload: IUserLogInArgs) => UserApi.getUserByEmailAndPassword(payload);
const logInUserAsync = createSagaWorker(logInUserRequest, userActions.logInUser);

const createUserRequest = (payload: IUser) => UserApi.addUser(payload);
const createUserAsync = createSagaWorker(createUserRequest, userActions.createUser);

const updateUserPersonalInfoRequest = (payload: IUpdatePersonalInfoArgs) => UserApi.changeUserPersonalInfo(payload);
const updateUserPersonalInfoAsync = createSagaWorker(updateUserPersonalInfoRequest, userActions.updateUserPersonalInfo);

const increaseAnswersQtyInUserRatingRequest = (userId: string) => UserApi.increaseAnswersQtyInRating(userId);
const increaseAnswersQtyInUserRatingAsync = createSagaWorker(
    increaseAnswersQtyInUserRatingRequest,
    userActions.increaseAnswersQtyInUserRating
);

const increaseQuestionsQtyInUserRatingRequest = (userId: string) => UserApi.increaseQuestionsQtyInRating(userId);
const increaseQuestionsQtyInUserRatingAsync = createSagaWorker(
    increaseQuestionsQtyInUserRatingRequest,
    userActions.increaseQuestionsQtyInUserRating
);

export const userWorkers: any = {
    updateUserPersonalInfoAsync,
    logInUserAsync,
    createUserAsync,
    increaseAnswersQtyInUserRatingAsync,
    increaseQuestionsQtyInUserRatingAsync
};
