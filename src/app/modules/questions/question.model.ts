import {IUser} from '../users/user.model';

export interface IQuestion {
    id: string;
    author: IUser;
    title: string;
    creationDate: Date;
    description: string;
    isClosed: boolean;
}

export interface IQuestionInfo extends IQuestion {
    answersQty: number;
    latestAnswerDate: Date | null;
}

//TODO: delete classS
export class Question implements IQuestion {
    id: string = Math.random().toString().slice(5, 15);
    author: IUser;
    title: string = '';
    creationDate: Date = new Date();
    description: string = '';
    isClosed: boolean = false;

    constructor(author: IUser) {
        this.author = author;
    }
}

