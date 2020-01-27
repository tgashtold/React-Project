import React, {Fragment} from 'react';
import {LogInForm, userActions, UserWelcomeMessage} from '../modules/users';
import {Loader} from '../modules/common';
import {IUserInfo, IUserLogInArgs} from '../modules/users/user.model';
import {connect} from 'react-redux';
import {IAppState} from '../state';

interface IMainPageStateProps {
    user: IUserInfo | null;
    isRegistered: boolean | null;
    isDataLoading: boolean;
    logInError: string;
}

interface IMainPageDispatchProps {
    logInUser: (userLogInData: IUserLogInArgs) => any;
}

interface IMainPageProps extends IMainPageDispatchProps, IMainPageStateProps {
}

interface IMainPageState {
    logInData: IUserLogInArgs
}

class HomePage extends React.Component<IMainPageProps, IMainPageState> {
    constructor(props: IMainPageProps) {
        super(props);
        this.state = {logInData: {email: '', password: ''}}
    }

    handleSubmit = (userDataForLogIn: IUserLogInArgs): void => {
        this.setState({logInData: userDataForLogIn})
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
                <LogInForm onSubmit={this.handleSubmit}
                           insertValue={this.props.isRegistered === false}
                           values={this.state.logInData}
                >
                    {this.props.isRegistered === false && this.props.logInError.length === 0
                        ? <p className="error-message">Please enter correct password and/or e-mail</p>
                        : null}
                    {this.props.isRegistered === false && this.props.logInError.length > 0
                        ? <p className="error-message">{this.props.logInError}</p>
                        : null}
                </LogInForm>
            </Fragment>
        );
    };

    render() {
        return (
            <Loader isActive={this.props.isDataLoading}>
                <div className="login-wrapper">
                    {this.props.isRegistered === true && this.props.user
                        ? this.getUserWelcomeTemplate(this.props.user)
                        : this.getLogInTemplate()
                    }
                </div>
            </Loader>
        );
    }
}

const mapStateToProps = (state: IAppState): IMainPageStateProps => {
    return {
        user: state.user.user,
        isRegistered: state.user.isRegistered,
        isDataLoading: state.user.isUserCreating,
        logInError: state.user.logInError
    };
};

const mapDispatchToProps = (dispatch: any): IMainPageDispatchProps => {
    return {
        logInUser: (userLogInData: IUserLogInArgs) => dispatch(userActions.logInUser.call(userLogInData))
    };
};

export const MainPage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
