import React from 'react';
import { QuestionTemplate, getQuestions } from '../modules/questions';
import { IQuestionInfo } from '../modules/questions/question.model';
import { connect } from 'react-redux';

interface IQuestionsListProps {
	questions: Array<IQuestionInfo>;
	getQuestions: () => Array<IQuestionInfo>;
}

interface IQuestionsListState {}

class QuestionsList extends React.Component<IQuestionsListProps, IQuestionsListState> {
	componentWillMount() {
        this.props.getQuestions();
     }

	getQuestionsTemplate = (): any => {
		return this.props.questions.map((question: IQuestionInfo) => (
			<QuestionTemplate
				key={question.id}
				question={question}
				specificWrapperClass={'question-wrapper'}
				specificLinkClass={'question__link'}
				specificTitleClass={'question__title'}
			/>
		));
	};
	render() {
		return (
			<div className="questions">
				<h1 className="questions__head">Questions List</h1>
				{this.props.questions.length > 0 ? (
					this.getQuestionsTemplate()
				) : (
					<p className="info-message">no questions</p>
				)}
			</div>
		);
	}
}

const mapStateToProps = (store: any) => {
	return {
		questions: store.questions.questions
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		getQuestions: () => dispatch(getQuestions.fetch())
	};
};

export const QuestionsListPage = connect(mapStateToProps, mapDispatchToProps)(QuestionsList);
