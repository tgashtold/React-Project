import {questionActions} from './question.action';
import {defaultQuestionState, IQuestionState} from './question.state';
import {handleActions} from 'redux-actions';
import {QuestionService} from './';

export const questionsReducer = handleActions(
    {
        [`${questionActions.getQuestionsByTag.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isFilterProcess: true,
        }),
        [`${questionActions.getQuestionsByTag.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isFilterProcess: false,
            questions: [...action.payload]
        }),
        [`${questionActions.getQuestionsByTag.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isFilterProcess: false
        }),
        [`${questionActions.getQuestionsTags.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: true,
        }),
        [`${questionActions.getQuestionsTags.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false,
            tags: [...action.payload]
        }),
        [`${questionActions.getQuestionsTags.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false
        }),
        [`${questionActions.searchQuestionsByTitle.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: true
        }),
        [`${questionActions.searchQuestionsByTitle.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false,
            questions: [...action.payload]
        }),
        [`${questionActions.searchQuestionsByTitle.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false
        }),
        [`${questionActions.createQuestion.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: true
        }),
        [`${questionActions.createQuestion.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false,
            questions: [...state.questions, action.payload]
        }),
        [`${questionActions.createQuestion.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false
        }),
        [`${questionActions.getQuestions.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: true
        }),
        [`${questionActions.getQuestions.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            questions: [...action.payload],
            isDataLoading: false
        }),
        [`${questionActions.getQuestions.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false
        }),
        [`${questionActions.updateQuestion.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: true
        }),
        [`${questionActions.updateQuestion.success}`]: (state: IQuestionState, action: any): IQuestionState => {
            return {
                ...state,
                isDataLoading: false,
                questions: [...QuestionService.updateQuestionsInState(state.questions, action.payload)]
            };
        },
        [`${questionActions.updateQuestion.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false
        }),
        [`${questionActions.updateQuestionAnswersInfo.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: true
        }),
        [`${questionActions.updateQuestionAnswersInfo.success}`]: (state: IQuestionState, action: any): IQuestionState => {
            return {
                ...state,
                isDataLoading: false,
                questions: [...QuestionService.updateQuestionsInState(state.questions, action.payload)]
            };
        },
        [`${questionActions.updateQuestionAnswersInfo.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false
        })
    },
    defaultQuestionState
);
