import { IAnswerState } from './answer.model';

export const defaultAnswerState: IAnswerState = {
	currentQuestion: null,
	answers: [],
	gettingAnswerData: false,
	isQuestionExist: true
};
