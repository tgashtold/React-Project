import React from 'react';
import {QuestionTemplate} from './question-template';
import {IQuestionInfo} from '../question.model';


interface IUserQuestionsCollectionProps {
    userQuestions: Array<IQuestionInfo>
}

interface IUserQuestionsCollectionState {
}


export class UserQuestionsCollection extends React.Component<IUserQuestionsCollectionProps, IUserQuestionsCollectionState> {
    getQuestionsTemplatesCollection = (): Array<any> => {
        const questionsTemplatesCollection: Array<any> = this.props.userQuestions.map((question: IQuestionInfo) => (
            <QuestionTemplate key={question.id}  question={question}/>
        ));

        return questionsTemplatesCollection;
    };


    render() {
        return (
            <div className="user-questions">
                {this.props.userQuestions.length > 0
                    ? this.getQuestionsTemplatesCollection()
                    : <p className="info-message">no questions</p>
                }
            </div>
        );
    }
}


