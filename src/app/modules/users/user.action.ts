import {createAction} from 'redux-actions';
import {createHttpAction} from '../../services';

export const userActions: any = {
    logInUser: createHttpAction('LOG_IN_USER'),
    logOutUser: createAction('LOG_OUT_USER'),
    createUser: createHttpAction('CREATE_USER'),
    updateUserPersonalInfo: createHttpAction('UPDATE_USER_PERSONAL_INFO'),
    increaseQuestionsQtyInUserRating: createHttpAction('INCREASE_QUESTIONS_QTY_IN_USER_RATING'),
    increaseAnswersQtyInUserRating: createHttpAction('INCREASE_ANSWERS_QTY_IN_USER_RATING')
};