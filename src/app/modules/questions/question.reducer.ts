import { createQuestion, getQuestions, updateQuestion, updateQuestionAnswersInfo } from './question.action';
import { defaultQuestionState } from './question.state';
import { handleActions } from 'redux-actions';
import { IQuestionState} from './question.model';
import { QuestionServices } from './';

export const questionsReducer = handleActions(
	{
		[`${createQuestion.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isDataLoading: true
		}),
		[`${createQuestion.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isDataLoading: false,
			questions: [ ...state.questions, action.payload ]
		}),
		[`${createQuestion.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isDataLoading: false
		}),
		[`${getQuestions.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isDataLoading: true
		}),
		[`${getQuestions.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			questions: [ ...action.payload ],
			isDataLoading: false
		}),
		[`${getQuestions.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isDataLoading: false
		}),
		[`${updateQuestion.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isDataLoading: true
		}),
		[`${updateQuestion.success}`]: (state: IQuestionState, action: any): IQuestionState => {
			// const updatedQuestionsState: Array<IQuestionInfo> = state.questions.filter(
			// 	(question: IQuestionInfo) => question.id !== action.payload.id
			// );
			// updatedQuestionsState.push(action.payload);

			return {
				...state,
				isDataLoading: false,
				questions: [ ...QuestionServices.updateQuestionsInState(state.questions, action.payload) ]
			};
		},
		[`${updateQuestion.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isDataLoading: false
		}),
		[`${updateQuestionAnswersInfo.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isDataLoading: true
		}),
		[`${updateQuestionAnswersInfo.success}`]: (state: IQuestionState, action: any): IQuestionState => {
			return {
				...state,
				isDataLoading: false,
				questions: [ ...QuestionServices.updateQuestionsInState(state.questions, action.payload) ]
			};
		},
		[`${updateQuestionAnswersInfo.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
			...state,
			isDataLoading: false
		})
	},
	defaultQuestionState
);
