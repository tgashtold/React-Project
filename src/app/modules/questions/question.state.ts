import {IQuestionInfo} from './question.model';

export interface IQuestionState {
    questions: IQuestionInfo[] | null;
    tags: Array<string>;
    isFilterProcess: boolean;
    isDataLoading: boolean;
    creationError: string;
    uploadingError:string
}

export const defaultQuestionState: IQuestionState = {
    questions: null,
    tags: [],
    isFilterProcess: false,
    isDataLoading: false,
    creationError:'',
    uploadingError: ''
};
