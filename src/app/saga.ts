import {all} from 'redux-saga/effects';
import {questionWatchers} from './modules/questions/question.watcher';
import {userWatchers} from './modules/users/user.watcher';
import {answerWatchers} from './modules/answers/answer.watcher';

export default function* saga() {
    yield all([
        ...questionWatchers,
        ...userWatchers,
        ...answerWatchers,
    ]);
}

