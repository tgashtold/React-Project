import {IQuestionInfo} from './question.model';

export interface IQuestionState {
    questions: IQuestionInfo[];
    tags: Array<string>;
    isFilterProcess: boolean;
    isDataLoading: boolean;
}

export const defaultQuestionState: IQuestionState = {
    questions: [],
    tags: [],
    isFilterProcess: false,
    isDataLoading: false,
};
