import { IUserInfo } from '../users/user.model';

export interface IQuestion {
	id: string;
	author: IUserInfo;
	title: string;
	creationDate: Date;
	description: string;
	isClosed: boolean;
}

export interface IQuestionState {
	questions: IQuestionInfo[];
	isDataLoading: boolean;
}

export interface IQuestionInfo extends IQuestion {
	answersQty: number;
	latestAnswerDate: Date | null;
	
}

export interface IQuestionCreationInfo {
	author: IUserInfo;
	title: string;
	description: string;
}

export interface IUpdateQuestionAnswersArgs {
	questionId: string;
	newAnswerDate: Date;
}

