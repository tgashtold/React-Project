import React from 'react';
import Logo from './logo';
import Menu from './menu';
import UserLogout from '../../users/components/user-logout';

interface IHeader{

}

class Header extends React.Component<IHeader>{
	
	render(){
		return (
		<header className="header">
			<Logo />
			<Menu />
			<div className="header__user">
			<UserLogout/>
			</div>
		</header>
	);}
};

export default Header;
