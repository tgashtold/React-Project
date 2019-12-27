import {
	increaseAnswersQtyInUserRating,
	increaseQuestionsQtyInUserRating,
	updateUserPersonalInfo,
	logInUser,
	logOutUser,
	createUser
} from './user.action';
import { IUserState } from './user.model';
import { defaultUserState } from './user.state';
import { handleActions, combineActions } from 'redux-actions';

export const userReducer = handleActions(
	{
		[`${logOutUser}`]: (state: IUserState, action: any) => ({
			...state,
			user: null,
			isRegistered: null
		}),
		[`${logInUser.request}`]: (state: IUserState, action: any) => ({
			...state,
			isUserCreating: true
		}),
		[`${logInUser.success}`]: (state: IUserState, action: any) => ({
			...state,
			user: { ...action.payload },
			isUserCreating: false,
			isRegistered: true
		}),
		[`${logInUser.error}`]: (state: IUserState, action: any) => ({
			...state,
			isUserCreating: false,
			isRegistered: false
		}),
		[`${createUser.request}`]: (state: IUserState, action: any) => ({
			...state,
			isUserCreating: true
		}),
		[`${createUser.success}`]: (state: IUserState, action: any) => ({
			...state,
			user: { ...action.payload },
			isUserCreating: false,
			registrationError: '',
			isRegistered: true
		}),
		[`${createUser.error}`]: (state: IUserState, action: any) => ({
			...state,
			registrationError: action.payload,
			isUserCreating: false
		}),

		[`${combineActions(
			increaseQuestionsQtyInUserRating.request,
			increaseAnswersQtyInUserRating.request,
			updateUserPersonalInfo.request
		)}`]: (state: IUserState, action: any) => ({
			...state,
			isUserCreating: true
		}),
		[`${combineActions(
			increaseQuestionsQtyInUserRating.success,
			increaseAnswersQtyInUserRating.success,
			updateUserPersonalInfo.success
		)}`]: (state: IUserState, action: any) => ({
			...state,
			user: { ...action.payload },
			isUserCreating: false
		}),
		[`${combineActions(
			increaseQuestionsQtyInUserRating.error,
			increaseAnswersQtyInUserRating.error,
			updateUserPersonalInfo.error
		)}`]: (state: IUserState, action: any) => ({
			...state,
			isUserCreating: false
		})
	},
	defaultUserState
);
