import {IQuestionInfo} from './question.model';

export class QuestionService {
    static sortQuestionsByLatestCreationAndAnswerDate(questions: Array<IQuestionInfo>): Array<IQuestionInfo> {
        return questions.sort(this.compareQuestionsDates);
    }

    static compareQuestionsDates(question2: IQuestionInfo, question1: IQuestionInfo,): number {
        if ((question1.creationDate < question2.creationDate && !question1.latestAnswerDate) ||
            (question1.creationDate < question2.creationDate &&
                question1.latestAnswerDate &&
                question1.latestAnswerDate < question2.creationDate) ||
            (question1.latestAnswerDate &&
                question2.latestAnswerDate &&
                question1.latestAnswerDate < question2.latestAnswerDate) ||
            (!question1.latestAnswerDate &&
                question2.latestAnswerDate &&
                question2.latestAnswerDate > question1.creationDate)
        ) {
            return -1;
        } else {
            return 0;
        }
    }

    static updateQuestionsInState(oldState: Array<IQuestionInfo>, questionToAdd: IQuestionInfo): Array<IQuestionInfo> {
        const updatedQuestionsState: Array<IQuestionInfo> = oldState.filter(
            (question: IQuestionInfo) => question.id !== questionToAdd.id
        );

        updatedQuestionsState.push(questionToAdd);

        return updatedQuestionsState;
    }
}
