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

    static adoptQuestionDates(questionFromDB: IQuestionInfo | any): IQuestionInfo | any {
        const question: IQuestionInfo | any = questionFromDB;
        question.creationDate = new Date(question.creationDate);
        if (question.latestAnswerDate) {
            question.latestAnswerDate = new Date(question.latestAnswerDate);
        }

        return question;
    }

    static adoptQuestionsDates(questionsFromDB: IQuestionInfo[]): IQuestionInfo[] {
        const questions: IQuestionInfo[] = questionsFromDB;

        questions.map((question: IQuestionInfo) => this.adoptQuestionDates(question));

        return questions;
    }

    static updateQuestionsInState(oldState: Array<IQuestionInfo>, questionToAdd: IQuestionInfo): Array<IQuestionInfo> {
        const updatedQuestionsState: Array<IQuestionInfo> = oldState.filter(
            (question: IQuestionInfo) => question.id !== questionToAdd.id
        );

        updatedQuestionsState.push(questionToAdd);

        return updatedQuestionsState;
    }
}
