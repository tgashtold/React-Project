import Database from '../../../data/Database';
import {Question} from '../questions';
import {IQuestionAnswersObj, AnswersServices, Answer} from '../answers';

export class AnswersApi {
    static async getAnswers(): Promise<any> {
        return await Database.answers;
    }

    static async getAnswerById(id: string): Promise<any> {
        return await Database.answers.find((answer: Answer) => answer.id === id);
    }

    static async addAnswer(newAnswer: Answer): Promise<any> {
        await Database.answers.push(newAnswer);
    }

    static async changeAnswer(changedAnswer: Answer): Promise<any> {
        const filteredAnswers: Array<Answer> = await Database.answers.filter(
            (answer: Answer) => answer.id !== changedAnswer.id
        );
        await filteredAnswers.push(changedAnswer);

        Database.answers = filteredAnswers;
    }

   static async getAnswersByQuestionId (questionId:string): Promise<any> {
      return await Database.answers.filter((answer: Answer) => questionId === answer.question.id);
   }


    static async getQuestionAnswersInfoArr(questionsArr: Array<Question>): Promise<any> {
        const answersInDB: Array<Answer> = Database.answers;
        return await questionsArr.map((questionFromArr: Question) => {
            const questionAnswers: Array<Answer> = answersInDB.filter(
                (answer: Answer) => answer.question.id === questionFromArr.id
            );
            const latestAnswerDate = questionAnswers.length > 0 ? AnswersServices.findLatestAnswerDate(questionAnswers) : null;
            const questionAnswersInfo: IQuestionAnswersObj = {
                question: questionFromArr,
                answers: questionAnswers,
                answersNumber: questionAnswers.length,
                latestAnswerDate: latestAnswerDate ? new Date(latestAnswerDate) : null,
            };

            return questionAnswersInfo;
        });
    }
}
