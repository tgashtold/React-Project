import React from 'react';
import InputLabelWrapper from '../modules/common/components/input-label-wrapper';
import TextArea from '../modules/common/components/textarea';
import ButtonLink from '../modules/common/components/button-link';
import User from '../models/User';
import Question from '../models/Question';
import Utils from '../Utils/Utils';
import RouteService from '../services/route-service';
import { UsersApi } from '../api/users.api';
import { QuestionsApi } from '../api/questions.api';

interface ICreateQuestionProps {}

interface ICreateQuestionState {
	user: User;
	isDescription: boolean;
	isTitle: boolean;
	questionTitle: string;
	questionDescription: string;
	model: Question;
}

class CreateQuestion extends React.Component<ICreateQuestionProps, ICreateQuestionState> {
	protected errorMessageForRegisterBtn: string = '';

	constructor(props: any) {
		super(props);
		this.state = {
			user: new User(),
			model: new Question(new User()),
			isDescription: false,
			isTitle: false,
			questionTitle: '',
			questionDescription: ''
		};
	}
	componentWillMount = () => {
		const registeredUserId = Utils.getUserIdFromLS();

		if (!registeredUserId) {
			RouteService.redirectToErrorPage();
		} else {
			UsersApi.getUserById(registeredUserId).then((userFromDB: User) =>
				this.setState({ user: userFromDB, model: new Question(userFromDB) })
			);
		}
	};

	isTitleEntered = (isTrue: boolean) => {
		this.setState({ isTitle: isTrue });
	};

	isDescriptionEntered = (isTrue: boolean) => {
		this.setState({ isDescription: isTrue });
	};

	getEnteredDescription = (description: string) => {
		this.setState({ questionDescription: description.trim() });
	};
	getEnteredTitle = (title: string) => {
		this.setState({ questionTitle: title.trim() });
	};

	areFieldsCorrectlyFilled = (): boolean => {
		const areCorrectlyFilled = this.state.isTitle && this.state.isDescription;

		return areCorrectlyFilled;
	};

	handleBtnClick = () => {
		if (this.areFieldsCorrectlyFilled()) {
			this.errorMessageForRegisterBtn = '';

			const question: Question = this.state.model;

			question.title = this.state.questionTitle;
			question.description = this.state.questionDescription;

			QuestionsApi.addQuestion(question);

			this.setState({ model: question });

			const questionAuthor: User = this.state.user;

			questionAuthor.rating.questionsTotal = +1;

			UsersApi.changeUser(questionAuthor);

			this.setState({ user: questionAuthor });

		} else {
			this.errorMessageForRegisterBtn = 'Please fill in all the fields.';
		}
	};

	render() {
		return (
			<div className="registration-wrapper">
				<h1 className="registration__head">Create a question</h1>
				<form className="registration-form" action="">
					<InputLabelWrapper isRequiredField={true} labelText={'Title'}>
						<TextArea
							isValid={this.isTitleEntered}
							sendEnteredValue={this.getEnteredTitle}
							specificaAreaClassName={'question-title'}
							rowsQty={3}
							maxLength={130}
							placeholderValue={'Enter short question title'}
						/>
					</InputLabelWrapper>

					<InputLabelWrapper isRequiredField={true} labelText={'Description'}>
						<TextArea
							sendEnteredValue={this.getEnteredDescription}
							isValid={this.isDescriptionEntered}
							specificaAreaClassName={'question-description'}
							rowsQty={9}
							maxLength={800}
							placeholderValue={'Enter question details'}
						/>
					</InputLabelWrapper>
					<span className="error-message">{this.errorMessageForRegisterBtn}</span>
					<ButtonLink
						clickHandler={this.handleBtnClick}
						buttonTitle={'Create'}
						buttonRoute={
							this.areFieldsCorrectlyFilled() ? (
								RouteService.getPathToAnswersPage(this.state.model.id)
							) : (
								'#'
							)
						}
					/>
				</form>
			</div>
		);
	}
}

export default CreateQuestion;
