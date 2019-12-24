import React, {Fragment} from 'react';
import {LSService} from '../services/LS-service';
import {RouteService} from '../services';
import {LogInForm, UsersApi, User, UserWelcomeMessage} from '../modules/users';
import { connect } from 'react-redux';



interface IMainPageProps {
    user: User;
}

interface IMainPageState {
    isRegistered: boolean;
    user: User 
}

class MainPage extends React.Component<IMainPageProps, IMainPageState> {
    constructor(props: IMainPageProps) {
        super(props);
        this.state = {
            isRegistered: true,
            user: this.props.user,
        };
    }

    // componentWillMount = () => {
    //     const userId = LSService.getUserIdFromLS();
    //     if (userId) {
    //         UsersApi.getUserById(userId).then((userFromDB: User) => this.setState({user: userFromDB}));

    //     }
    // };
    handleSubmit = (email: string, password: string): void => {
        UsersApi.getUserByEmailAndPassword(email, password).then((userToAllowAccess: User | undefined) => {
            if (userToAllowAccess) {

                LSService.addUserIdToLS(userToAllowAccess.id)
                this.setState({isRegistered: true, user: userToAllowAccess});
                RouteService.redirectToMainPage();
            } else {
                this.setState({isRegistered: false});
            }
        });
    };

    getUserWelcomeTemplate = (user: User) => {
        return (
            <UserWelcomeMessage userFirstName={user.personalData.firstName} userLastName={user.personalData.lastName}/>
        );
    };

    getLigInTemplate = () => {
        return (
            <Fragment>
                <h1 className="login__title">log in</h1>
                <LogInForm onSubmit={this.handleSubmit}>
                    {!this.state.isRegistered && (
                        <p className="error-message">Please enter correct password and/or e-mail</p>
                    )}
                </LogInForm>
            </Fragment>
        )
    };

    render() {
        return (
            <div className="login-wrapper">
                {this.state.user.password.length>0 ? this.getUserWelcomeTemplate(this.state.user) : this.getLigInTemplate()}
            </div>
        );
    }
}

const mapStateToProps = (store: any) => {
     return {
        user: store.user,
    }}
const mainPage = connect(mapStateToProps)(MainPage);

 export default  mainPage;