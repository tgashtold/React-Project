export {AnswerForm} from './components/answer-form';
export {AnswerTemplate} from './components/answer-template';
export {AnswerListTemplate} from './components/answers-list';
export {AnswerLikes} from './components/answer-likes';
export {AnswersServices} from './answers.services';
export {AnswersApi} from './answers.api';
export {Answer} from './answer.model';
export * from './answer.model';
export * from './interfaces/IQuestionsAnswersObj';
export {answerReducer} from './answer.reducer';
export {answersReducer} from './answers.reducer';
export {addAnswer,getAllQuestionsAnswersInfo,getAnswers,getUserQuestionsAnswersInfo,updateAnswer} from './answers.action';
export {acceptAnswer,addAnswerLike,createAnswer,updateAnswerAuthor,updateAnswerQuestion} from './answer.action';
export {defaultAnswerState} from './answer.state';
export {defaultAnswersState} from './answers.state';