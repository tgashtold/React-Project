import {addAnswer,getAllQuestionsAnswersInfo,getUserQuestionsAnswersInfo,updateAnswer, getAnswers} from './answers.action';
import {defaultAnswersState,IAnswers } from './answers.state';
import {IAnswerLikes,IAnswer} from '../answers/answer.model';
import {IQuestion} from '../questions/question.model';

import {handleActions} from 'redux-actions';


export const answersReducer = handleActions(
    {
      [`${getAnswers}`]: (state: IAnswers, action: any) => (
        {
            ...state,
            ...action.payload
        }
    ),
        [`${addAnswer}`]: (state: IAnswers, action: any) => (
            {
                ...state,
                questionAnswers:[...state.questionAnswers,action.payload] 
            }
        ),
        [`${updateAnswer}`]: (state: IAnswers, action: any) => ({
          ...state,
          questionAnswers:[...state.questionAnswers,action.payload] 
            }
        ),
        [`${getAllQuestionsAnswersInfo}`]: (state: IAnswers, action: any) => ({
                ...state,
                allQuestionAnswersInfo: [...action.payload],
            }
        ),
        [`${getUserQuestionsAnswersInfo}`]: (state: IAnswers, action: any) => ({
          ...state,
          userQuestionAnswersInfo: [...action.payload],
            }
        ),
           },
    defaultAnswersState,
);
