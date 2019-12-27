import React from 'react';
import Routes from './Routes';
import '../assets/App.scss';
import { Header } from './modules/common';
import { IUserInfo} from './modules/users/user.model';
import { connect } from 'react-redux';
import {  logOutUser } from './modules/users';
import { IAppState } from './state';

interface IAppDispatchProps {
		logOutUser: () => any;
}

interface IAppStateProps {
	user: IUserInfo | null;
}
interface IAppProps extends IAppDispatchProps, IAppStateProps  {


}

class app extends React.Component<IAppProps> {
	render() {
		return (
			<div className="App content">
				<Header user={this.props.user} onLogOut={this.props.logOutUser} />
				<main className="main">
					<Routes />
				</main>
			</div>
		);
	}
}

const mapStateToProps = (store: IAppState ): IAppStateProps => {
	return {
		user: store.user.user,
	};
};

const mapDispatchToProps = (dispatch: any): IAppDispatchProps => {
	return {
		logOutUser: () => dispatch(logOutUser())
	};
};

const App = connect(mapStateToProps, mapDispatchToProps)(app);

export default App;