import {User} from '../users';
import {Question} from '../questions';


export interface IAnswerLikes {
    quantity: number,
    users: Array<User>
}
export interface IAnswer {
    id: string;
    question: Question;
    text: string;
    author: User;
    creationDate: Date;
    isAccepted: boolean;
    likes: IAnswerLikes;
}

export class Answer implements IAnswer {
    id: string = Math.random().toString().slice(5, 15);
    question: Question;
    text: string = '';
    author: User;
    creationDate: Date = new Date();
    isAccepted: boolean = false;
    likes = {
        quantity: 0,
        users: [] as any
    };

    constructor(author: User, question: Question) {
        this.author = author;
        this.question = question;
    }

}

