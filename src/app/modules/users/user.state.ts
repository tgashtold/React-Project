import { IUserState } from './user.model';

export const defaultUserState: IUserState = {
	user: null,
	isUserCreating: false,
	isRegistered: null,
	registrationError: ''
};
