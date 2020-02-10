import {IQuestion, IQuestionInfo} from './question.model';
import {QuestionService} from './question.service';
import {api} from '../common';
import {ServerError} from "../../services";

export class QuestionsApi {
    static tagNameForAllQuestions: string = 'all';

    static async addQuestion(questionInfo: IQuestion): Promise<any> {
        try {
            const response = await api.post('question/create', questionInfo);
            const question: IQuestionInfo = QuestionService.adoptQuestionDates(response.data);

            return question;
        } catch (error) {
            if (error instanceof ServerError) {
                throw new Error(error.message);
            }

            throw new Error('Error! Failed to create question. Please try again');
        }
    }

    static async getActiveQuestions(): Promise<any> {
        try {
            const response = await api.get('question/all');
            const questions: IQuestionInfo[] = QuestionService.adoptQuestionsDates(response.data);

            return QuestionService.sortQuestionsByLatestCreationAndAnswerDate(questions);
        } catch (error) {
            if (error instanceof ServerError) {
                throw new Error(error.message);
            }

            throw new Error('Failed to load questions');
        }
    }

    static async getQuestionsTags(): Promise<any> {
        try {
            const response = await api.get('question/tags');

            return [this.tagNameForAllQuestions, ...response.data.sort()];
        } catch (error) {
            if (error instanceof ServerError) {
                throw new Error(error.message);
            }

            throw new Error('Unable to load hashtags');
        }
    }

    static async getQuestionsByTag(tag: string): Promise<any> {
        try {
            const response = await api.get(`question/filtered/${tag}`);
            const questions: IQuestionInfo[] = QuestionService.adoptQuestionsDates(response.data);

            return QuestionService.sortQuestionsByLatestCreationAndAnswerDate(questions);
        } catch (error) {
            if (error instanceof ServerError) {
                throw new Error(error.message);
            }

            throw new Error('Failed to load questions');
        }

    }

    static async searchQuestionsByTitle(searchText: string): Promise<any> {
        try {
            if (searchText.trim().length === 0) {
                return await this.getActiveQuestions();
            }

            const response = await api.get(`question/search/${searchText}`);
            const questions: IQuestionInfo[] = QuestionService.adoptQuestionsDates(response.data);

            return QuestionService.sortQuestionsByLatestCreationAndAnswerDate(questions);
        } catch (error) {
            if (error instanceof ServerError) {
                throw new Error(error.message);
            }

            throw new Error('Failed to load questions');
        }

    }
}
