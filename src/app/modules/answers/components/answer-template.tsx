import React from 'react';
import { CreationDate, Button } from '../../common';
import { AnswerLikes } from '../../answers';
import { AuthorShortInfo, UserServices } from '../../users';
import { IUserInfo } from '../../users/user.model';
import { IAnswerInfo } from '../answer.model';
import { IQuestionInfo } from '../../questions/question.model';

interface IAnswerTemplateProps {
	answer: IAnswerInfo;
	user: IUserInfo | null;
	handleLikesClick: (answer: IAnswerInfo) => void;
	handleAcceptBtnClick: (answer: IAnswerInfo) => void;
	disableLike ?: boolean;
}

interface IAnswerTemplateState {}

export class AnswerTemplate extends React.Component<IAnswerTemplateProps, IAnswerTemplateState> {
	render() {
		const answer = this.props.answer;
		const question: IQuestionInfo = answer.question;

		return (
			<div className="answer-wrapper">
				<div className="details">
					<AuthorShortInfo author={answer.author} />
					<CreationDate date={answer.creationDate} />
				</div>
				<p className="answer">{answer.text}</p>
				<AnswerLikes disabled={this.props.disableLike} answer={answer} handleLikesClick={() => this.props.handleLikesClick(this.props.answer)} />
				{this.props.user && UserServices.isUserAndQuestionAuthorEqual(this.props.user, question) && !question.isClosed
					? (
						<Button
							clickHandler={() => this.props.handleAcceptBtnClick(this.props.answer)}
							buttonTitle={'Accept answer and close discussion'}
						/>
					)
					: null}
			</div>
		);
	}
}
