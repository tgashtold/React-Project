import Database from '../../../data/Database';
import { IAnswer, IAnswerInfo, IAddLikeArgs } from './answer.model';
import { QuestionsApi } from '../questions';
import { UserApi } from '../users';
import { IQuestionInfo } from '../questions/question.model';
import { IUserInfoInDB } from '../users/user.model';
import { AnswerServices } from './answer.services';

export class AnswerApi {
	static async getAnswers(): Promise<any> {
		return await Database.answers;
	}

	static getSortedAnswersByQuestionId(questionId: string): Array<IAnswerInfo> {
		const answers: Array<IAnswerInfo> = Database.answers.filter(
			(answer: IAnswerInfo) => questionId === answer.question.id
		);

		return AnswerServices.sortAnswersByCreationDate(answers);
	}

	static async acceptAnswerByIdAndUpdateAuthorRating(answerId: string): Promise<any> {
		const answerToAccept: IAnswerInfo = await Database.answers.find(
			(answer: IAnswerInfo) => answer.id === answerId
		);
		answerToAccept.isAccepted = true;

		Database.answers = await Database.answers.filter((answer: IAnswerInfo) => answer.id !== answerId);
		Database.answers.push(answerToAccept);

		const answerAuthor: IUserInfoInDB = UserApi.getUserById(answerToAccept.author.id);

		answerAuthor.rating.answersAcceptedByOthers += 1;
		UserApi.updateUser(answerAuthor);

		return await {
			currentQuestion: QuestionsApi.closeQuestionSync(answerToAccept.question.id),
			answers: this.getSortedAnswersByQuestionId(answerToAccept.question.id)
		};
	}

	static async addLikeToAnswerAndUpdateAuthorRating(args: IAddLikeArgs): Promise<any> {
		const answerToAddLike: IAnswerInfo = await Database.answers.find(
			(answer: IAnswerInfo) => answer.id === args.answerId
		);

		answerToAddLike.likes.quantity += 1;
		answerToAddLike.likes.users.push(args.user);

		const answerAuthor: IUserInfoInDB = UserApi.getUserById(answerToAddLike.author.id);

		answerAuthor.rating.answersLikedByOthers += 1;

		UserApi.updateUser(answerAuthor);

		answerToAddLike.author = {
			...answerAuthor,
			questions: []
		};

		Database.answers = await Database.answers.filter((answer: IAnswerInfo) => answer.id !== args.answerId);
		Database.answers.push(answerToAddLike);

		return this.getSortedAnswersByQuestionId(answerToAddLike.question.id);
	}

	static async addAnswer(newAnswer: IAnswer): Promise<any> {
		const createdAnswer: IAnswerInfo = {
			...newAnswer,
			id: Math.random().toString().slice(5, 15),
			likes: {
				quantity: 0,
				users: []
			}
		};

		await Database.answers.push(createdAnswer);
		return await {
			currentQuestion: QuestionsApi.addNewQuestionAnswerSync({
				newAnswerDate: createdAnswer.creationDate,
				questionId: createdAnswer.question.id
			}),
			answers: this.getSortedAnswersByQuestionId(createdAnswer.question.id)
		};
	}

	static async getQuestionWithAnswersByQuestionId(questionId: string): Promise<any> {
		const question: IQuestionInfo | undefined = await QuestionsApi.getQuestionById(questionId);

		if (!question) {
			throw new Error('No such question');
		}

		return {
			currentQuestion: question,
			answers: this.getSortedAnswersByQuestionId(questionId)
		};
	}
}
