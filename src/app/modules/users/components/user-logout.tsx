import React from 'react';
import { Link } from 'react-router-dom';
import RoutesConfig from '../../../config/Routes.config';
import ButtonLink from '../../common/components/button-link';
import User from '../../../models/User';
import Database from '../../../models/Database';
import {LSService} from '../../../services/LS-service';

interface IUserLogoutProps{}
interface IUserLogoutState{
 isLoggedIn:boolean
}

class UserLogout extends React.Component<IUserLogoutProps, IUserLogoutState>{
 user: User | null = this.getUser();
 state: any = {
	 isLoggedIn: !!this.user
	};

 handleClick = () => {
	 this.setState({
		 isLoggedIn: false
		});

	 LSService.deleteUserFromLS();
 }

 getUser(): User| null {
const userDataFromLS: string|null = window.localStorage.getItem('user')
const userId: string = userDataFromLS ? JSON.parse(userDataFromLS) : null;

if (!userId) return null;

return Database.users.find((user:User)=> user.id === userId);
 }

	render(){
		const userLoggedOutField = 	<React.Fragment>
	<Link className="user-name" to={this.user ? `${RoutesConfig.routes.userInfo.slice(0,-3)}${this.user.id}`: ''}>{`${this.user?.personalData.firstName} ${this.user?.personalData.lastName}`}</Link>
	<ButtonLink clickHandler={this.handleClick} buttonTitle={"Log out"} buttonRoute = {RoutesConfig.routes.mainPage} />
	</React.Fragment>;
	
	return (
						<div className="header__user-site">
							{this.state.isLoggedIn
							? userLoggedOutField 
							: <ButtonLink buttonTitle={"Log In"} buttonRoute = {RoutesConfig.routes.mainPage} /> }
								</div>
		);}
};

export default UserLogout;
