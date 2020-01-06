import React from 'react';
import {IUserInfo} from '../../users/user.model';
import {AnswerTemplate} from '../../answers';
import {IAnswerInfo} from '../answer.model';

interface IAnswersListProps {
    answers: Array<IAnswerInfo>;
    user: IUserInfo | null;
    handleLikesClick: (answer: IAnswerInfo) => void;
    handleAcceptBtnClick: (answer: IAnswerInfo) => void;
    disableLike?: (answer: IAnswerInfo) => boolean;
}

export class AnswerList extends React.Component<IAnswersListProps> {
    renderAnswersTemplates = (): any => {
        const answersTemplatesArr: Array<any> = this.props.answers.map((questionAnswer: IAnswerInfo) => (
            <AnswerTemplate
                disableLike={this.props.disableLike && this.props.disableLike(questionAnswer)}
                key={questionAnswer.id}
                user={this.props.user}
                answer={questionAnswer}
                handleAcceptBtnClick={() => this.props.handleAcceptBtnClick(questionAnswer)}
                handleLikesClick={() => this.props.handleLikesClick(questionAnswer)}
            />
        ));

        return answersTemplatesArr;
    };

    render() {
        return (
            <div className="answers">
                {this.props.answers.length > 0
                    ? this.renderAnswersTemplates()
                    : <p className="info-message">no answers</p>
                }
            </div>
        );
    }
}
