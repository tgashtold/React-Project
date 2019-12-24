import React from 'react';
import {Link} from 'react-router-dom';
import RoutesConfig from '../../../config/Routes.config';
import {Button, ButtonLink} from '../../common';
import {User} from '../../users';
import Database from '../../../../data/Database';
import {LSService} from '../../../services/LS-service';
import {RouteService} from '../../../services';

interface IUserLogoutProps {
}

interface IUserLogoutState {
    isLoggedIn: boolean
}

export class UserLogout extends React.Component<IUserLogoutProps, IUserLogoutState> {
    user: User | null = this.getUser();
    state: any = {
        isLoggedIn: !!this.user
    };

    handleClick = () => {
        this.setState({
            isLoggedIn: false
        });

        LSService.deleteUserFromLS();
        RouteService.redirectToMainPage();
    }

    getUser(): User | null {
        const userDataFromLS: string | null = window.localStorage.getItem('user')
        const userId: string = userDataFromLS ? JSON.parse(userDataFromLS) : null;

        if (!userId) return null;

        return Database.users.find((user: User) => user.id === userId);
    }

    getUserLogInTemplate = () => {
        return <ButtonLink buttonTitle={"Log In"} buttonRoute={RoutesConfig.routes.mainPage}/>;
    };

    getUserLogOutTemplate = () => {
        return <React.Fragment>
            <Link className="user-name"
                  to={this.user ? `${RoutesConfig.routes.userInfo.slice(0, -3)}${this.user.id}` : ''}>{`${this.user?.personalData.firstName} ${this.user?.personalData.lastName}`}</Link>
            <Button clickHandler={this.handleClick} buttonTitle={'Log out'}/>
        </React.Fragment>;
    };

    render() {
        return (
            <div className="header__user-site">
                {this.state.isLoggedIn
                    ? this.getUserLogOutTemplate()
                    : this.getUserLogInTemplate()}
            </div>
        );
    }
};

