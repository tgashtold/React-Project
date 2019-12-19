import Question from '../models/Question';
import Answer from '../models/Answer';

export interface IQuestionAnswersObj{
	question: Question,
	answers: Array<Answer>,
answersNumber: number,
latestAnswerDate: number | null,
}

export interface IChangedEventArgs {
	name: string | undefined;
	value: string;
	isValid: boolean;
}
