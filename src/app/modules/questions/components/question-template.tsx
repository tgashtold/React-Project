import React from 'react';
import {Link} from 'react-router-dom';
import RoutesConfig from '../../../config/Routes.config';
import {Question, QuestionInfoItem} from '../';
import {RouteService} from '../../../services';
import {IQuestionInfo} from '../question.model';

interface IQuestionTemplateProps {
    question: IQuestionInfo;
    specificWrapperClass?: string;
    specificLinkClass?: string;
    specificTitleClass?: string;
}

interface IQuestionTemplateState {
}

export class QuestionTemplate extends React.Component<IQuestionTemplateProps, IQuestionTemplateState> {
    render() {
        const lastAnswerTime: Date | null = this.props.question.latestAnswerDate;

        return (
            <details className={`user-question__wrapper ${this.props.specificWrapperClass || ''}`}>
                <summary className={`user-question__title ${this.props.specificTitleClass || ''}`}>
                    <Link
                        className={`user-question__link ${this.props.specificLinkClass || ''}`}
                        to={RouteService.getPathToAnswersPage(this.props.question.id)}
                    >
                        {this.props.question.title}
                    </Link>
                    <div className="question-info__wrapper">
                        <QuestionInfoItem infoItemTitle={'Total answers'} infoItemValue={this.props.question.answersQty}/>
                        <QuestionInfoItem infoItemTitle={'Latest answer'} infoItemValue={lastAnswerTime
                            ? `${lastAnswerTime.toLocaleDateString()} ${lastAnswerTime.toLocaleTimeString()}`
                            : '-'}/>
                        <QuestionInfoItem infoItemTitle={'Creation'} infoItemValue={lastAnswerTime
                            ? `${this.props.question.creationDate.toLocaleDateString()} ${this.props.question.creationDate.toLocaleTimeString()}`
                            : '-'}/>
                    </div>
                </summary>
                <p className="user-question__description"> {this.props.question.description}</p>
            </details>
        );
    }
}



