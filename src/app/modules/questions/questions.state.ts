import { IQuestionInfo } from './question.model';

export interface IQuestionState {
	questions: IQuestionInfo[];
	currentQuestion: IQuestionInfo | null;
	isQuestionCreating: boolean;
}

export const defaultQuestionState: IQuestionState = {
	questions: [],
	currentQuestion: null,
	isQuestionCreating: false
};
