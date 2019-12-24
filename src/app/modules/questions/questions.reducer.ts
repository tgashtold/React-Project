import {
	closeQuestion,
	createQuestion,
	getQuestions,
	updateQuestion,
	updateQuestionAnswersInfo
} from './question.action';
import { defaultQuestionState, IQuestionState } from './questions.state';
import { handleActions } from 'redux-actions';

export const questionsReducer = handleActions(
	{
		[`${createQuestion.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isQuestionCreating: true
		}),
		[`${createQuestion.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isQuestionCreating: false,
			questions: [ ...state.questions, action.payload ]
		}),
		[`${createQuestion.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isQuestionCreating: false
		}),
		[`${getQuestions.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isQuestionCreating: true
		}),
		[`${getQuestions.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			questions: [ ...action.payload ],
			isQuestionCreating: false
		}),
		[`${getQuestions.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isQuestionCreating: false
		}),
		[`${updateQuestion.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isQuestionCreating: true
		}),
		[`${updateQuestion.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isQuestionCreating: false,
			questions: [ ...state.questions, action.payload ]
		}),
		[`${updateQuestion.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isQuestionCreating: false
		}),
		[`${closeQuestion.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isQuestionCreating: true
		}),
		[`${closeQuestion.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isQuestionCreating: false,
			questions: [ ...state.questions, action.payload ]
		}),
		[`${closeQuestion.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isQuestionCreating: false
		}),
		[`${updateQuestionAnswersInfo.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isQuestionCreating: true
		}),
		[`${updateQuestionAnswersInfo.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isQuestionCreating: false,
			questions: [ ...state.questions, action.payload ]
		}),
		[`${updateQuestionAnswersInfo.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isQuestionCreating: false
		})
	},
	defaultQuestionState
);
