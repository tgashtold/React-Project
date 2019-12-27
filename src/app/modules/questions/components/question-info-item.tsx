import React from 'react';

interface IQuestionInfoItemProps {
	infoItemTitle: string;
	infoItemValue: any;
}

interface IQuestionInfoItemState {}

export class QuestionInfoItem extends React.Component<IQuestionInfoItemProps, IQuestionInfoItemState> {
	render() {
		return (
			<div className="question-info">
				<span className="question-info__title">{this.props.infoItemTitle}:</span>
				<span className="question-info__value">{this.props.infoItemValue}</span>
			</div>
		);
	}
}
