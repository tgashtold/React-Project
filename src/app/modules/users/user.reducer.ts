import {
	addUserQuestion,
	logInUser,
	logOutUser,
	createUser,
	updateUserPersonalInfo,
	updateUserQuestion,
	updateUserRating,
	addQuestionToUserRating,
	addAnswerToUserRating,
	addAcceptedAnswerToUserRating,
	addLikedAnswerToUserRating
} from './user.action';
import { defaultUserState } from './user.state';
import { IUser, IUserRating, IPersonalInfo } from './user.model';
import { IQuestion } from '../questions/question.model';
import { createAction, handleActions } from 'redux-actions';

export const userReducer = handleActions(
	{
		[`${createUser}`]: (state: IUser, action: any) =>{
		debugger	
		return {
			...state,
			...action.payload
		}},
		[`${updateUserPersonalInfo}`]: (state: IUser, action: any) => ({
			...state,
			...action.payload
		}),
		[`${logInUser}`]: (state: IUser, action: any) => ({
			...state,
			...action.payload
		}),
		[`${addUserQuestion}`]: (state: IUser, action: any) => ({
			...state,
			questions: [ ...state.questions, action.payload ]
		}),
		[`${updateUserRating}`]: (state: IUser, action: any) => ({
			...state,
			...action.payload
		}),
		[`${logOutUser}`]: (state: IUser, action: any) => ({
			...defaultUserState
		}),
		[`${updateUserQuestion}`]: (state: IUser, action: any) => ({
			...state,
			questions: [ ...state.questions, action.payload ]
		}),
		[`${addLikedAnswerToUserRating}`]: (state: IUser, action: any) => ({
			...state,
			rating: {
				...state.rating,
				answersLikedByOthers: ++state.rating.answersLikedByOthers
			}
		}),
		[`${addQuestionToUserRating}`]: (state: IUser, action: any) => ({
			...state,
			rating: {
				...state.rating,
				questionsTotal: ++state.rating.questionsTotal
			}
		}),
		[`${addAcceptedAnswerToUserRating}`]: (state: IUser, action: any) => ({
			...state,
			rating: {
				...state.rating,
				answersAcceptedByOthers: ++state.rating.answersAcceptedByOthers
			}
		}),
		[`${addAnswerToUserRating}`]: (state: IUser, action: any) => ({
			...state,
			rating: {
				...state.rating,
				answersTotal: ++state.rating.answersTotal
			}
		})
	},
	defaultUserState
);

// questionsTotal: 0,
// answersTotal: 0,
// answersAcceptedByOthers: 0,
// answersLikedByOthers: 0,
