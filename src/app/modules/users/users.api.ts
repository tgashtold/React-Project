import Database from '../../../data/Database';
import {User} from '../users';

export class UsersApi {
    static async getUsers(): Promise<any> {
        return await Database.users;
    }

    static async getUserById(id: string): Promise<any> {
        return await Database.users.find((user: User) => user.id === id);
    }

    static async addUser(newUser: User): Promise<any> {
        await Database.users.push(newUser);
    }

    static async changeUser(changedUser: User): Promise<any> {
        const filteredUsers: Array<User> = await Database.users.filter((user: User) => user.id !== changedUser.id);
        await filteredUsers.push(changedUser);
        Database.users = filteredUsers;
    }

    static async getUserByEmailAndPassword(email: string, password: string) {
        const user: User | undefined = Database.users.find(
            (userInDb: User) => userInDb.password === password && userInDb.personalData.email === email
        );
        return user;
    }
};
