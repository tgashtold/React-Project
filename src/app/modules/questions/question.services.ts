import { IQuestionInfo } from './question.model';

export class QuestionServices {
	static sortQuestionsByLatestCreationAndAnswerDate(questions: Array<IQuestionInfo>): Array<IQuestionInfo> {
		const length = questions.length;

		for (let i = 0; i < length - 1; i++) {
			for (let j = 0; j < length - 1 - i; j++) {
				const currentQuestionDate = questions[j].creationDate;
				const currentQuestionAnswerDate: Date | null = questions[j].latestAnswerDate;
				const nextQuestionDate = questions[j + 1].creationDate;
				const nextQuestionAnswerDate: Date | null = questions[j + 1].latestAnswerDate;

				if (
					currentQuestionDate < nextQuestionDate ||
					(currentQuestionAnswerDate &&
						nextQuestionAnswerDate &&
						currentQuestionAnswerDate < nextQuestionAnswerDate) ||
					(!currentQuestionAnswerDate &&
						nextQuestionAnswerDate &&
						nextQuestionAnswerDate > currentQuestionDate)
				) {
					let temp = questions[j];
					questions[j] = questions[j + 1];
					questions[j + 1] = temp;
				}
			}
		}

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
