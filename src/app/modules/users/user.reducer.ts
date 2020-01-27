import {userActions} from './user.action';
import {defaultUserState, IUserState} from './user.state';
import {handleActions} from 'redux-actions';

export const userReducer = handleActions(
    {
        [`${userActions.logOutUser.request}`]: (state: IUserState, action: any) => ({
            ...state,
        }),
        [`${userActions.logOutUser.success}`]: (state: IUserState, action: any) => ({
            ...state,
            user: null,
            isRegistered: null
        }),
        [`${userActions.logOutUser.error}`]: (state: IUserState, action: any) => ({
            ...state,
        }),
        [`${userActions.isUserAuthorized.request}`]: (state: IUserState, action: any) => ({
            ...state,
        }),
        [`${userActions.isUserAuthorized.success}`]: (state: IUserState, action: any) => ({
            ...state,
            isRegistered: action.payload.authorized || null,
            user: action.payload.user,

        }),
        [`${userActions.isUserAuthorized.error}`]: (state: IUserState, action: any) => ({
            ...state,
            isRegistered: action.payload.authorized || null,
            user: action.payload.user,
        }),
        [`${userActions.logInUser.request}`]: (state: IUserState, action: any) => ({
            ...state,
            isUserCreating: true,
            logInError: ''
        }),
        [`${userActions.logInUser.success}`]: (state: IUserState, action: any) => ({
            ...state,
            user: {...action.payload},
            isUserCreating: false,
            isRegistered: true,
            logInError: ''
        }),
        [`${userActions.logInUser.error}`]: (state: IUserState, action: any) => ({
            ...state,
            isUserCreating: false,
            isRegistered: false,
            logInError: action.payload,
        }),
        [`${userActions.createUser.request}`]: (state: IUserState, action: any) => ({
            ...state,
            isUserCreating: true
        }),
        [`${userActions.createUser.success}`]: (state: IUserState, action: any) => {
            return ({
                ...state,
                user: {...action.payload},
                isUserCreating: false,
                registrationError: '',
                isRegistered: true
            })
        },
        [`${userActions.createUser.error}`]: (state: IUserState, action: any) => ({
            ...state,
            registrationError: action.payload,
            isUserCreating: false
        }),
        [`${userActions.updateUserPersonalInfo.request}`]: (state: IUserState, action: any) => ({
            ...state,
            isUserCreating: true,
            registrationError: ''
        }),
        [`${userActions.updateUserPersonalInfo.success}`]: (state: IUserState, action: any) => {
            return ({
                ...state,
                user: {...action.payload},
                isUserCreating: false,
                registrationError: ''
            })
        },
        [`${userActions.updateUserPersonalInfo.error}`]: (state: IUserState, action: any) => ({
            ...state,
            isUserCreating: false,
            registrationError: action.payload
        }),

        [`${userActions.getUserById.request}`]: (state: IUserState, action: any) => ({
            ...state,
            isUserCreating: true
        }),
        [`${userActions.getUserById.success}`]: (state: IUserState, action: any) => ({
            ...state,
            user: {...action.payload},
            isUserCreating: false
        }),
        [`${userActions.getUserById.error}`]: (state: IUserState, action: any) => ({
            ...state,
            isUserCreating: false
        })
    },
    defaultUserState
);
