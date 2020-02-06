import { IUpdatePersonalInfoArgs, IUser, IUserLogInArgs } from './user.model';
import { RouteService } from '../../services';
import { QuestionService } from '../questions';

export class UserApi {
	static async getUserByEmailAndPassword(userInfo: IUserLogInArgs): Promise<any> {
		try {
			let response = await fetch(`http://localhost:5000/user/get/${userInfo.password}/${userInfo.email}`, {
				method: 'GET',
				credentials: 'include'
			});

			if (+response.status.toString().slice(0, 1) !== 2 && response.status !== 404) {
				throw new Error('Error! Failed to log in. Please try again');
			}

			let result = await response.json();

			if (result.statusCode === 404) {
				throw new Error('');
			}

			const user = result;

			user.questions = QuestionService.adoptQuestionsDates(user.questions);

			return user;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	static async isAuthorized(): Promise<any> {
		try {
			let response = await fetch('http://localhost:5000/user/authorization', {
				method: 'GET',

				credentials: 'include'
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
				credentials: 'include',
				body: JSON.stringify(newUser)
			});

			if (+response.status.toString().slice(0, 1) !== 2 && response.status !== 406) {
				throw new Error('Error! Failed to create new user. Please try again');
			}

			let result = await response.json();

			if (result.statusCode) {
				throw new Error(result.message);
			}

			const user = result;
			user.questions = QuestionService.adoptQuestionsDates(user.questions);

			return user;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	static async getUserById(userId: string): Promise<any> {
		try {
			let response = await fetch(`http://localhost:5000/user/get/${userId}`, {
				credentials: 'include'
			});

			if (+response.status.toString().slice(0, 1) !== 2) {
				throw new Error(`Error ${response.status}! Failed to find user ${userId}`);
			}

			const user = await response.json();

			user.questions = QuestionService.adoptQuestionsDates(user.questions);

			return user;
		} catch (error) {
			RouteService.redirectToErrorPage();
		}
	}

	static async logOutUser(): Promise<any> {
		try {
			let response = await fetch(`http://localhost:5000/user/logout`, {
				method: 'DELETE',
				credentials: 'include'
			});

			if (+response.status.toString().slice(0, 1) !== 2) {
				throw new Error('Log out problem');
			}
		} catch (error) {
			RouteService.redirectToErrorPage();
		}
	}

	static async changeUserPersonalInfo(changedUserInfo: IUpdatePersonalInfoArgs): Promise<any> {
		try {
			const response = await fetch(`http://localhost:5000/user/update/${changedUserInfo.id}`, {
				method: 'PUT',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(changedUserInfo.personalData)
			});

			let result = await response.json();

			result.questions = QuestionService.adoptQuestionsDates(result.questions);

			return result;
		} catch (error) {
			throw new Error('Unable to update. Please try again');
		}
	}
}
