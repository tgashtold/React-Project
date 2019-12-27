import { IAnswerInfo } from './answer.model';

export class AnswerServices {
	static sortAnswersByCreationDate(answers: Array<IAnswerInfo>): Array<IAnswerInfo> {
		const length = answers.length;

		for (let i = 0; i < length - 1; i++) {
			for (let j = 0; j < length - 1 - i; j++) {
					if (
          answers[j].creationDate < answers[j+1].creationDate
				) {
					let temp = answers[j];
					answers[j] = answers[j + 1];
					answers[j + 1] = temp;
				}
			}
		}
		return answers;
	}

}
