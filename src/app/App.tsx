import React from 'react';
import Routes from './Routes';
import '../assets/App.scss';
import {Header} from './modules/common';
import {IUserInfo} from './modules/users/user.model';
import {connect} from 'react-redux';
import {userActions} from './modules/users';
import {IAppState} from './state';

interface IAppDispatchProps {
    logOutUser: () => any;
    isAuthorized:()=>any;
}

interface IAppStateProps {
    user: IUserInfo | null;
}

interface IAppProps extends IAppDispatchProps, IAppStateProps {
}

class AppComponent extends React.Component<IAppProps> {
    componentWillMount(){
        this.props.isAuthorized();
}

    render() { 
         return (
            <div className="App content">
                <Header user={this.props.user} onLogOut={this.props.logOutUser}/>
                <main className="main">
                    <Routes/>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (store: IAppState): IAppStateProps => {
    return {
        user: store.user.user,
    };
};

const mapDispatchToProps = (dispatch: any): IAppDispatchProps => {
    return {
        logOutUser: () => dispatch(userActions.logOutUser.call()),
        isAuthorized: () =>
        dispatch(userActions.isUserAuthorized.call()), 
    };
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default App;
