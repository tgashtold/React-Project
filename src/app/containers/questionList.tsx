import React from 'react';
import { QuestionTemplate, getQuestions } from '../modules/questions';
import { ButtonLink } from '../modules/common';
import { IUserInfo } from '../modules/users/user.model';
import { IQuestionInfo } from '../modules/questions/question.model';
import { connect } from 'react-redux';
import RoutesConfig from '../config/Routes.config';
import { IAppState } from '../state';
import loader from '../../assets/images/loader.gif';

interface IQuestionsListStateProps {
	user: IUserInfo | null;
	questions: Array<IQuestionInfo>;
	isQuestionUploading: boolean;
}

interface IQuestionsListDispatchProps {
	getQuestions: () => Array<IQuestionInfo>;
}

interface IQuestionsListProps extends IQuestionsListStateProps, IQuestionsListDispatchProps {}

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

	renderQuestions = (): any => {
		return this.props.questions.length > 0 
			? this.getQuestionsTemplate() 
			: <p className="info-message">no questions</p>;
	};

	render() {
		return (
			<div className="questions">
				<h1 className="questions__head">Questions List</h1>
				{this.props.isQuestionUploading ? <img src={loader} alt="Loading ..." /> : this.renderQuestions()}
				{this.props.user 
					? (
						<div className="button-wrapper">
							<ButtonLink
								buttonTitle={'Create new question'}
								buttonRoute={RoutesConfig.routes.createQuestion}
							/>
						</div>
						) 
					: null}
			</div>
		);
	}
}

const mapStateToProps = (state: IAppState): IQuestionsListStateProps => {
	return {
		user: state.user.user,
		questions: state.questions.questions,
		isQuestionUploading: state.questions.isDataLoading
	};
};

const mapDispatchToProps = (dispatch: any): IQuestionsListDispatchProps => {
	return {
		getQuestions: () => dispatch(getQuestions.call())
	};
};

export const QuestionsListPage = connect(mapStateToProps, mapDispatchToProps)(QuestionsList);
