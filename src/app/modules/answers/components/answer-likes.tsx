import React from 'react';
import { IAnswerInfo } from '../answer.model';

interface IAnswerLikesProps {
	answer: IAnswerInfo;
	handleLikesClick: (answer: IAnswerInfo) => void;
}

interface IAnswerLikesState {}

export class AnswerLikes extends React.Component<IAnswerLikesProps, IAnswerLikesState> {
	render() {
		return (
			<div className="answer-rating">
				<button
					onClick={() => this.props.handleLikesClick(this.props.answer)}
					className="answer-rating__button"
				>
					Like
				</button>
				<span className="answer-rating__value">+ {this.props.answer.likes.quantity}</span>
			</div>
		);
	}
}
