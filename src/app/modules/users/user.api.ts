import {IUpdatePersonalInfoArgs, IUser, IUserLogInArgs} from './user.model';
import {RouteService} from '../../services';
import {QuestionService} from '../questions';
import {UserService} from './';

export class UserApi {
    static async getUserByEmailAndPassword(userInfo: IUserLogInArgs): Promise<any> {
        try {
            let response = await fetch(`http://localhost:5000/user/get/${userInfo.password}/${userInfo.email}`);

            if (+response.status.toString().slice(0, 1) !== 2 && response.status !== 404) {
                throw new Error('Error! Failed to log in. Please try again');
            }

            let result = await response.json();

            if (result.statusCode === 404) {
                throw new Error('');
            }

            result.user.questions = QuestionService.adoptQuestionsDates(result.user.questions);
            UserService.addUserToLS(result.token);

            return result.user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async isAuthorized(): Promise<any> {
        try {
            let response = await fetch('http://localhost:5000/user/authorization', {
                method: 'GET',
                headers: {
                    'x-access-token': localStorage.getItem('Authorization') || ''
                },
            });

            let result = await response.json();

            if (result.user) {
                result.user.questions = QuestionService.adoptQuestionsDates(result.user.questions);
            }

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async addUser(newUser: IUser): Promise<any> {
        try {
            let response = await fetch('http://localhost:5000/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newUser)
            });

            if (+response.status.toString().slice(0, 1) !== 2 && response.status !== 406) {
                throw new Error('Error! Failed to create new user. Please try again');
            }

            let result = await response.json();

            if (result.statusCode) {
                throw new Error(result.message);
            }

            result.user.questions = QuestionService.adoptQuestionsDates(result.user.questions);
            UserService.addUserToLS(result.token);

            return result.user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getUserById(userId: string): Promise<any> {
        try {
            let response = await fetch(`http://localhost:5000/user/get/${userId}`);

            if (+response.status.toString().slice(0, 1) !== 2) {
                throw new Error(`Error ${response.status}! Failed to find user ${userId}`);
            }

            const result = await response.json();

            result.user.questions = QuestionService.adoptQuestionsDates(result.user.questions);
            UserService.addUserToLS(result.token);

            return result.user;
        } catch (error) {
            RouteService.redirectToErrorPage();
        }
    }

    static async changeUserPersonalInfo(changedUserInfo: IUpdatePersonalInfoArgs): Promise<any> {
        try {
            const response = await fetch(`http://localhost:5000/user/update/${changedUserInfo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'x-access-token': localStorage.getItem('Authorization') || ''
                },
                body: JSON.stringify(changedUserInfo.personalData)
            });

            let result = await response.json();

            result.questions = QuestionService.adoptQuestionsDates(result.questions);

            return result;
        } catch (error) {
            throw new Error('Unable to update. Please try again')
        }
    }
}
