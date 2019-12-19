import React from 'react';
import { Link } from 'react-router-dom';
import RoutesConfig from '../../../config/Routes.config';
import Question from '../../../models/Question';

interface IQuestionTemplateProps {
	question: Question;
	answersCount: number;
	latestAnswerTime: number | Date | null;
	specificWrapperClass?: string;
	specificLinkClass?: string;
	specificTitleClass?: string;
}

interface IQuestionTemplateState {}

class QuestionTemplate extends React.Component<IQuestionTemplateProps, IQuestionTemplateState> {
	render() {
		const lastAnswerTime: Date | number | null = this.props.latestAnswerTime;

		return (
			<details className={`user-question__wrapper ${this.props.specificWrapperClass || ''}`}>
				<summary className={`user-question__title ${this.props.specificTitleClass || ''}`}>
					<Link
						className={`user-question__link ${this.props.specificLinkClass || ''}`}
						to={`${RoutesConfig.routes.answers.slice(0, -3)}${this.props.question.id}`}
					>
						{this.props.question.title}
					</Link>
					<div className="question-info__wrapper">
						<div className="question-info">
							<span className="question-info__title">Total answers:</span>
							<span className="question-info__value">{this.props.answersCount}</span>
						</div>
						<div className="question-info">
							<span className="question-info__title">Latest answer:</span>
							<span className="question-info__value">
								{lastAnswerTime 
									? `${new Date(lastAnswerTime).toLocaleDateString()} ${new Date(lastAnswerTime).toLocaleTimeString()}`
									: '-'}
							</span>
						</div>
						<div className="question-info">
							<span className="question-info__title">Creation:</span>
							<span className="question-info__value">{`${new Date(
								this.props.question.creationDate
							).toLocaleDateString()} ${new Date(
								this.props.question.creationDate
							).toLocaleTimeString()}`}</span>
						</div>
					</div>
				</summary>
				<p className="user-question__description"> {this.props.question.description}</p>
			</details>
		);
	}
}

export default QuestionTemplate;
