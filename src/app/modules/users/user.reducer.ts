import {userActions} from './user.action';
import {defaultUserState, IUserState} from './user.state';
import {combineActions, handleActions} from 'redux-actions';

export const userReducer = handleActions(
    {
        [`${userActions.logOutUser}`]: (state: IUserState, action: any) => ({
            ...state,
            user: null,
            isRegistered: null
        }),
        [`${userActions.logInUser.request}`]: (state: IUserState, action: any) => ({
            ...state,
            isUserCreating: true
        }),
        [`${userActions.logInUser.success}`]: (state: IUserState, action: any) => ({
            ...state,
            user: {...action.payload},
            isUserCreating: false,
            isRegistered: true
        }),
        [`${userActions.logInUser.error}`]: (state: IUserState, action: any) => ({
            ...state,
            isUserCreating: false,
            isRegistered: false
        }),
        [`${userActions.createUser.request}`]: (state: IUserState, action: any) => ({
            ...state,
            isUserCreating: true
        }),
        [`${userActions.createUser.success}`]: (state: IUserState, action: any) => ({
            ...state,
            user: {...action.payload},
            isUserCreating: false,
            registrationError: '',
            isRegistered: true
        }),
        [`${userActions.createUser.error}`]: (state: IUserState, action: any) => ({
            ...state,
            registrationError: action.payload,
            isUserCreating: false
        }),

        [`${combineActions(
            userActions.increaseQuestionsQtyInUserRating.request,
            userActions.increaseAnswersQtyInUserRating.request,
            userActions.updateUserPersonalInfo.request
        )}`]: (state: IUserState, action: any) => ({
            ...state,
            isUserCreating: true
        }),
        [`${combineActions(
            userActions.increaseQuestionsQtyInUserRating.success,
            userActions.increaseAnswersQtyInUserRating.success,
            userActions.updateUserPersonalInfo.success
        )}`]: (state: IUserState, action: any) => ({
            ...state,
            user: {...action.payload},
            isUserCreating: false
        }),
        [`${combineActions(
            userActions.increaseQuestionsQtyInUserRating.error,
            userActions.increaseAnswersQtyInUserRating.error,
            userActions.updateUserPersonalInfo.error
        )}`]: (state: IUserState, action: any) => ({
            ...state,
            isUserCreating: false
        })
    },
    defaultUserState
);
