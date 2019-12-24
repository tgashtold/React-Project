import {IAnswer, IAnswerLikes} from "./answer.model";
import {User} from '../users';
import {Question} from "../questions";


export const defaultAnswerState: IAnswer = {
    id: Math.random().toString().slice(5, 15),
    question: {} as Question,
    text: '',
    author: {} as User,
    creationDate: new Date(),
    isAccepted: false,
    likes: {
        quantity: 0,
        users: [] as any
    }
};

