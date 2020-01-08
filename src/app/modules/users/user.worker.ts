import {createSagaWorker} from '../../services';
import {userActions} from './user.action';
import {IUpdatePersonalInfoArgs, IUser, IUserLogInArgs} from './user.model';
import { put, take} from 'redux-saga/effects';

import {UserApi} from './';
import {answerActions} from "../answers";

const logInUserRequest = (payload: IUserLogInArgs) => UserApi.getUserByEmailAndPassword(payload);
const logInUserAsync = createSagaWorker(logInUserRequest, userActions.logInUser);

const createUserRequest = (payload: IUser) => UserApi.addUser(payload);
const createUserAsync = createSagaWorker(createUserRequest, userActions.createUser);

const updateUserPersonalInfoRequest = (payload: IUpdatePersonalInfoArgs) => UserApi.changeUserPersonalInfo(payload);
const updateUserPersonalInfoAsync = createSagaWorker(updateUserPersonalInfoRequest, userActions.updateUserPersonalInfo);

function* increaseAnswersQtyInUserRatingAsync(action: any) {
    try {
        yield take(answerActions.createAnswer.success);
        yield put(userActions.increaseAnswersQtyInUserRating.request());

        const result = yield UserApi.increaseAnswersQtyInRating(action.payload);

        yield put(userActions.increaseAnswersQtyInUserRating.success(result));
        
        console.log('finish updating rating');
    } catch (error) {
        yield put(userActions.increaseAnswersQtyInUserRating.error(error.message));
    }
};

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
