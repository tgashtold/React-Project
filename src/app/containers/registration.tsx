import React from 'react';
import User from '../models/User';
import RegistrationForm from '../modules/users/components/registration-form';
import { UsersApi } from '../api/users.api';
import { LSService } from '../services/LS-service';

interface IRegistrationProps {}
interface IRegistrationState {
	model: User;
}

class Registration extends React.Component<IRegistrationProps, IRegistrationState> {
	constructor(props: IRegistrationProps) {
		super(props);
		this.state = {
			model: new User()
		};
	}

	handleFormSubmit = (user: User) => {
		this.setState({ model: user });
		UsersApi.addUser(user);
		LSService.addUserIdToLS(user.id);
	};

	render() {
		return (
			<div className="registration-wrapper">
				<h1 className="registration__head">Registration form</h1>
				<RegistrationForm onSubmit={this.handleFormSubmit} user={this.state.model} formBtnTitle={'Register'} />
			</div>
		);
	}
}

export default Registration;
