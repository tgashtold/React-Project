import {createHttpAction} from '../../services';

export const userActions: any = {
    logInUser: createHttpAction('LOG_IN_USER'),
    logOutUser: createHttpAction('LOG_OUT_USER'),
    createUser: createHttpAction('CREATE_USER'),
    updateUserPersonalInfo: createHttpAction('UPDATE_USER_PERSONAL_INFO'),
    getUserById: createHttpAction('GET_USER_BY_ID'),
    isUserAuthorized: createHttpAction('IS_AUTHORIZED'),
 };