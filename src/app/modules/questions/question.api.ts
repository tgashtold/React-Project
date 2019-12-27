import Database from '../../../data/Database';
import { IQuestionInfo } from './question.model';
import { IQuestion, IUpdateQuestionAnswersArgs } from './question.model';
import { QuestionServices } from './question.services';

export class QuestionsApi {
	static async getActiveQuestions(): Promise<any> {
		const questions = await Database.questions;

		if (questions) {
			return await QuestionServices.sortQuestionsByLatestCreationAndAnswerDate(questions);
		} else {
			throw new Error('Unable to load questions');
		}
	}

	static async getQuestionById(id: string): Promise<any> {
		return await Database.questions.find((question: IQuestionInfo) => question.id === id);
	}

	static async addNewQuestionAnswer(data: IUpdateQuestionAnswersArgs): Promise<any> {
		const questionToUpdate = await Database.questions.find(
			(question: IQuestionInfo) => data.questionId === question.id
		);

		questionToUpdate.latestAnswerDate = data.newAnswerDate;
		questionToUpdate.answersQty += 1;

		return this.changeQuestionInDbSync(questionToUpdate);
	}

	static addNewQuestionAnswerSync(data: IUpdateQuestionAnswersArgs): IQuestionInfo {
		const questionToUpdate = Database.questions.find((question: IQuestionInfo) => data.questionId === question.id);

		questionToUpdate.latestAnswerDate = data.newAnswerDate;
		questionToUpdate.answersQty += 1;

		return this.changeQuestionInDbSync(questionToUpdate);
	}

	static getQuestionsByAuthorId(id: string): Array<IQuestionInfo> {
		const questions: Array<IQuestionInfo> = Database.questions.filter(
			(question: IQuestionInfo) => question.author.id === id
		);

		return questions;
	}

	static async closeQuestion(id: string): Promise<any> {
		const questionToClose = await Database.questions.find((question: IQuestionInfo) => question.id === id);

		questionToClose.isClosed = true;

		return this.changeQuestionInDbSync(questionToClose);
	}

	static closeQuestionSync(id: string): IQuestionInfo {
		const questionToClose = Database.questions.find((question: IQuestionInfo) => question.id === id);

		questionToClose.isClosed = true;

		return this.changeQuestionInDbSync(questionToClose);
	}

	static async addQuestion(questionInfo: IQuestion): Promise<any> {
		const newQuestion: IQuestionInfo = {
			...questionInfo,
			answersQty: 0,
			latestAnswerDate: null
		};
		newQuestion.id = Math.random().toString().slice(5, 15);

		const sendToDB = await Database.questions.push(newQuestion);

		if (sendToDB) {
			return newQuestion;
		} else {
			throw new Error('Unable to create new question');
		}
	}

	static async changeQuestion(changedQuestion: IQuestionInfo): Promise<any> {
		return this.changeQuestionInDbSync(changedQuestion);
	}

	static changeQuestionInDbSync(changedQuestion: IQuestionInfo): IQuestionInfo {
		Database.questions = Database.questions.filter((question: IQuestionInfo) => question.id !== changedQuestion.id);
		Database.questions.push(changedQuestion);

		return changedQuestion;
	}
}
