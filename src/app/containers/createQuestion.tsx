import React from 'react';
import { FormWrapper } from '../modules/common';
import { QuestionForm, createQuestion } from '../modules/questions';
import { IUserInfo } from '../modules/users/user.model';
import { increaseQuestionsQtyInUserRating } from '../modules/users';
import { IAppState } from '../state';
import { Redirect } from 'react-router-dom';
import RoutesConfig from '../config/Routes.config';
import { connect } from 'react-redux';
import { IQuestion } from '../modules/questions/question.model';
import loader from '../../assets/images/loader.gif';

interface ICreateQuestionStateProps {
	user: IUserInfo | null;
	isQuestionCreating: boolean;
}

interface ICreateQuestionDispatchProps {
	createQuestion: (questionInfo: IQuestion) => any;
	increaseQuestionsQtyInUserRating: (userId: string) => any;
}

interface ICreateQuestionProps extends ICreateQuestionDispatchProps, ICreateQuestionStateProps {}

interface ICreateQuestionState {}

class CreateQuestion extends React.Component<ICreateQuestionProps, ICreateQuestionState> {
	handleQuestionFormSubmit = (newQuestion: IQuestion) => {
		if (this.props.user) {
			this.props.createQuestion({ ...newQuestion, author: this.props.user });
			this.props.increaseQuestionsQtyInUserRating(this.props.user.id);
		}
	};

	render() {
		return (
			<FormWrapper formTitle={'Create a question'}>
				{!this.props.user 
					? <Redirect to={`${RoutesConfig.routes.mainPage}`} /> 
					: ''}
				{this.props.isQuestionCreating 
					? <img src={loader} alt="Loading ..." /> 
					: <QuestionForm onSubmit={this.handleQuestionFormSubmit} />
				}
				{this.props.isQuestionCreating 
					? <Redirect to={`${RoutesConfig.routes.questionsList}`} /> 
					: ''}
			</FormWrapper>
		);
	}
}

const mapStateToProps = (state: IAppState): ICreateQuestionStateProps => {
	return {
		user: state.user.user,
		isQuestionCreating: state.questions.isDataLoading
	};
};

const mapDispatchToProps = (dispatch: any): ICreateQuestionDispatchProps => {
	return {
		increaseQuestionsQtyInUserRating: (userId: string) => dispatch(increaseQuestionsQtyInUserRating.call(userId)),
		createQuestion: (question: IQuestion) => dispatch(createQuestion.call(question))
	};
};

export const CreateQuestionPage = connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);
