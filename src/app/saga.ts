import { all } from 'redux-saga/effects';
import {watchCloseQuestion,watchCreateQuestion,watchGetQuestions,watchUpdateQuestion,watchupdateQuestionAnswersInfo} from './modules/questions';


export default function* saga() {
  yield all([
    watchCreateQuestion(),
    watchGetQuestions(),
    watchUpdateQuestion(),
    watchCloseQuestion(),
    watchupdateQuestionAnswersInfo(),
  ]);
}