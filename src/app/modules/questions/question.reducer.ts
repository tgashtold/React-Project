import {questionActions} from './question.action';
import {defaultQuestionState, IQuestionState} from './question.state';
import {handleActions} from 'redux-actions';

export const questionsReducer = handleActions(
    {
        [`${questionActions.getQuestionsByTag.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isFilterProcess: true,
            uploadingError: ''
        }),
        [`${questionActions.getQuestionsByTag.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isFilterProcess: false,
            questions: [...action.payload],
            uploadingError: ''
        }),
        [`${questionActions.getQuestionsByTag.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isFilterProcess: false,
            uploadingError: action.payload
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
            isDataLoading: true,
            uploadingError: ''
        }),
        [`${questionActions.searchQuestionsByTitle.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false,
            questions: [...action.payload],
            uploadingError: ''
        }),
        [`${questionActions.searchQuestionsByTitle.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false,
            uploadingError: action.payload
        }),
        [`${questionActions.createQuestion.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: true,
            creationError: ''
        }),
        [`${questionActions.createQuestion.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false,
            questions: state.questions ? [...state.questions, action.payload] : [...action.payload],
            creationError: ''
        }),
        [`${questionActions.createQuestion.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false,
            creationError: action.payload
        }),
        [`${questionActions.getQuestions.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: true,
            uploadingError: ''
        }),
        [`${questionActions.getQuestions.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            questions: [...action.payload],
            isDataLoading: false,
            uploadingError: ''
        }),
        [`${questionActions.getQuestions.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false,
            uploadingError: action.payload
        }),
    },
    defaultQuestionState
);
