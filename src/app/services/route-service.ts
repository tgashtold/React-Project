import RoutesConfig from '../config/Routes.config';

export class RouteService {
	static redirectToErrorPage(): void {
		window.location.pathname = RoutesConfig.routes.error;
	}

	static redirectToAnswersPage(id: string): void {
		window.location.pathname = `${RoutesConfig.routes.answers.slice(0, -3)}${id}`;
	}

	static getPathToAnswersPage(questionId: string): string {
		return `${RoutesConfig.routes.answers.slice(0, -3)}${questionId}`;
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
