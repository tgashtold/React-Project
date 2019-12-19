import React from 'react';
import User from '../../../models/User';
import Answer from '../../../models/Answer';
import Question from '../../../models/Question';
import CreationDate from '../../common/components/creation-date';
import AuthorShortInfo from '../../users/components/author-short-info';
import { AnswersApi } from '../../../api/answers.api';
import { UsersApi } from '../../../api/users.api';


interface IAnswerTemplateProps {
	answer: Answer;
	loggedInUser: User | null;
	isAccepted: (value: boolean) => void;
}

interface IAnswerTemplateState {
	isAccepted: boolean;
	likesNumber: number;
}

class AnswerTemplate extends React.Component<IAnswerTemplateProps, IAnswerTemplateState> {
	answer: Answer = this.props.answer;
	user: User | null = this.props.loggedInUser;

	constructor(props: IAnswerTemplateProps) {
		super(props);
		this.state = {
			isAccepted: this.props.answer.isAccepted,
			likesNumber: this.props.answer.likes.quantity
		};
	}

	isUserLikedAnswer = (): boolean => {
		return !!this.props.answer.likes.users.find((user: User) => this.user && user.id === this.user.id);
	};

	isUserAndQuestionAuthorEqual = () => {
		return !!this.user && this.answer.question.author.id === this.user.id;
	};

	handleLikesClick = () => {
		if (this.user && !this.isUserLikedAnswer()) {
			const newLikesNumber = this.state.likesNumber + 1;

			this.setState({ likesNumber: newLikesNumber });

			this.answer.likes.quantity = newLikesNumber;
			this.answer.likes.users.push(this.user);
			this.answer.author.rating.answersLikedByOthers = this.answer.author.rating.answersLikedByOthers + 1;

			AnswersApi.changeAnswer(this.answer);
			UsersApi.changeUser(this.answer.author);
		}
	};

	handleAcceptBtnClick = () => {
		this.setState({ isAccepted: true });
		
		this.answer.isAccepted = true;
		this.answer.author.rating.answersAcceptedByOthers = this.answer.author.rating.answersAcceptedByOthers + 1;
		this.answer.question.isClosed = true;

		AnswersApi.changeAnswer(this.answer);
		UsersApi.changeUser(this.answer.author);

		this.props.isAccepted(true);
	};

	render() {
		const answer = this.props.answer;
		const question: Question = answer.question;

		return (
			<div className="answer-wrapper">
				<div className="details">
					<AuthorShortInfo author={this.answer.author} />
					<CreationDate date={this.answer.creationDate} />
				</div>
				<p className="answer">{answer.text}</p>
				<div className="answer-rating">
					<button onClick={this.handleLikesClick} className="answer-rating__button">
						Like
					</button>
					<span className="answer-rating__value">+ {answer.likes.quantity}</span>
				</div>
				{(this.isUserAndQuestionAuthorEqual() && !question.isClosed)
					? <button onClick={this.handleAcceptBtnClick} className="button">
						Accept answer and close discussion
					</button>
				  : null}
			</div>
		);
	}
}

export default AnswerTemplate;
