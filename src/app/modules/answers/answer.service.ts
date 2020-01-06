import {IAnswerInfo} from './answer.model';

export class AnswerService {
    static sortAnswersByCreationDate(answers: Array<IAnswerInfo>): Array<IAnswerInfo> {
        return answers.sort(this.compareAnswersDates);
    }

    static compareAnswersDates(currentAnswer: IAnswerInfo, prevAnswer: IAnswerInfo) {
        if (prevAnswer.creationDate < currentAnswer.creationDate) return -1;
        if (prevAnswer.creationDate > currentAnswer.creationDate) return 1;
        return 0;
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
