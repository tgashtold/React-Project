import RoutesConfig from '../config/Routes.config';

export class RouteService {
	static redirectToErrorPage(): void {
		window.location.pathname = RoutesConfig.routes.error;
	}

	static getSearchValueFromLoactionSearch(locationSearchText: string): string {
		return locationSearchText.slice(3);
	}

	static redirectToAnswersPage(id: string): void {
		window.location.pathname = `${RoutesConfig.routes.answers.slice(0, -3)}${id}`;
	}

	static getPathToAnswersPage(questionId: string): string {
		return `${RoutesConfig.routes.answers.slice(0, -3)}${questionId}`;
	}

	static getQuestionsSearchRoute(): string {
		return RoutesConfig.routes.questionsList_search.slice(0, -8);
	}

	static getPathToUserInfoPage(): string {
		return `${RoutesConfig.routes.userInfo.slice(0, -3)}`;
	}

	static redirectToUserInfoPage(userId: string): void {
		window.location.pathname = `${RoutesConfig.routes.userInfo.slice(0, -3)}${userId}`;
	}

	static redirectToMainPage(): void {
		window.location.pathname = RoutesConfig.routes.mainPage;
	}

	static getQuestionIdFromURl(): string {
		return window.location.pathname.split('/')[2];
	}
}
