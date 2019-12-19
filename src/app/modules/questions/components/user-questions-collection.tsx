import React from 'react';
import QuestionTemplate from './question-template';
import {IQuestionAnswersObj} from '../../../Utils/Interfaces'



interface IUserQuestionsCollectionProps {
questionAnswersDetailsArr:Array<IQuestionAnswersObj>
}

interface IUserQuestionsCollectionState {}

class UserQuestionsCollection extends React.Component<IUserQuestionsCollectionProps, IUserQuestionsCollectionState> {
	render() {
		const questionsTemplatesCollection: Array<any> = this.props.questionAnswersDetailsArr.map((detailsArr: IQuestionAnswersObj) => (
			<QuestionTemplate key={detailsArr.question.author.id} answersCount={detailsArr.answersNumber} latestAnswerTime={detailsArr.latestAnswerDate} question={detailsArr.question} />
		));

		return (
			<div className="user-questions">
				{questionsTemplatesCollection.length > 0
				 	? questionsTemplatesCollection
				 	: <p className="info-message">no questions</p>
				 }
			</div>
		);
	}
}

export default UserQuestionsCollection;
