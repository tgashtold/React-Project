import React from 'react';
import {User} from '../../users';
import {IUser} from '../../users/user.model';
import {AnswerTemplate, Answer} from '../../answers';

interface IAnswersListProps {
    answers: Array<Answer>;
    user: User | IUser;
    handleLikesClick: (answer: Answer) => void
    handleAcceptBtnClick: (answer: Answer) => void
}

export class AnswerListTemplate extends React.Component<IAnswersListProps> {
    getAnswersTemplates = (): any => {
        const answersTemplatesArr: Array<any> = this.props.answers.map((questionAnswer: Answer) => (
            <AnswerTemplate
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
                {this.props.answers.length > 0 ? this.getAnswersTemplates() :
                    <p className="info-message">no answers</p>}
            </div>
        );
    }
}


// import React from 'react';
// import {User} from '../../users';
// import {AnswerTemplate, Answer} from '../../answers';
//
// interface IAnswersListProps {
//     answers: Array<Answer>;
//     user: User | null;
//     isAccepted: (value: boolean) => void;
// }
//
// export class AnswerListTemplate extends React.Component<IAnswersListProps> {
//     getAnswersTemplates = (): any => {
//         const answersTemplatesArr: Array<any> = this.props.answers.map((questionAnswer: Answer) => (
//             <AnswerTemplate
//                 key={questionAnswer.id}
//                 user={this.props.user}
//                 answer={questionAnswer}
//                 isAccepted={this.props.isAccepted}
//             />
//         ));
//
//         return answersTemplatesArr;
//     };
//
//     render() {
//         return (
//             <div className="answers">
//                 {this.props.answers.length > 0 ? this.getAnswersTemplates() :
//                     <p className="info-message">no answers</p>}
//             </div>
//         );
//     }
// }

