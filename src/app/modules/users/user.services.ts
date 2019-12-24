import {User} from './';
import {IUser} from './user.model';
import {Answer} from '../answers';
import {Question} from '../questions';

export class UserServices {
    static isUserLikedAnswer(user: User| IUser, answer: Answer): boolean {
        const usersLikedAnswerArr: Array<User> = answer.likes.users;

        if (usersLikedAnswerArr.length === 0) return false;

        return !!usersLikedAnswerArr.find((userLikedAnswer: User) => userLikedAnswer.id === user.id);
    };

    static isUserAndQuestionAuthorEqual(user: User| IUser, question: Question): boolean {
        return question.author.id === user.id;
    };
}