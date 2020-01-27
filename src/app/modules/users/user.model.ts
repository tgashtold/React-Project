import {IQuestionInfo} from '../questions/question.model';

export interface IUser {
    password: string;
    personalData: IPersonalInfo;
}

export interface IUserInfoInDB extends IUser {
    id: string;
    rating: IUserRating;
}

export interface IUserInfo {
    id: string;
    personalData: IPersonalInfo;
    rating: IUserRating;
    questions: IQuestionInfo[];
}

export interface IUserLogInArgs {
    email: string;
    password: string;
}

export interface IUpdatePersonalInfoArgs {
    personalData: IPersonalInfo;
    id: string;
}

export interface IPersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    progLanguages: string[];
    workingPosition: string;
    workExperience: string;
}

export interface IUserRating {
    questionsTotal: number;
    answersTotal: number;
    answersAcceptedByOthers: number;
    answersLikedByOthers: number;
}
