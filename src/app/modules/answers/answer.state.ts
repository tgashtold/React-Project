import {IAnswerInfo} from './answer.model';
import {IQuestionInfo} from "../questions/question.model";

export interface IAnswerState {
    currentQuestion: IQuestionInfo | null;
    answers: Array<IAnswerInfo>;
    gettingAnswerData: boolean;
    isQuestionExist: boolean;
    answersTotalQty: number;
    answerCreationError: string;
    getAnswersError: string;
    updateAnswersError: string
}

export const defaultAnswerState: IAnswerState = {
    currentQuestion: null,
    answers: [],
    gettingAnswerData: false,
    isQuestionExist: true,
    answersTotalQty: 0,
    answerCreationError: '',
    getAnswersError: '',
    updateAnswersError: ''
};
