import Database from '../models/Database';
import Answer from '../models/Answer';
import Question from '../models/Question';
import { IQuestionAnswersObj } from '../Utils/Interfaces';
import { AnswersService } from '../services/Answers-service';

export const AnswersApi: any = {
	async getAnswers(): Promise<any> {
		return await Database.answers;
	},

	async getAnswerById(id: string): Promise<any> {
		return await Database.answers.find((answer: Answer) => answer.id === id);
	},

	async addAnswer(newAnswer: Answer): Promise<any> {
		await Database.answers.push(newAnswer);
	},

	async changeAnswer(changedAnswer: Answer): Promise<any> {
		const filteredAnswers: Array<Answer> = await Database.answers.filter(
			(answer: Answer) => answer.id !== changedAnswer.id
		);
		await filteredAnswers.push(changedAnswer);
		Database.answers = filteredAnswers;
	},

	async getQuestionAnswersInfoArr(questionsArr: Array<Question>): Promise<any> {
		return await questionsArr.map((questionFromArr: Question) => {
			const questionAnswers: Array<Answer> = Database.answers.filter(
				(answer: Answer) => answer.question.id === questionFromArr.id
			);
			const questionAnswersInfo: IQuestionAnswersObj = {
				question: questionFromArr,
				answers: questionAnswers,
				answersNumber: questionAnswers.length,
				latestAnswerDate: AnswersService.findLatestAnswerDate(questionAnswers)
			};

			return questionAnswersInfo;
		});
	}
};
