import {answerActions} from './answer.action';
import {defaultAnswerState, IAnswerState} from './answer.state';
import {AnswerService} from './answer.service';
import {handleActions} from 'redux-actions';

export const answerReducer = handleActions(
    {
        [`${answerActions.getAnswersFromRequestedPosition.request}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: true,
            getAnswersError: '',
            updateAnswersError: ''
        }),
        [`${answerActions.getAnswersFromRequestedPosition.success}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            answers: [...action.payload],
            gettingAnswerData: false,
            getAnswersError: ''
        }),
        [`${answerActions.getAnswersFromRequestedPosition.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: false,
            getAnswersError: action.payload
        }),
        [`${answerActions.createAnswer.request}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: true,
            answerCreationError: '',
            updateAnswersError: '',
            getAnswersError: ''
        }),
        [`${answerActions.createAnswer.success}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: false,
            answersTotalQty: state.answersTotalQty + 1,
            answers: [action.payload, ...state.answers],
            answerCreationError: ''
        }),
        [`${answerActions.createAnswer.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: false,
            answerCreationError: action.payload
        }),
        [`${answerActions.getQuestionAndAnswersByQuestionId.request}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: true,
            updateAnswersError: '',
            getAnswersError: ''
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
            gettingAnswerData: true,
            updateAnswersError: '',
            getAnswersError: ''
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
            gettingAnswerData: true,
            updateAnswersError: '',
            getAnswersError: ''
        }),
        [`${answerActions.acceptAnswer.success}`]: (state: IAnswerState, action: any): IAnswerState => {
            return {
                ...state,
                answers: AnswerService.updateAnswerInAnswersArr(state.answers, action.payload.updatedAnswer),
                currentQuestion: action.payload.currentQuestion,
                gettingAnswerData: false,
                updateAnswersError: ''
            }
        },
        [`${answerActions.acceptAnswer.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: false,
            updateAnswersError: action.payload
        }),
        [`${answerActions.addLikeToAnswerAndUpdateQuestionAndAnswers.request}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: true,
            updateAnswersError: '',
            getAnswersError: ''
        }),
        [`${answerActions.addLikeToAnswerAndUpdateQuestionAndAnswers.success}`]: (state: IAnswerState, action: any): IAnswerState => {
            return {
                ...state,
                ...action.payload,
                gettingAnswerData: false,
                updateAnswersError: ''
            }
        },
        [`${answerActions.addLikeToAnswerAndUpdateQuestionAndAnswers.error}`]: (state: IAnswerState, action: any): IAnswerState => ({
            ...state,
            gettingAnswerData: false,
            updateAnswersError: action.payload
        })
    },
    defaultAnswerState
);
