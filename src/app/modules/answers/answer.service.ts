import {IAnswerInfo} from './answer.model';

export class AnswerService {
    static adoptAnswersDate(answers: IAnswerInfo[]) {
        return answers.map((answerToChange: IAnswerInfo) => {
            const answer: IAnswerInfo = answerToChange;
            answer.creationDate = new Date(answer.creationDate);
            return answer;
        });
    }

    static updateAnswerInAnswersArr(answersArr: Array<IAnswerInfo>, updatedAnswer: IAnswerInfo): Array<IAnswerInfo> {
        const updatedAnswers: Array<IAnswerInfo> = answersArr.map((answer: IAnswerInfo) => {
            if (answer.id === updatedAnswer.id) {
                return {...answer, ...updatedAnswer}
            } else {
                return answer;
            }
        });

        return updatedAnswers;
    }
}
