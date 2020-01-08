import {answerActions} from './answer.action';
import {defaultAnswerState, IAnswerState} from './answer.state';
import {AnswerService} from './answer.service';
import {handleActions} from 'redux-actions';

export const answerReducer = handleActions(
    {
        [`${answerActions.getAnswersFromRequestedPosition.request}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: true
        }),
        [`${answerActions.getAnswersFromRequestedPosition.success}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            answers: [...action.payload],
            gettingAnswerData: false
        }),
        [`${answerActions.getAnswersFromRequestedPosition.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: false,
        }),
        [`${answerActions.createAnswer.request}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: true
        }),
        [`${answerActions.createAnswer.success}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: false,
            answersTotalQty: state.answersTotalQty + 1,
            answers: [action.payload, ...state.answers],
        }),
        [`${answerActions.createAnswer.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: false
        }),
        [`${answerActions.getQuestionAndAnswersByQuestionId.request}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: true
        }),
        [`${answerActions.getQuestionAndAnswersByQuestionId.success}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            ...action.payload,
            isQuestionExist: true,
            gettingAnswerData: false
        }),
        [`${answerActions.getQuestionAndAnswersByQuestionId.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: false,
            isQuestionExist: false
        }),
        [`${answerActions.getUpdatedQuestionAndAnswersByQuestionId.request}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: true
        }),
        [`${answerActions.getUpdatedQuestionAndAnswersByQuestionId.success}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            ...action.payload,
            isQuestionExist: true,
            gettingAnswerData: false
        }),
        [`${answerActions.getUpdatedQuestionAndAnswersByQuestionId.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: false,
            isQuestionExist: false
        }),
        [`${answerActions.acceptAnswer.request}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: true
        }),
        [`${answerActions.acceptAnswer.success}`]: (state: IAnswerState, action: any): IAnswerState => {
            return {
                ...state,
                answers: AnswerService.updateAnswerInAnswersArr(state.answers, action.payload.updatedAnswer),
                currentQuestion: action.payload.currentQuestion,
                gettingAnswerData: false
            }
        },
        [`${answerActions.acceptAnswer.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: false
        }),
        [`${answerActions.addLikeToAnswer.request}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: true
        }),
        [`${answerActions.addLikeToAnswer.success}`]: (state: IAnswerState, action: any): IAnswerState => {
            return {
                ...state,
                gettingAnswerData: false,
                answers: AnswerService.updateAnswerInAnswersArr(state.answers, action.payload),
            }
        },
        [`${answerActions.addLikeToAnswer.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: false
        })
    },
    defaultAnswerState
);
