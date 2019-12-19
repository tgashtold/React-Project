import React from 'react';
import QuestionTemplate from '../modules/questions/components/question-template';
import Question from '../models/Question';
import { QuestionsApi } from '../api/questions.api';
import { AnswersApi } from '../api/answers.api';
import { IQuestionAnswersObj } from '../Utils/Interfaces';


interface IQuestionListProps {}

interface IQuestionListState {
questionsAndAnswersInfoArr: Array<IQuestionAnswersObj>,
}

class QuestionList extends React.Component<IQuestionListProps, IQuestionListState> {
	constructor(props: IQuestionListProps) {
		super(props);
		this.state = {
			questionsAndAnswersInfoArr: [],
				};
	}
	
	componentWillMount() {
		QuestionsApi.getQuestions()
		.then((questions: Array<Question>) => {
			AnswersApi.getQuestionAnswersInfoArr(
				questions
			).then((questionsAnswersObjArr: Array<IQuestionAnswersObj>) => {
				this.setState({ questionsAndAnswersInfoArr: questionsAnswersObjArr });
			});
		})
	
	}

	render() {


		return (
			<div className="questions">
				<h1 className="questions__head">Questions List</h1>
				{this.state.questionsAndAnswersInfoArr.map((questionAndAnswersInfo: IQuestionAnswersObj) => (
					<QuestionTemplate
					key={questionAndAnswersInfo.question.id}
					question = {questionAndAnswersInfo.question}
				answersCount={questionAndAnswersInfo.answersNumber}
				latestAnswerTime={questionAndAnswersInfo.latestAnswerDate}
						specificWrapperClass={'question-wrapper'}
						specificLinkClass={'question__link'}
						specificTitleClass={'question__title'}
					/>
				))}
			</div>
		);
	}
}

export default QuestionList;


