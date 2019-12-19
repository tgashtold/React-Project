import Database from '../models/Database';
import User from '../models/User';

export const UsersApi: any = {
	async getUsers(): Promise<any> {
		return await Database.users;
	},

	async getUserById(id: string): Promise<any> {
		return await Database.users.find((user: User) => user.id === id);
	},

	async addUser(newUser: User): Promise<any> {
		await Database.users.push(newUser);
	},

	async changeUser(changedUser: User): Promise<any> {
		const filteredUsers: Array<User> = await Database.users.filter((user: User) => user.id !== changedUser.id);
		await filteredUsers.push(changedUser);
		Database.users = filteredUsers;
	},

	async getUserByEmailAndPassword(email: string, password: string) {
		const user: User | undefined = Database.users.find(
			(userInDb: User) => userInDb.password === password && userInDb.personalData.email === email
		);
		return user;
	}
};
