import { createAction } from 'redux-actions';
import { createHttpAction } from '../../services';

const logInUser = createHttpAction('LOG_IN_USER');
const logOutUser = createAction('LOG_OUT_USER');
const createUser = createHttpAction('CREATE_USER');
const updateUserPersonalInfo = createHttpAction('UPDATE_USER_PERSONAL_INFO');
const increaseQuestionsQtyInUserRating = createHttpAction('INCREASE_QUESTIONS_QTY_IN_USER_RATING');
const increaseAnswersQtyInUserRating = createHttpAction('INCREASE_ANSWERS_QTY_IN_USER_RATING');

export {
	logInUser,
	logOutUser,
	increaseQuestionsQtyInUserRating,
	increaseAnswersQtyInUserRating,
	createUser,
	updateUserPersonalInfo
};
