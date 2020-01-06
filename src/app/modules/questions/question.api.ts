import Database from '../../../data/Database';
import {IQuestion, IQuestionInfo, IUpdateQuestionAnswersArgs} from './question.model';
import {QuestionService} from './question.service';

export class QuestionsApi {
    static tagNameForAllQuestions: string = 'all';

    static async getActiveQuestions(): Promise<any> {
        const questions = await Database.questions;

        if (questions) {
            return await QuestionService.sortQuestionsByLatestCreationAndAnswerDate(questions);
        } else {
            throw new Error('Unable to load questions');
        }
    }

    static async getQuestionById(id: string): Promise<any> {
        return await Database.questions.find((question: IQuestionInfo) => question.id === id);
    }


    static async searchQuestionsByTitle(searchText: string): Promise<any> {
        const searchWordsArr = searchText.split(' ').map((word) => word.trim());

        const searchedQuestions: Array<IQuestionInfo> = await Database.questions.filter((question: IQuestionInfo) => {
            let isRequestRelevant: boolean = searchWordsArr.every((searchedWord: string) => {
                return new RegExp(searchedWord, 'gi').test(question.title);
            });

            if (isRequestRelevant) return question;
        });

        return QuestionService.sortQuestionsByLatestCreationAndAnswerDate(searchedQuestions);
    }

    static async getQuestionsTags(): Promise<any> {
        const questions: IQuestionInfo[] = Database.questions;
        const tags: string[] = [];
        for (let i = 0; i < questions.length; i++) {
            questions[i].hashTags.forEach((tag: string) => {
                const isMatch: boolean = tags.some((tagInTagArr: string) => tag.toLowerCase() === tagInTagArr.toLowerCase());
                !isMatch && tags.push(tag);
            })
        }
        return [this.tagNameForAllQuestions, ...tags.sort()];

    }

    static async getQuestionsByTag(tag: string): Promise<any> {
        if (tag.toLowerCase() === this.tagNameForAllQuestions) return QuestionService.sortQuestionsByLatestCreationAndAnswerDate(Database.questions);

        const questionsWithSearchedTag: IQuestionInfo[] = Database.questions.filter((question: IQuestionInfo) => {
            return question.hashTags.some((hashTag: string) => tag.toLowerCase() === hashTag.toLowerCase())
        });
        return QuestionService.sortQuestionsByLatestCreationAndAnswerDate(questionsWithSearchedTag);

    }

    static async addNewQuestionAnswer(data: IUpdateQuestionAnswersArgs): Promise<any> {
        const questionToUpdate = await Database.questions.find(
            (question: IQuestionInfo) => data.questionId === question.id
        );

        questionToUpdate.latestAnswerDate = data.newAnswerDate;
        questionToUpdate.answersQty += 1;

        return this.changeQuestionInDbSync(questionToUpdate);
    }

    static addNewQuestionAnswerSync(data: IUpdateQuestionAnswersArgs): IQuestionInfo {
        const questionToUpdate = Database.questions.find((question: IQuestionInfo) => data.questionId === question.id);

        questionToUpdate.latestAnswerDate = data.newAnswerDate;
        questionToUpdate.answersQty += 1;

        return this.changeQuestionInDbSync(questionToUpdate);
    }

    static getQuestionsByAuthorId(id: string): Array<IQuestionInfo> {
        const questions: Array<IQuestionInfo> = Database.questions.filter(
            (question: IQuestionInfo) => question.author.id === id
        );

        return questions;
    }

    static closeQuestionSync(id: string): IQuestionInfo {
        const questionToClose = Database.questions.find((question: IQuestionInfo) => question.id === id);

        questionToClose.isClosed = true;

        return this.changeQuestionInDbSync(questionToClose);
    }

    static async addQuestion(questionInfo: IQuestion): Promise<any> {
        const newQuestion: IQuestionInfo = {
            ...questionInfo,
            answersQty: 0,
            latestAnswerDate: null
        };
        newQuestion.id = Math.random().toString().slice(5, 15);

        const sendToDB = await Database.questions.push(newQuestion);

        if (sendToDB) {
            return newQuestion;
        } else {
            throw new Error('Unable to create new question');
        }
    }

    static async changeQuestion(changedQuestion: IQuestionInfo): Promise<any> {
        return this.changeQuestionInDbSync(changedQuestion);
    }

    static changeQuestionInDbSync(changedQuestion: IQuestionInfo): IQuestionInfo {
        Database.questions = Database.questions.filter((question: IQuestionInfo) => question.id !== changedQuestion.id);
        Database.questions.push(changedQuestion);

        return changedQuestion;
    }
}
