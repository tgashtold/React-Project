import { all } from 'redux-saga/effects';
import * as questionWatchers from './modules/questions/question.watcher';
import * as userWatchers from './modules/users/user.watcher';
import * as answerWatchers from './modules/answers/answer.watcher';

export default function* saga() {
	yield all([
		questionWatchers.watchCreateQuestion(),
		questionWatchers.watchGetQuestions(),
		questionWatchers.watchUpdateQuestion(),
		questionWatchers.watchUpdateQuestionAnswersInfo(),
		questionWatchers.watchGetQuestionsTags(),
		questionWatchers.watchGetQuestionsByTag(),
		questionWatchers.watchSearchQuestionByTitle(),
		userWatchers.watchUserQuestion(),
		userWatchers.watchLogInUser(),
		userWatchers.watchIncreaseQuestionsInUserRating(),
		userWatchers.watchIncreaseAnswersInUserRating(),
		userWatchers.watchUpdateUserPersonalInfo(),
		answerWatchers.watchGetQuestionAndAnswers(),
		answerWatchers.watchCreateAnswer(),
		answerWatchers.watchAddLike(),
		answerWatchers.watchAcceptAnswer(),
		answerWatchers.watchGetAnswersFromRequestedPosition()
	]);
}
