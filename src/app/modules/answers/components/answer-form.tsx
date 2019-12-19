import React from 'react';
import InputLabelWrapper from '../../common/components/input-label-wrapper';
import User from '../../../models/User';
import Answer from '../../../models/Answer';
import Question from '../../../models/Question';
import TextArea from '../../common/components/textarea';
import { AnswersApi } from '../../../api/answers.api';
import { UsersApi } from '../../../api/users.api';


interface IAnswerFormProps {
	question: Question;
	user: User;
	addAnswer: () => void;
}

interface IAnswerFormState {
	isAnswer: boolean;
	answerValue: string;
}

class AnswerForm extends React.Component<IAnswerFormProps, IAnswerFormState> {
	model: Answer = new Answer(this.props.user, this.props.question);
	user: User = this.props.user;

	constructor(props: IAnswerFormProps) {
		super(props);
		this.state = {
			isAnswer: false,
			answerValue: ''
		};
	}

	isAnswerEntered = (value: boolean) => {
		this.setState({ isAnswer: value });
	};

	getAnswerValue = (answer: string) => {
		this.setState({ answerValue: answer });
	};

	handleAddBtnClick = () => {
		this.model.text = this.state.answerValue;
		this.user.rating.answersTotal = +1;
		AnswersApi.addAnswer(this.model);
    UsersApi.changeUser(this.user);
		this.props.addAnswer();
	};

	render() {
		return (
			<div className="answer-form__wrapper">
				<form
					className="answer-form"
					onKeyPress={(event) => {
						if (event.key === 'Enter') {
							event.preventDefault();
						}
					}}
					action=""
				>
					<InputLabelWrapper
						labelSpecificClassName={'answer-form__title'}
						isRequiredField={false}
						labelText={'Add your answer'}
					>
						<TextArea
							isValid={this.isAnswerEntered}
							sendEnteredValue={this.getAnswerValue}
							specificaAreaClassName={'question-description'}
							rowsQty={9}
							maxLength={800}
							placeholderValue={'Enter your answer...'}
						/>
					</InputLabelWrapper>

					<button disabled={!this.state.isAnswer} onClick={this.handleAddBtnClick} className="button">
						Add answer
					</button>
				</form>
			</div>
		);
	}
}

export default AnswerForm;
