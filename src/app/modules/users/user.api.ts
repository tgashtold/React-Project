import Database from '../../../data/Database';
import {IUpdatePersonalInfoArgs, IUser, IUserInfo, IUserInfoInDB, IUserLogInArgs} from './user.model';
import {QuestionsApi} from '../questions';

export class UserApi {
    static getUserById(id: string): IUserInfoInDB {
        return Database.users.find((user: IUserInfoInDB) => user.id === id);
    }

    static updateUser(user: IUserInfoInDB): IUserInfoInDB {
        Database.users = Database.users.filter((userInDb: IUserInfoInDB) => user.id !== userInDb.id);
        Database.users.push(user);
        return user;
    }

    static async changeUserPersonalInfo(changedUserInfo: IUpdatePersonalInfoArgs): Promise<any> {
        const userInDb: IUserInfoInDB = this.getUserById(changedUserInfo.id);
        const updatedUser: IUserInfoInDB = {...userInDb, personalData: changedUserInfo.personalData};

        this.updateUser(updatedUser);

        return await {
            ...updatedUser,
            questions: QuestionsApi.getQuestionsByAuthorId(updatedUser.id)
        };
    }

    static async increaseAnswersQtyInRating(userId: string): Promise<any> {
        const userInDb: IUserInfoInDB = await this.getUserById(userId);
        userInDb.rating.answersTotal += 1;
        return await {
            ...this.updateUser(userInDb),
            questions: QuestionsApi.getQuestionsByAuthorId(userId)
        };
    }

    static async increaseQuestionsQtyInRating(userId: string): Promise<any> {
        const userInDb: IUserInfoInDB = await this.getUserById(userId);
        userInDb.rating.questionsTotal = userInDb.rating.questionsTotal + 1;
        this.updateUser(userInDb);

        return await {
            ...userInDb,
            questions: QuestionsApi.getQuestionsByAuthorId(userId)
        };
    }

    static async addUser(newUser: IUser): Promise<any> {
        const isUserWithSamePasswordExist: boolean = Database.users.some(
            (userInDb: IUserInfo) => userInDb.password === newUser.password
        );
        const isUserWithSameEmailExist: boolean = Database.users.some(
            (userInDb: IUserInfo) => userInDb.personalData.email === newUser.personalData.email
        );

        if (isUserWithSamePasswordExist) {
            throw new Error('Please enter other password to provide reliability');
        } else if (isUserWithSameEmailExist) {
            throw new Error('The user with such e-mail already exists');
        } else {
            const user: IUserInfoInDB = {
                id: Math.random().toString().slice(5, 15),
                ...newUser,
                rating: {
                    questionsTotal: 0,
                    answersTotal: 0,
                    answersAcceptedByOthers: 0,
                    answersLikedByOthers: 0
                }
            };

            await Database.users.push(user);
            const resultUser: IUserInfo = {
                ...user,
                questions: QuestionsApi.getQuestionsByAuthorId(user.id)
            };

            return resultUser;
        }
    }

    static async getUserByEmailAndPassword(userInfo: IUserLogInArgs): Promise<any> {
        const user: IUserInfoInDB | undefined = Database.users.find(
            (userInDb: IUserInfoInDB) =>
                userInDb.password === userInfo.password && userInDb.personalData.email === userInfo.email
        );

        if (user) {
            const userToReturn: IUserInfo = {
                ...user,
                questions: QuestionsApi.getQuestionsByAuthorId(user.id)
            };

            return userToReturn;
        }

        throw new Error('No such user');
    }
}
