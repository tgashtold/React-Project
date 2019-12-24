import React from 'react';
import {CreationDate, Button} from '../../common';
import {Question} from '../../questions';
import {Answer, AnswersApi, AnswerLikes} from '../../answers';
import {AuthorShortInfo, User, UsersApi, UserServices} from '../../users';
import {IUser} from '../../users/user.model';

interface IAnswerTemplateProps {
    answer: Answer;
    user: User | IUser;
    handleLikesClick: (answer: Answer) => void
    handleAcceptBtnClick: (answer: Answer) => void
}

interface IAnswerTemplateState {

}

export class AnswerTemplate extends React.Component<IAnswerTemplateProps, IAnswerTemplateState> {
    constructor(props: IAnswerTemplateProps) {
        super(props);
        this.state = {};
    }

    render() {
        const answer = this.props.answer;
        const question: Question = answer.question;

        return (
            <div className="answer-wrapper">
                <div className="details">
                    <AuthorShortInfo author={answer.author}/>
                    <CreationDate date={answer.creationDate}/>
                </div>
                <p className="answer">{answer.text}</p>
                <AnswerLikes answer={answer} handleLikesClick={() => this.props.handleLikesClick(this.props.answer)}/>
                {(this.props.user && UserServices.isUserAndQuestionAuthorEqual(this.props.user, question) && !question.isClosed)
                    ? <Button clickHandler={() => this.props.handleAcceptBtnClick(this.props.answer)}
                              buttonTitle={'Accept answer and close discussion'}/>
                    : null}
            </div>
        );
    }
}


// import React from 'react';
// import {CreationDate, Button} from '../../common';
// import {Question} from '../../questions';
// import {Answer, AnswersApi} from '../../answers';
// import {AuthorShortInfo, User, UsersApi, UserServices} from '../../users';
//
//
// interface IAnswerTemplateProps {
//     answer: Answer;
//     loggedInUser: User | null;
//     isAccepted: (value: boolean) => void;
// }
//
// interface IAnswerTemplateState {
//     isAccepted: boolean;
//     likesNumber: number;
//     answer: Answer;
//     user: User | null;
// }
//
// export class AnswerTemplate extends React.Component<IAnswerTemplateProps, IAnswerTemplateState> {
//
//     constructor(props: IAnswerTemplateProps) {
//         super(props);
//         this.state = {
//             isAccepted: this.props.answer.isAccepted,
//             likesNumber: this.props.answer.likes.quantity,
//             answer: this.props.answer,
//             user: this.props.loggedInUser
//         };
//     }
//
//     handleLikesClick = () => {
//         if (this.state.user && !UserServices.isUserLikedAnswer(this.state.user, this.state.answer)) {
//             const newLikesNumber: number = this.state.likesNumber + 1;
//             const answerToUpdate: Answer = this.state.answer;
//             answerToUpdate.likes.quantity = newLikesNumber;
//
//             answerToUpdate.author.rating.answersLikedByOthers = answerToUpdate.author.rating.answersLikedByOthers + 1;
//             answerToUpdate.likes.users.push(answerToUpdate.author);
//             AnswersApi.changeAnswer(answerToUpdate);
//             UsersApi.changeUser(answerToUpdate.author);
//             this.setState({likesNumber: newLikesNumber, user: answerToUpdate.author, answer: answerToUpdate})
//
//         }
//     };
//
//     handleAcceptBtnClick = () => {
//         this.props.isAccepted(true);
//         this.setState({isAccepted: true});
//         const answerToUpdate: Answer = this.props.answer;
//         answerToUpdate.isAccepted = true;
//         answerToUpdate.author.rating.answersAcceptedByOthers = answerToUpdate.author.rating.answersAcceptedByOthers + 1;
//         answerToUpdate.question.isClosed = true;
//         this.setState({user: answerToUpdate.author, answer: answerToUpdate})
//         AnswersApi.changeAnswer(answerToUpdate)
//         UsersApi.changeUser(answerToUpdate.author)
//
//     };
//
//     render() {
//         const answer = this.state.answer;
//         const question: Question = answer.question;
//
//         return (
//             <div className="answer-wrapper">
//                 <div className="details">
//                     <AuthorShortInfo author={answer.author}/>
//                     <CreationDate date={answer.creationDate}/>
//                 </div>
//                 <p className="answer">{answer.text}</p>
//                 <div className="answer-rating">
//                     <button onClick={this.handleLikesClick} className="answer-rating__button">
//                         Like
//                     </button>
//                     <span className="answer-rating__value">+ {answer.likes.quantity}</span>
//                 </div>
//                 {(this.state.user && UserServices.isUserAndQuestionAuthorEqual(this.state.user, this.state.answer.question) && !question.isClosed)
//                     ? <Button clickHandler={this.handleAcceptBtnClick}
//                               buttonTitle={'Accept answer and close discussion'}/>
//                     : null}
//             </div>
//         );
//     }
// }
