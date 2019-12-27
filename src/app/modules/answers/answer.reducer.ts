import { createAnswer, acceptAnswer, addLikeToAnswer, getQuestionAndAnswersByQuestionId } from './answer.action';
import { defaultAnswerState } from './answer.state';
import { IAnswerState } from '../answers/answer.model';
import { handleActions } from 'redux-actions';

export const answerReducer = handleActions(
	{
		[`${createAnswer.request}`]: (state: IAnswerState, action: any): IAnswerState => ({
			...state,
			gettingAnswerData: true
		}),
		[`${createAnswer.success}`]: (state: IAnswerState, action: any): IAnswerState => ({
			...state,
			gettingAnswerData: false,
			...action.payload
		}),
		[`${createAnswer.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
			...state,
			gettingAnswerData: false
		}),
		[`${getQuestionAndAnswersByQuestionId.request}`]: (state: IAnswerState, action: any): IAnswerState => ({
			...state,
			gettingAnswerData: true
		}),
		[`${getQuestionAndAnswersByQuestionId.success}`]: (state: IAnswerState, action: any): IAnswerState => ({
			...state,
			...action.payload,
			isQuestionExist: true,
			gettingAnswerData: false
		}),
		[`${getQuestionAndAnswersByQuestionId.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
			...state,
			gettingAnswerData: false,
			isQuestionExist: false
		}),
		[`${acceptAnswer.request}`]: (state: IAnswerState, action: any): IAnswerState => ({
			...state,
			gettingAnswerData: true
		}),
		[`${acceptAnswer.success}`]: (state: IAnswerState, action: any): IAnswerState => ({
			...state,
			...action.payload,
			isAnyAnswerAccepted: true,
			gettingAnswerData: false
		}),
		[`${acceptAnswer.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
			...state,
			gettingAnswerData: false
		}),
		[`${addLikeToAnswer.request}`]: (state: IAnswerState, action: any): IAnswerState => ({
			...state,
			gettingAnswerData: true
		}),
		[`${addLikeToAnswer.success}`]: (state: IAnswerState, action: any): IAnswerState => ({
			...state,
			gettingAnswerData: false,
			answers: [ ...action.payload ]
		}),
		[`${addLikeToAnswer.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
			...state,
			gettingAnswerData: false
		})
	},
	defaultAnswerState
);
