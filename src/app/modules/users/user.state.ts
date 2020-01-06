import {IUserInfo} from './user.model';

export interface IUserState {
    user: IUserInfo | null;
    isUserCreating: boolean;
    isRegistered: boolean | null;
    registrationError: string;
}

export const defaultUserState: IUserState = {
    user: null,
    isUserCreating: false,
    isRegistered: null,
    registrationError: ''
};
