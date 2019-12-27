import React from 'react';
import { IQuestionInfo } from '../modules/questions/question.model';
import { AuthorShortInfo, UserServices, increaseAnswersQtyInUserRating } from '../modules/users';
import { IUserInfo } from '../modules/users/user.model';
import { CreationDate } from '../modules/common';
import {
	AnswerForm,
	AnswerListTemplate,
	createAnswer,
	acceptAnswer,
	addLikeToAnswer,
	getQuestionAndAnswersByQuestionId
} from '../modules/answers';
import { IAddLikeArgs, IAnswer, IAnswerInfo } from '../modules/answers/answer.model';
import { RouteService } from '../services';
import { connect } from 'react-redux';
import { IAppState } from '../state';
import { RouteComponentProps } from 'react-router-dom';
import loader from '../../assets/images/loader.gif';

interface IAnswersParams {
	id: string;
}

interface IAnswersStateProps {
	user: IUserInfo | null;
	currentQuestion: IQuestionInfo | null;
	answers: Array<IAnswerInfo>;
	isQuestionExist: boolean;
	isDataLoading: boolean;
}

interface IAnswersDispatchProps {
	createAnswer: (answer: IAnswer) => any;
	acceptAnswer: (answerId: string) => any;
	getQuestionAndAnswers: (questionId: string) => any;
	addLikeToAnswer: (likeData: IAddLikeArgs) => any;
	addAnswerToUserRating: (userId: string) => any;
}

interface IAnswersProps extends IAnswersDispatchProps, IAnswersStateProps {}

interface IAnswersState {}

class Answers extends React.Component<RouteComponentProps<IAnswersParams> & IAnswersProps, IAnswersState> {
	componentWillMount() {
		this.props.getQuestionAndAnswers(this.props.match.params.id);
	}

	handleLikeClick = (answer: IAnswerInfo) => {
		if (this.props.user && !UserServices.isUserLikedAnswer(this.props.user, answer) && !UserServices.isUserAndAnswerAuthorEqual(this.props.user, answer)) {
			this.props.addLikeToAnswer({ answerId: answer.id, user: this.props.user });
		}
	};

	handleAcceptBtnClick = (answer: IAnswerInfo) => {
		this.props.acceptAnswer(answer.id);
	};

	handleAnswerFormSubmit = (answer: IAnswer) => {
		if (this.props.user && this.props.currentQuestion) {
			this.props.createAnswer({ ...answer, author: this.props.user, question: this.props.currentQuestion });
			this.props.addAnswerToUserRating(this.props.user.id);
		}
	};

	render() {
		!this.props.isQuestionExist && RouteService.redirectToErrorPage();

		return (
			<div className="answers-box">
				{this.props.isDataLoading && <img src={loader} alt="Loading ..." />}
				{!this.props.isDataLoading && this.props.currentQuestion && (
					<div className="question-details">
						<h1 className="question-details__title">{this.props.currentQuestion.title}</h1>
						<div className="details">
							<AuthorShortInfo author={this.props.currentQuestion.author} />
							<CreationDate date={this.props.currentQuestion.creationDate} />
						</div>
						<div className="question-details__description">{this.props.currentQuestion.description}</div>
					</div>
				)}
				<AnswerListTemplate
					answers={this.props.answers}
					user={this.props.user}
					handleLikesClick={this.handleLikeClick}
					handleAcceptBtnClick={this.handleAcceptBtnClick}
				/>
				{this.props.user && this.props.currentQuestion && !this.props.currentQuestion.isClosed 
					? <AnswerForm clearForm={this.props.isDataLoading} onSubmit={this.handleAnswerFormSubmit} />
					: null}
			</div>
		);
	}
}

const mapStateToProps = (state: IAppState): IAnswersStateProps => {
	return {
		user: state.user.user,
		currentQuestion: state.answers.currentQuestion,
		answers: state.answers.answers,
		isQuestionExist: state.answers.isQuestionExist,
		isDataLoading: state.answers.gettingAnswerData
	};
};

const mapDispatchToProps = (dispatch: any): IAnswersDispatchProps => {
	return {
		createAnswer: (answer: IAnswer) => dispatch(createAnswer.call(answer)),
		acceptAnswer: (answerId: string) => dispatch(acceptAnswer.call(answerId)),
		getQuestionAndAnswers: (questionId: string) => dispatch(getQuestionAndAnswersByQuestionId.call(questionId)),
		addLikeToAnswer: (likeData: IAddLikeArgs) => dispatch(addLikeToAnswer.call(likeData)),
		addAnswerToUserRating: (userId: string) => dispatch(increaseAnswersQtyInUserRating.call(userId))
	};
};

export const AnswersPage = connect(mapStateToProps, mapDispatchToProps)(Answers);
