import {Question} from '../questions';

export interface IUser {
    id: string;
    password: string;
    personalData: IPersonalInfo;
    questions: Array<Question>;
    rating: IUserRating;
}

export interface IPersonalInfo{ firstName: string;
    lastName: string;
    email: string;
    progLanguages: string[];
    workingPosition: string;
    workExperience: string;}

export interface IUserRating{
    questionsTotal: number;
    answersTotal: number;
    answersAcceptedByOthers: number;
    answersLikedByOthers: number;
}
export class User implements IUser {
    id: string = Math.random().toString().slice(5, 15);
    password = '';
    personalData = {
        firstName: '',
        lastName: '',
        email: '',
        progLanguages: [],
        workingPosition: '',
        workExperience: ''
    };
    questions: Array<Question> = [];
    rating = {
        questionsTotal: 0,
        answersTotal: 0,
        answersAcceptedByOthers: 0,
        answersLikedByOthers: 0
    };
}


