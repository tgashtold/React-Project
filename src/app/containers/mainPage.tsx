import React, {Fragment} from 'react';
import {LogInForm, UserWelcomeMessage, userActions} from '../modules/users';
import {IUserInfo, IUserLogInArgs} from '../modules/users/user.model';
import {connect} from 'react-redux';
import {IAppState} from '../state';
import loader from '../../assets/images/loader.gif';

interface IMainPageStateProps {
    user: IUserInfo | null;
    isRegistered: boolean | null;
    isDataLoading: boolean;
}

interface IMainPageDispatchProps {
    logInUser: (userLogInData: IUserLogInArgs) => any;
}

interface IMainPageProps extends IMainPageDispatchProps, IMainPageStateProps {
}

interface IMainPageState {
}

class HomePage extends React.Component<IMainPageProps, IMainPageState> {
    handleSubmit = (userDataForLogIn: IUserLogInArgs): void => {
        this.props.logInUser(userDataForLogIn);
    };

    getUserWelcomeTemplate = (user: IUserInfo) => {
        return (
            <UserWelcomeMessage userFirstName={user.personalData.firstName} userLastName={user.personalData.lastName}/>
        );
    };

    getLogInTemplate = () => {
        return (
            <Fragment>
                <h1 className="login__title">log in</h1>
                <LogInForm onSubmit={this.handleSubmit}>
                    {this.props.isRegistered === false
                        ? <p className="error-message">Please enter correct password and/or e-mail</p>
                        : null}
                </LogInForm>
            </Fragment>
        );
    };

    render() {
        return (
            <div className="login-wrapper">
                {this.props.isDataLoading && <img src={loader} alt="Loading ..."/>}
                {this.props.isRegistered === true && this.props.user && !this.props.isDataLoading
                    ? this.getUserWelcomeTemplate(this.props.user)
                    : this.getLogInTemplate()
                }
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState): IMainPageStateProps => {
    return {
        user: state.user.user,
        isRegistered: state.user.isRegistered,
        isDataLoading: state.user.isUserCreating
    };
};

const mapDispatchToProps = (dispatch: any): IMainPageDispatchProps => {
    return {
        logInUser: (userLogInData: IUserLogInArgs) => dispatch(userActions.logInUser.call(userLogInData))
    };
};

export const MainPage = connect(mapStateToProps, mapDispatchToProps)(HomePage);

