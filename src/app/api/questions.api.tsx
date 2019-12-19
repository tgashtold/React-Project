import Database from '../models/Database';
import Question from '../models/Question';
export const QuestionsApi: any = {
	async getQuestions(): Promise<any> {
		return await Database.questions;
	},

	async getQuestionById(id: string): Promise<any> {
		return await Database.questions.find((question: Question) => question.id === id);
	},

	async addQuestion(newQuestion: Question): Promise<any> {
		await Database.questions.push(newQuestion);
	},

	async changeQuestion(changedQuestion: Question): Promise<any> {
		const filteredQuestions: Array<Question> = await Database.questions.filter(
			(question: Question) => question.id !== changedQuestion.id
		);
		await filteredQuestions.push(changedQuestion);
		Database.questions = filteredQuestions;
	}
};
