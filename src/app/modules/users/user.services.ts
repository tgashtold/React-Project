import { IUserInfo } from './user.model';
import { IAnswerInfo } from '../answers/answer.model';
import { IQuestionInfo } from '../questions/question.model';

export class UserServices {
	static isUserLikedAnswer(user: IUserInfo, answer: IAnswerInfo): boolean {
		const usersLikedAnswerArr: Array<IUserInfo> = answer.likes.users;

		if (usersLikedAnswerArr.length === 0) return false;

		return !!usersLikedAnswerArr.find((userLikedAnswer: IUserInfo) => userLikedAnswer.id === user.id);
	}

	static isUserAndQuestionAuthorEqual(user: IUserInfo, question: IQuestionInfo): boolean {
		return question.author.id === user.id;
	}

	static isUserAndAnswerAuthorEqual(user: IUserInfo, answer: IAnswerInfo): boolean {
		return answer.author.id === user.id;
	}
}
