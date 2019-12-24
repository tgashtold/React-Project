import React from 'react';
import RoutesConfig from './config/Routes.config';
import {AnswersPage, CreateQuestionPage ,Error404, QuestionsListPage , UserInfoPage} from './containers';
// import mainPage from './containers/mainPage';
import RegistrationPage from './containers/registration';
import { Switch, Route} from 'react-router-dom';
// import * as MainPage from './containers/mainPage';



interface IRoutesProps {}
interface IRoutesState {
}

class Routes extends React.Component<IRoutesProps, IRoutesState> {


render(){
	return (
			<Switch>
				{/* <Route exact path={RoutesConfig.routes.mainPage} component={mainPage} /> */}
				<Route path={RoutesConfig.routes.questionsList} component={QuestionsListPage} />
				{/* <Route path={RoutesConfig.routes.registration} component={RegistrationPage} /> */}
				{/* <Route path={RoutesConfig.routes.userInfo} component={UserInfoPage}  />
		
				<Route path={RoutesConfig.routes.answers} component={AnswersPage} /> */}		
				<Route exact path={RoutesConfig.routes.createQuestion} component={CreateQuestionPage}  />
				<Route path={'*'} component={Error404} />
			</Switch>
		);}
}

export default Routes;
