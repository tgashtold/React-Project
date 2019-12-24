import {Question} from '../../questions';
import {Answer} from '..';

export interface IQuestionAnswersObj {
    question: Question;
    answers: Array<Answer>;
    answersNumber: number;
    latestAnswerDate: Date | null;
}
