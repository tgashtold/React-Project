import {
    IAddLikeArgs,
    IAnswer,
    IGetAswersFromPositionArgs,
    IGetQuestionAndAswersArgs,
} from './answer.model';
import {AnswerService} from './answer.service';
import {api} from '../common';

export class AnswerApi {
    static async acceptAnswerByIdAndUpdateQuestion(answerId: string): Promise<any> {
        try {
            const response = await api.post('answer/accept', {id: answerId});

            response.data.currentQuestion.creationDate = new Date(response.data.currentQuestion.creationDate);
            response.data.updatedAnswer.creationDate = new Date(response.data.updatedAnswer.creationDate);

            return response.data;
        } catch (error) {
            throw new Error('Error! Unable to accept answer. Please try again');
        }
    }

    static async addLikeToAnswerAndUpdateQuestionAndAnswers(args: IAddLikeArgs): Promise<any> {
        try {
            const response = await api.post('answer/addLike', args);

            response.data.currentQuestion.creationDate = new Date(response.data.currentQuestion.creationDate);
            response.data.answers = AnswerService.adoptAnswersDate(response.data.answers);

            return response.data;
        } catch (error) {
            throw new Error('Error! Unable to add like. Please try again');
        }
    }

    static async addAnswer(answer: IAnswer): Promise<any> {
        try {
            const response = await api.post('answer/create', answer);

            response.data.creationDate = new Date(response.data.creationDate);

            return response.data;
        } catch (error) {
            throw new Error('Error! Unable to create answer.');
        }
    }

    static async getQuestionWithAnswersByQuestionId(requestData: IGetQuestionAndAswersArgs): Promise<any> {
        try {
            const response = await api.get(`answer/get/${requestData.questionId}/${requestData.answersCountPerPage}`);

            response.data.answers = AnswerService.adoptAnswersDate(response.data.answers);

            return response.data;
        } catch (error) {
            throw new Error('Falied to load answers. Please reload the page.');
        }
    }

    static async getAnswersFromRequestedPosition(requestData: IGetAswersFromPositionArgs): Promise<any> {
        try {
            const response = await api.get(
                `answer/get/${requestData.questionId}/${requestData.itemsCount}/${requestData.startNumber}`
            );

            response.data = AnswerService.adoptAnswersDate(response.data);

            return response.data;
        } catch (error) {
            throw new Error('Error! Unable to load answers');
        }
    }
}
