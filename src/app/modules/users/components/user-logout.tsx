import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import RoutesConfig from '../../../config/Routes.config';
import {Button, ButtonLink} from '../../common';
import {IUserInfo} from '../user.model';
import {RouteService} from '../../../services/route-service';

interface IUserLogoutProps {
    user: IUserInfo | null;
    onLogOut: () => any;
}

interface IUserLogoutState {
}

export class UserLogout extends React.Component<IUserLogoutProps, IUserLogoutState> {
    handleLogOutClick = () => {
        this.props.onLogOut();
    };

    getUserLogInTemplate = () => {
        return (
            <React.Fragment>
                <Redirect to={`${RoutesConfig.routes.mainPage}`}/>
                <ButtonLink buttonTitle={'Log In'} buttonRoute={RoutesConfig.routes.mainPage}/>
            </React.Fragment>
        );
    };

    getUserLogOutTemplate = () => {
        if (this.props.user) {
            return (
                <React.Fragment>
                    <Link
                        className="user-name"
                        to={this.props.user
                            ? `${RouteService.getPathToUserInfoPage()}${this.props.user.id}`
                            : ''}
                    >{`${this.props.user.personalData.firstName} ${this.props.user.personalData.lastName}`}</Link>
                    <Button clickHandler={this.handleLogOutClick} buttonTitle={'Log out'}/>
                </React.Fragment>
            );
        }
    };

    render() {
        return (
            <div className="header__user-site">
                {this.props.user
                    ? this.getUserLogOutTemplate()
                    : this.getUserLogInTemplate()}
            </div>
        );
    }
}
