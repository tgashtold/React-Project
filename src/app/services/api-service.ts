import { IQuestionInfo } from '../modules/questions/question.model';

export class APIService {
	static sortQuestionsByAnswerAndCreationDate = (questions: IQuestionInfo): IQuestionInfo => {
		return questions;
	};
}
