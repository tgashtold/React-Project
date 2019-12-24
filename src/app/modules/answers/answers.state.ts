import {IAnswer, IAnswerLikes} from "./answer.model";
import {User} from '../users';
import {Question} from "../questions";
import {IQuestionAnswersObj, AnswersApi} from '../answers';


export interface IAnswers{
  questionAnswers: Array<IAnswer>;
  allQuestionAnswersInfo: Array<IQuestionAnswersObj>;
  userQuestionAnswersInfo: Array<IQuestionAnswersObj>;
}
export const defaultAnswersState: IAnswers= {
  questionAnswers: [],
  allQuestionAnswersInfo: [],
  userQuestionAnswersInfo: [],
};

