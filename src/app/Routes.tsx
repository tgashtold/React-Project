import React from 'react';
import RoutesConfig from './config/Routes.config';
import MainPage from './containers/mainPage';
import QuestionsList from './containers/questionList';
import CreateQuestion from './containers/createQuestion';
import Registration from './containers/registration';
import UserInfo from './containers/userInfo';
import Answers from './containers/answers';
import { Switch, Route} from 'react-router-dom';
import Error404 from './containers/error404';


interface IRoutesProps {}
interface IRoutesState {
}

class Routes extends React.Component<IRoutesProps, IRoutesState> {

	
render(){
	return (
			<Switch>
				<Route exact path={RoutesConfig.routes.mainPage} component={MainPage} />
				<Route path={RoutesConfig.routes.questionsList} component={QuestionsList} />
				<Route path={RoutesConfig.routes.registration} component={Registration} />
				<Route path={RoutesConfig.routes.userInfo} component={UserInfo}  />
				<Route exact path={RoutesConfig.routes.createQuestion} component={CreateQuestion}  />
				<Route path={RoutesConfig.routes.answers} component={Answers} />
				<Route path={'*'} component={Error404} />
			</Switch>
		);}
}

export default Routes;
