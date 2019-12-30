import {
    createQuestion,
    searchQuestionsByTitle,
    getQuestionsByTag,
    getQuestionsTags,
    getQuestions,
    updateQuestion,
    updateQuestionAnswersInfo
} from './question.action';
import {defaultQuestionState} from './question.state';
import {handleActions} from 'redux-actions';
import {IQuestionState} from './question.model';
import {QuestionServices} from './';

export const questionsReducer = handleActions(
    {
        [`${getQuestionsByTag.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isFilterProcess: true,
        }),
        [`${getQuestionsByTag.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isFilterProcess: false,
            questions: [...action.payload]
        }),
        [`${getQuestionsByTag.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isFilterProcess: false
        }),
        [`${getQuestionsTags.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: true,
        }),
        [`${getQuestionsTags.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false,
            tags: [...action.payload]
        }),
        [`${getQuestionsTags.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false
        }),
        [`${searchQuestionsByTitle.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: true
        }),
        [`${searchQuestionsByTitle.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false,
            questions: [...action.payload]
        }),
        [`${searchQuestionsByTitle.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false
        }),
        [`${createQuestion.request}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: true
        }),
        [`${createQuestion.success}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false,
            questions: [...state.questions, action.payload]
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
            questions: [...action.payload],
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
                questions: [...QuestionServices.updateQuestionsInState(state.questions, action.payload)]
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
                questions: [...QuestionServices.updateQuestionsInState(state.questions, action.payload)]
            };
        },
        [`${updateQuestionAnswersInfo.error}`]: (state: IQuestionState, action: any): IQuestionState => ({
            ...state,
            isDataLoading: false
        })
    },
    defaultQuestionState
);
