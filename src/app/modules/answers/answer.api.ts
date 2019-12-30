import Database from '../../../data/Database';
import {
    IAnswerInfo,
    IAddLikeArgs,
    IGetAswersFromPositionArgs,
    IGetQuestionAndAswersArgs,
    ICreateAnswerArgs
} from './answer.model';
import {QuestionsApi} from '../questions';
import {UserApi} from '../users';
import {IQuestionInfo} from '../questions/question.model';
import {IUserInfoInDB} from '../users/user.model';
import {AnswerServices} from './answer.services';

export class AnswerApi {
    static async getAnswers(): Promise<any> {
        return await Database.answers;
    }

    static getAnswerById(answerId: string): IAnswerInfo {
        return Database.answers.find(
            (answer: IAnswerInfo) => answer.id === answerId
        );
    }

    static replaceAnswerInDB(updatedAnswer: IAnswerInfo): IAnswerInfo {
        Database.answers = Database.answers.map((answer: IAnswerInfo) => {
            if (answer.id === updatedAnswer.id) {
                return {
                    ...answer,
                    ...updatedAnswer
                }
            } else {
                return answer;
            }
        });

        return updatedAnswer;
    }

    static getSortedAnswersByQuestionId(questionId: string): Array<IAnswerInfo> {
        const answers: Array<IAnswerInfo> = Database.answers.filter(
            (answer: IAnswerInfo) => questionId === answer.question.id
        );

        return AnswerServices.sortAnswersByCreationDate(answers);
    }

    static async acceptAnswerByIdAndUpdateAuthorRating(answerId: string): Promise<any> {
        const answerToAccept: IAnswerInfo = await this.getAnswerById(answerId);
        answerToAccept.isAccepted = true;

        this.replaceAnswerInDB(answerToAccept);

        const answerAuthor: IUserInfoInDB = UserApi.getUserById(answerToAccept.author.id);

        answerAuthor.rating.answersAcceptedByOthers += 1;
        UserApi.updateUser(answerAuthor);

        return await {
            currentQuestion: QuestionsApi.closeQuestionSync(answerToAccept.question.id),
            updatedAnswer: this.getSortedAnswersByQuestionId(answerToAccept.question.id)
        };
    }

    static async addLikeToAnswerAndUpdateAuthorRating(args: IAddLikeArgs): Promise<any> {
        const answerToAddLike: IAnswerInfo = await this.getAnswerById(args.answerId);

        answerToAddLike.likes.quantity += 1;
        answerToAddLike.likes.users.push(args.user);

        const answerAuthor: IUserInfoInDB = UserApi.getUserById(answerToAddLike.author.id);

        answerAuthor.rating.answersLikedByOthers += 1;

        UserApi.updateUser(answerAuthor);

        answerToAddLike.author = {
            ...answerAuthor,
            questions: []
        };

        this.replaceAnswerInDB(answerToAddLike);

        return answerToAddLike;
    }


    static async addAnswer(data: ICreateAnswerArgs): Promise<any> {
        const createdAnswer: IAnswerInfo = {
            ...data.answer,
            id: Math.random().toString().slice(5, 15),
            likes: {
                quantity: 0,
                users: []
            }
        };

        QuestionsApi.addNewQuestionAnswerSync({
            newAnswerDate: createdAnswer.creationDate,
            questionId: createdAnswer.question.id
        });
        await Database.answers.push(createdAnswer);

        const answers: Array<IAnswerInfo> = this.getSortedAnswersByQuestionId(data.answer.question.id);

        return await {
            answers: answers.slice(0, data.answersCountPerPage),
            answersTotalQty: answers.length,
        };
    }

    static async getQuestionWithAnswersByQuestionId(requestData: IGetQuestionAndAswersArgs): Promise<any> {
        const question: IQuestionInfo | undefined = await QuestionsApi.getQuestionById(requestData.questionId);

        if (!question) {
            throw new Error('No such question');
        }
        const answers: Array<IAnswerInfo> = this.getSortedAnswersByQuestionId(requestData.questionId);

        return {
            currentQuestion: question,
            answers: answers.slice(0, requestData.answersCountPerPage),
            answersTotalQty: answers.length
        };
    }

    static async getAnswersFromRequestedPosition(requestData: IGetAswersFromPositionArgs): Promise<any> {
        const questions: Array<IAnswerInfo> = await this.getSortedAnswersByQuestionId(requestData.questionId);
        const requestedQuestions: Array<IAnswerInfo> = questions.slice(
            requestData.startNumber,
            requestData.startNumber + requestData.itemsCount
        );

        return requestedQuestions;
    }
}
