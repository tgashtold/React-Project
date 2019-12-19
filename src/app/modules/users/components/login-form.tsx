import React from 'react';
import RoutesConfig from '../../../config/Routes.config';
import ButtonLink from '../../../modules/common/components/button-link';
import InputEmail from '../../../modules/common/components/input-email';
import InputPassword from '../../../modules/common/components/input-password';
import { IChangedEventArgs } from '../../../Utils/Interfaces';

interface IMainPageProps {
	onSubmit: (email: string, password: string) => void;
}

interface IMainPageState {
	isRegistered: boolean;
}

class MainPage extends React.Component<IMainPageProps, IMainPageState | any> {
	protected logInErrorMessage = '';
	protected inputsNames = {
		email: 'UserEmail',
		password: 'UserPassword'
	};

	constructor(props: IMainPageProps) {
		super(props);
		this.state = {
			isRegistered: true,
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

	handleLogInBtnClick = () => {
		if (this.isFormValid()) {
			this.props.onSubmit(this.state[this.inputsNames.email].value, this.state[this.inputsNames.password].value);
		}
	};

	inputChangesHandler = (requiredData: IChangedEventArgs): void => {
		this.setState({ [`${requiredData.name}`]: requiredData });
	};

	render() {
		return (
			<form className="login__form" action="">
				<InputEmail name={this.inputsNames.email} onChanged={this.inputChangesHandler} />
				<InputPassword name={this.inputsNames.password} onChanged={this.inputChangesHandler} />
				{this.props.children}
				<div className="buttons-wrapper">
					<ButtonLink
						buttonRoute={'#'}
						clickHandler={this.handleLogInBtnClick}
						disabled={this.isLoggedInBtnDisabled()}
						buttonTitle={'Log In'}
					/>
					<ButtonLink buttonTitle={'Register'} buttonRoute={RoutesConfig.routes.registration} />
				</div>
			</form>
		);
	}
}

export default MainPage;
