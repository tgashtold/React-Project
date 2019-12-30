import {
    createAnswer,
    acceptAnswer,
    addLikeToAnswer,
    getQuestionAndAnswersByQuestionId,
    getAnswersFromRequestedPosition
} from './answer.action';
import {defaultAnswerState} from './answer.state';
import {IAnswerInfo, IAnswerState} from '../answers/answer.model';
import {handleActions} from 'redux-actions';

export const answerReducer = handleActions(
    {
        [`${getAnswersFromRequestedPosition.request}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: true
        }),
        [`${getAnswersFromRequestedPosition.success}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            answers: [...action.payload],
            gettingAnswerData: false
        }),
        [`${getAnswersFromRequestedPosition.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: false,
        }),
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
        [`${acceptAnswer.success}`]: (state: IAnswerState, action: any): IAnswerState => {
            const updatedAnswers: Array<IAnswerInfo> = state.answers.map((answer: IAnswerInfo) => {
                if (answer.id === action.payload.updatedAnswer.id) {
                    return {...action.payload}
                } else {
                    return answer;
                }
            });
            return {
                ...state,
                answers: updatedAnswers,
                currentQuestion: action.payload.currentQuestion,
                gettingAnswerData: false
            }
        },
        [`${acceptAnswer.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: false
        }),
        [`${addLikeToAnswer.request}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: true
        }),
        [`${addLikeToAnswer.success}`]: (state: IAnswerState, action: any): IAnswerState => {
            const updatedAnswers: Array<IAnswerInfo> = state.answers.map((answer: IAnswerInfo) => {
                if (answer.id === action.payload.id) {
                    return {...answer, ...action.payload}
                } else {
                    return answer;
                }
            });
            return {
                ...state,
                gettingAnswerData: false,
                answers: [...updatedAnswers],
            }
        },
        [`${addLikeToAnswer.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: false
        })
    },
    defaultAnswerState
);
