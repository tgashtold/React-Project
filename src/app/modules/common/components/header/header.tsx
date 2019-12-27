import React from 'react';
import { Logo } from './logo';
import { Menu } from './menu';
import { UserLogout } from '../../../users';
import { IUserInfo } from '../../../users/user.model';

interface IHeader {
	user: IUserInfo | null;
	onLogOut: () => any;
}

export class Header extends React.Component<IHeader> {
	render() {
		return (
			<header className="header">
				<Logo />
				<Menu />
				<div className="header__user">
					<UserLogout onLogOut={this.props.onLogOut} user={this.props.user} />
				</div>
			</header>
		);
	}
}
