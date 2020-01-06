import {IQuestionInfo} from '../questions/question.model';
import {IUserInfo} from '../users/user.model';

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

export interface IGetAswersFromPositionArgs {
    startNumber: number,
    itemsCount: number,
    questionId: string
}

export interface IGetQuestionAndAswersArgs {
    questionId: string,
    answersCountPerPage: number,
}

export interface IAnswerLikes {
    quantity: number;
    users: Array<IUserInfo>;
}

export interface IAddLikeArgs {
    answerId: string;
    user: IUserInfo;

}
