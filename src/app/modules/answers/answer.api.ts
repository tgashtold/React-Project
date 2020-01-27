import {
    IAddLikeArgs,
    IAnswer,
    IGetAswersFromPositionArgs,
    IGetQuestionAndAswersArgs,
    IAcceptAnswerResponse, IAnswerInfo
} from './answer.model';
import {AnswerService} from './answer.service'

export class AnswerApi {
    static async acceptAnswerByIdAndUpdateQuestion(answerId: string): Promise<any> {
        try {
            const response = await fetch('http://localhost:5000/answer/accept', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'x-access-token': localStorage.getItem('Authorization') || ''
                },
                body: JSON.stringify({id: answerId}),
            });

            let result: IAcceptAnswerResponse = await response.json();

            result.currentQuestion.creationDate = new Date(result.currentQuestion.creationDate);
            result.updatedAnswer.creationDate = new Date(result.updatedAnswer.creationDate);

            return result;
        } catch (error) {
            throw new Error('Error! Unable to accept answer. Please try again');
        }
    }

    static async addLikeToAnswerAndUpdateQuestionAndAnswers(args: IAddLikeArgs): Promise<any> {
        try {
            const response = await fetch('http://localhost:5000/answer/addLike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'x-access-token': localStorage.getItem('Authorization') || ''
                },
                body: JSON.stringify(args)
            });

            let result = await response.json();
            result.currentQuestion.creationDate = new Date(result.currentQuestion.creationDate);
            result.answers = AnswerService.adoptAnswersDate(result.answers);

            return result;
        } catch (error) {
            throw new Error('Error! Unable to add like. Please try again');
        }
    }

    static async addAnswer(answer: IAnswer): Promise<any> {
        try {
            const response = await fetch('http://localhost:5000/answer/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'x-access-token': localStorage.getItem('Authorization') || ''
                },
                body: JSON.stringify(answer)
            });

            let newAnswer = await response.json();
            newAnswer.creationDate = new Date(newAnswer.creationDate);

            return newAnswer;
        } catch (error) {
            throw new Error('Error! Unable to create answer.');
        }
    }

    static async getQuestionWithAnswersByQuestionId(requestData: IGetQuestionAndAswersArgs): Promise<any> {
        try {
            const response = await fetch(`http://localhost:5000/answer/get/${requestData.questionId}/${requestData.answersCountPerPage}`);

            let result = await response.json();
            result.answers = AnswerService.adoptAnswersDate(result.answers);

            return result;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async getAnswersFromRequestedPosition(requestData: IGetAswersFromPositionArgs): Promise<any> {
        try {
            const response = await fetch(`http://localhost:5000/answer/get/${requestData.questionId}/${requestData.itemsCount}/${requestData.startNumber}`);

            let answers: IAnswerInfo[] = await response.json();
            answers = AnswerService.adoptAnswersDate(answers);

            return answers;
        } catch (error) {
            throw new Error('Error! Unable to load answers');
        }
    }
}
