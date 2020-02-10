import {IUpdatePersonalInfoArgs, IUser, IUserLogInArgs} from './user.model';
import {RouteService} from '../../services';
import {QuestionService} from '../questions';
import {api} from '../common';
import {ServerError} from '../../services';

export class UserApi {
    static async getUserByEmailAndPassword(userInfo: IUserLogInArgs): Promise<any> {
        try {
            const response = await api.get(`user/get/${userInfo.password}/${userInfo.email}`);
            const user = response.data;

            user.questions = QuestionService.adoptQuestionsDates(user.questions);

            return user;
        } catch (error) {
            if (error instanceof ServerError) {
                throw new Error('');
            }

            throw new Error('Error! Failed to log in. Please try again');
        }
    }

    static async isAuthorized(): Promise<any> {
        try {
            const response = await api.get(`user/authorization`);

            if (response.data.user) {
                response.data.user.questions = QuestionService.adoptQuestionsDates(response.data.user.questions);
            }

            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async addUser(newUser: IUser): Promise<any> {
        try {
            const response = await api.post(`user/create`, newUser);
            const user = response.data;

            user.questions = QuestionService.adoptQuestionsDates(user.questions);

            return user;
        } catch (error) {
            if (error.statusCode && error.statusCode === 406) {
                throw new Error(error.message);
            }

            throw new Error('Error! Failed to create new user. Please try again');

        }
    }

    static async getUserById(userId: string): Promise<any> {
        try {
            const response = await api.get(`user/get/${userId}`);

            response.data.questions = QuestionService.adoptQuestionsDates(response.data.questions);

            return response.data;
        } catch (error) {
            RouteService.redirectToErrorPage();
        }
    }

    static async logOutUser(): Promise<any> {
        try {
            await api.delete(`user/logout`);
        } catch (error) {
            RouteService.redirectToErrorPage();
        }
    }

    static async changeUserPersonalInfo(changedUserInfo: IUpdatePersonalInfoArgs): Promise<any> {
        try {
            const response = await api.put(`user/update/${changedUserInfo.id}`, changedUserInfo.personalData);

            response.data.questions = QuestionService.adoptQuestionsDates(response.data.questions);

            return response.data;
        } catch (error) {
            throw new Error('Unable to update. Please try again');
        }
    }
}
