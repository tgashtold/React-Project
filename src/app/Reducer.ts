import {combineReducers} from 'redux';
import {userReducer} from './modules/users';
import {questionsReducer} from './modules/questions';
import {answerReducer, answersReducer} from './modules/answers';



export interface IAppReducer{
    questions: any;
    user: any;
    
}

export const Reducer = combineReducers({
   
    questions: questionsReducer,
    user: ()=>null,
   

});