import React from 'react';
import User from '../../../models/User';
import Answer from '../../../models/Answer';
import AnswerTemplate from '../../answers/components/answer-template';

interface IAnswersListProps {
	answers: Array<Answer>;
	user: User | null;
	isAccepted: (value: boolean) => void;
}

class AnswerListTemplate extends React.Component<IAnswersListProps> {
	getAnswersTemplates = (): any => {
		const answersTemplatesArr: Array<any> = this.props.answers.map((questionAnswer: Answer) => (
			<AnswerTemplate
				key={questionAnswer.id}
				loggedInUser={this.props.user}
				answer={questionAnswer}
				isAccepted={this.props.isAccepted}
			/>
		));

		return answersTemplatesArr;
	};

	render() {
		const answersTemplatesArr = this.getAnswersTemplates();

		return (
			<div className="answers">
				{answersTemplatesArr.length > 0 ? answersTemplatesArr : <p className="info-message">no answers</p>}
			</div>
		);
	}
}

export default AnswerListTemplate;
