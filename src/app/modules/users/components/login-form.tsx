import React from 'react';
import RoutesConfig from '../../../config/Routes.config';
import { ButtonLink, Button, InputEmail, InputPassword } from '../../../modules/common';
import { IChangedEventArgs } from '../../common';
import { IUserLogInArgs } from '../../users/user.model';

interface ILogInFormProps {
	onSubmit: (userLogInData: IUserLogInArgs) => void;
}

interface ILogInFormState {}

export class LogInForm extends React.Component<ILogInFormProps, ILogInFormState | any> {
	protected inputsNames = {
		email: 'UserEmail',
		password: 'UserPassword'
	};

	constructor(props: ILogInFormProps) {
		super(props);
		this.state = {
			[this.inputsNames.email]: {},
			[this.inputsNames.password]: {}
		};
	}

	isLoggedInBtnDisabled = () => {
		return !this.isFormValid();
	};

	isFormValid(): boolean {
		return this.state[this.inputsNames.email].isValid && this.state[this.inputsNames.password].isValid;
	}

	handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (this.isFormValid()) {
			this.props.onSubmit({
				email: this.state[this.inputsNames.email].value,
				password: this.state[this.inputsNames.password].value
			});
		}
	};

	inputChangesHandler = (requiredData: IChangedEventArgs): void => {
		this.setState({ [`${requiredData.name}`]: requiredData });
	};

	render() {
		return (
			<form className="login__form" onSubmit={(e) => this.handleFormSubmit(e)} action="">
				<InputEmail name={this.inputsNames.email} onChanged={this.inputChangesHandler} />
				<InputPassword name={this.inputsNames.password} onChanged={this.inputChangesHandler} />
				{this.props.children}
				<div className="buttons-wrapper">
					<Button disabled={this.isLoggedInBtnDisabled()} buttonTitle={'Log In'} />
					<ButtonLink buttonTitle={'Register'} buttonRoute={RoutesConfig.routes.registration} />
				</div>
			</form>
		);
	}
}
