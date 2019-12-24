import {acceptAnswer,addAnswerLike,createAnswer,updateAnswerAuthor,updateAnswerQuestion} from './answer.action';
import {defaultAnswerState} from './answer.state';
import {IAnswerLikes,IAnswer} from '../answers/answer.model';
import {IQuestion} from '../questions/question.model';

import {handleActions} from 'redux-actions';


export const answerReducer = handleActions(
    {
        [`${createAnswer}`]: (state: IAnswer, action: any) => (
            {
                ...state,
                ...action.payload
            }
        ),
        [`${addAnswerLike}`]: (state: IAnswer, action: any) => ({
                ...state,
                likes:{quantity: state.likes.quantity+1,
                users: [...state.likes.users, action.payload]},
            }
        ),
        [`${acceptAnswer}`]: (state: IAnswer, action: any) => ({
                ...state,
                isAccepted:true,
            }
        ),
        [`${updateAnswerQuestion}`]: (state: IAnswer, action: any) => ({
                ...state,
                ...action.payload,
            }
        ),
        [`${updateAnswerAuthor}`]: (state: IAnswer, action: any) => ({
                ...state,
                ...action.payload,
            }
        ),
    },
    defaultAnswerState,
);
