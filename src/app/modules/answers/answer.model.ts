import { IQuestionInfo } from '../questions/question.model';
import { IUserInfo } from '../users/user.model';

export interface IAnswerState {
	currentQuestion: IQuestionInfo | null;
	answers: Array<IAnswerInfo>;
	gettingAnswerData: boolean;
	isQuestionExist: boolean;
}

export interface IAnswerLikes {
	quantity: number;
	users: Array<IUserInfo>;
}

export interface IAnswer {
	id: string;
	question: IQuestionInfo;
	text: string;
	author: IUserInfo;
	creationDate: Date;
	isAccepted: boolean;
}

export interface IAnswerInfo extends IAnswer {
	likes: IAnswerLikes;
}

export interface IAddLikeArgs {
	answerId: string;
	user: IUserInfo;
}
