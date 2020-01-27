import React from 'react';
import RoutesConfig from './config/Routes.config';
import {
	AnswersPage,
	CreateQuestionPage,
	Error404,
	MainPage,
	QuestionsListPage,
	RegistrationPage,
	UserInfoPage
} from './containers';
import { Route, Switch } from 'react-router-dom';

interface IRoutesProps {}

interface IRoutesState {}

class Routes extends React.Component<IRoutesProps, IRoutesState> {
	render() {
		return (
			<Switch>
				<Route exact path={RoutesConfig.routes.mainPage} component={MainPage} />
				<Route exact path={RoutesConfig.routes.createQuestion} component={CreateQuestionPage} />
				<Route exact path={RoutesConfig.routes.questionsList} component={QuestionsListPage} />
				<Route exact path={RoutesConfig.routes.questionsListSearch} component={QuestionsListPage} />
				<Route path={RoutesConfig.routes.questionsListTag} component={QuestionsListPage} />
				<Route path={RoutesConfig.routes.registration} component={RegistrationPage} />
				<Route path={RoutesConfig.routes.userInfo} component={UserInfoPage} />
				<Route path={RoutesConfig.routes.answers} component={AnswersPage} />
				<Route path={'*'} component={Error404} />
			</Switch>
		);
	}
}

export default Routes;
