import RoutesConfig from '../config/Routes.config';

export class RouteService {
    static redirectToErrorPage(): void {
        window.location.pathname = RoutesConfig.routes.error;
    }

    static getSearchValueFromLoactionSearch(locationSearchText: string): string {
        return locationSearchText.slice(3);
    }

    static getPathToAnswersPage(questionId: string): string {
        return `${RoutesConfig.routes.answers.slice(0, -3)}${questionId}`;
    }

    static getQuestionsSearchRoute(): string {
        return RoutesConfig.routes.questionsListSearch.slice(0, -8);
    }

    static getPathToUserInfoPage(): string {
        return `${RoutesConfig.routes.userInfo.slice(0, -3)}`;
    }
}
