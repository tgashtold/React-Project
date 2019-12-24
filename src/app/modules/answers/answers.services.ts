import {Answer} from './';

export class AnswersServices {
    static findLatestAnswerDate(answersArr: Array<Answer>): number | null {
        if (answersArr.length === 0) return null;

        let latestAnswerTime: number = 0;

        for (let i = 0; i < answersArr.length; i++) {
            const time = new Date(answersArr[i].creationDate).getTime();

            if (latestAnswerTime < time) {
                latestAnswerTime = time;
            }
        }

        return latestAnswerTime;
    }
};
