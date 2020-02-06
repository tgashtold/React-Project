import {IQuestion, IQuestionInfo} from './question.model';
import {QuestionService} from './question.service';

export class QuestionsApi {
    static tagNameForAllQuestions: string = 'all';

    static async addQuestion(questionInfo: IQuestion): Promise<any> {
        try {
            let response = await fetch('http://localhost:5000/question/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'x-access-token': localStorage.getItem('Authorization') || ''
                },
                body: JSON.stringify(questionInfo),
                credentials: 'include'
            });

            if (+response.status.toString().slice(0, 1) !== 2) {
                throw new Error('Error! Failed to create question. Please try again');
            }

            let result = await response.json();

            const question: IQuestionInfo = QuestionService.adoptQuestionDates(result);

            return question;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getActiveQuestions(): Promise<any> {
        try {
            let response = await fetch(`http://localhost:5000/question/all`,{
                credentials: 'include'
            });

            let result = await response.json();

            if (result.statusCode) {
                throw new Error(`Error ${result.statusCode}. ${result.message}`);
            }

            const questions: IQuestionInfo[] = QuestionService.adoptQuestionsDates(result);

            return QuestionService.sortQuestionsByLatestCreationAndAnswerDate(questions);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getQuestionsTags(): Promise<any> {
        try {
            let response = await fetch(`http://localhost:5000/question/tags`,{
                credentials: 'include'
            });

            let tags = await response.json();

            return [this.tagNameForAllQuestions, ...tags.sort()];
        } catch (error) {
            throw new Error('Unable to load hashtags');
        }
    }

    static async getQuestionsByTag(tag: string): Promise<any> {
        try {
            let response = await fetch(`http://localhost:5000/question/filtered/${tag}`,{
                credentials: 'include'
            });

            let result = await response.json();

            if (result.statusCode) {
                throw new Error(`Error ${result.statusCode}. ${result.message}`);
            }

            const questions: IQuestionInfo[] = QuestionService.adoptQuestionsDates(result);

            return QuestionService.sortQuestionsByLatestCreationAndAnswerDate(questions);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async searchQuestionsByTitle(searchText: string): Promise<any> {
        try {
            if (searchText.trim().length > 0) {
                let response = await fetch(`http://localhost:5000/question/search/${searchText}`,{
                    credentials: 'include'
                });

                let result = await response.json();

                if (result.statusCode) {
                    throw new Error(`Error ${result.statusCode}. ${result.message}`);
                }

                const questions: IQuestionInfo[] = QuestionService.adoptQuestionsDates(result);

                return QuestionService.sortQuestionsByLatestCreationAndAnswerDate(questions);
            }

            if (searchText.trim().length === 0) {
                return await this.getActiveQuestions();
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
