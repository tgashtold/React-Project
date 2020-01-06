import React from 'react';
import {IQuestionInfo} from '../question.model';
import {AuthorShortInfo} from "../../users";
import {CreationDate,} from "../../common";

interface IQuestionDetailsProps {
    question: IQuestionInfo;
}

interface IQuestionDetailsState {
}

export class QuestionDetails extends React.Component<IQuestionDetailsProps, IQuestionDetailsState> {
    render() {
        return (<div className="question-details">
            <h1 className="question-details__title">{this.props.question.title}</h1>
            <div className="details">
                <AuthorShortInfo author={this.props.question.author}/>
                <CreationDate date={this.props.question.creationDate}/>
            </div>
            <div className="question-details__description">
                {this.props.question.description}
            </div>
            {this.props.children}
        </div>)
    }
}
