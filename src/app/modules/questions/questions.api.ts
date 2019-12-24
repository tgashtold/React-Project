import Database from '../../../data/Database';
import { IQuestionInfo } from './question.model';
import { IQuestionCreationInfo, IUpdateQuestionAnswersArgs } from './question.worker';

export class QuestionsApi {
	static async getQuestions(): Promise<any> {
		const questions = await Database.questions;
		if (questions) {
			return questions;
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
		Database.questions = [ ...Database.questions, questionToUpdate ];

		return questionToUpdate;
	}

	static async closeQuestion(id: string): Promise<any> {
		const questionToClose = await Database.questions.find((question: IQuestionInfo) => question.id === id);
		questionToClose.isClosed = true;
		Database.questions = [ ...Database.questions, questionToClose ];

		return questionToClose;
	}

	static async addQuestion(questionInfo: IQuestionCreationInfo): Promise<any> {
		const newQuestion: IQuestionInfo = {
			id: Math.random().toString().slice(5, 15),
			author: questionInfo.author,
			title: questionInfo.title,
			creationDate: new Date(),
			description: questionInfo.description,
			isClosed: false,
			answersQty: 0,
			latestAnswerDate: null
		};

		const sendToDB = await Database.questions.push(newQuestion);

		if (sendToDB) {
			return newQuestion;
		} else {
			throw new Error('Unable to create new question');
		}
	}

	static async changeQuestion(changedQuestion: IQuestionInfo): Promise<any> {
		Database.questions = [ ...Database.questions, changedQuestion ];

		return changedQuestion;
	}
}
