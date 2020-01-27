import {IUserInfo} from './user.model';
import {IAnswerInfo} from '../answers/answer.model';
import {IQuestionInfo} from '../questions/question.model';

export class UserService {
    static isUserAndQuestionAuthorEqual(user: IUserInfo, question: IQuestionInfo): boolean {
        return question.author.id === user.id;
    }

    static removeUserFromLS(){
        localStorage.removeItem('Authorization');
    }

    static addUserToLS(token:string){
           localStorage.setItem('Authorization', token);
    }

    static isUserAndAnswerAuthorEqual(user: IUserInfo, answer: IAnswerInfo): boolean {
        return answer.author.id === user.id;
    }
}
