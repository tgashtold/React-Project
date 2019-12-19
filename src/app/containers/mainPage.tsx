import React from 'react';
import User from '../models/User';
import { UsersApi } from '../api/users.api';
import { LSService } from '../services/LS-service';
import RouteService from '../services/route-service';
import LoginForm from '../modules/users/components/login-form';

interface IMainPageProps {}

interface IMainPageState {
	isRegistered: boolean;
}

class MainPage extends React.Component<IMainPageProps, IMainPageState> {
	constructor(props: IMainPageProps) {
		super(props);
		this.state = {
			isRegistered: true
		};
	}

	handleSubmit = (email: string, password: string): void => {
		UsersApi.getUserByEmailAndPassword(email, password).then((userToAllowAccess: User) => {
			if (userToAllowAccess) {
				LSService.addUserIdToLS(userToAllowAccess.id);
				RouteService.redirectToUserInfoPage(userToAllowAccess.id);
				this.setState({ isRegistered: true });
			} else {
				this.setState({ isRegistered: false });
			}
		});
	};

	render() {
		return (
			<div className="login-wrapper">
				<h1 className="login__title">log in</h1>
				<LoginForm onSubmit={this.handleSubmit}>
					{!this.state.isRegistered && (
						<p className="error-message">Please enter correct password and/or e-mail</p>
					)}
				</LoginForm>
			</div>
		);
	}
}

export default MainPage;
