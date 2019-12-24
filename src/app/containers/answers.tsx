import React from 'react';
import { Question, QuestionsApi, createQuestion} from '../modules/questions';
import { IQuestion} from '../modules/questions/question.model';
import { AuthorShortInfo, User, UsersApi, UserServices, addAnswerToUserRating, addLikedAnswerToUserRating,addAcceptedAnswerToUserRating } from '../modules/users';
import { IUser } from '../modules/users/user.model';
import { CreationDate } from '../modules/common';
import { AnswerForm, AnswerListTemplate, Answer, AnswersApi, createAnswer, addAnswer } from '../modules/answers';
import { IAnswer } from '../modules/answers/answer.model';
import { LSService } from '../services/LS-service';
import {RouteService} from '../services';
import { connect } from 'react-redux';
import {IPersonalInfo, IUserRating} from '../modules/users/user.model';

interface IAnswersProps {
	newAnswer: IAnswer;
	user: IUser ;
	question: Question;
	answers: Array<Answer>;
	createAnswer: (author: IUser, question: IQuestion, text: string)=>any;
	addAnswerToUserRating:()=> any;
	addAnswer: (answer: IAnswer)=> any;
	
}

interface IAnswersState {
	isAnyAnswerAccepted: boolean;
	// user: User | null;
	// question: Question;
	// answers: Array<Answer>;
}

class Answers extends React.Component<IAnswersProps, IAnswersState> {
	constructor(props: IAnswersProps) {
		super(props);

		this.state = {
			// user: null,
			// question: new Question(new User()),
			// answers: [],
			isAnyAnswerAccepted: false
		};
	}

	// componentWillMount() {
	// 	UsersApi.getUserById(LSService.getUserIdFromLS()).then((userFromDB: User) =>
	// 		this.setState({ user: userFromDB })
	// 	);

	// 	QuestionsApi.getQuestionById(RouteService.getQuestionIdFromURl()).then((questionFromDB: Question) => {
	// 		this.setState({ question: questionFromDB, isAnyAnswerAccepted: questionFromDB.isClosed });
	// 		AnswersApi.getAnswersByQuestionId(questionFromDB.id).then((answersFromDB: Array<Answer>) => {
	// 			this.setState({ answers: answersFromDB });
	// 		});
	// 	});

	// 	}

	handleLikesClick = (answer: Answer | IAnswer) => {
		if (!UserServices.isUserLikedAnswer(this.props.user, answer)) {
			const answerToUpdate: Answer = answer;
			const newLikesNumber = answer.likes.quantity + 1;
			answerToUpdate.likes.quantity = newLikesNumber;
			answerToUpdate.author.rating.answersLikedByOthers += 1;
			answerToUpdate.likes.users.push(this.props.user);
			AnswersApi.changeAnswer(answerToUpdate);
			UsersApi.changeUser(answerToUpdate.author);
			const answersArr: Array<Answer> = this.props.answers;
			const newAnswersArr: Array<Answer> = answersArr.filter((answer: Answer) => answer.id !== answerToUpdate.id);
			newAnswersArr.push(answerToUpdate);
			// this.setState({ answers: newAnswersArr });
		}
	};

	handleAcceptBtnClick = (answer: Answer) => {
		const answerToUpdate: Answer = answer;
		answerToUpdate.isAccepted = true;
		answerToUpdate.author.rating.answersAcceptedByOthers += 1;
		answerToUpdate.question.isClosed = true;

		
		const answersArr: Array<Answer> = this.props.answers;
		const newAnswersArr: Array<Answer> = answersArr.filter((answer: Answer) => answer.id !== answerToUpdate.id);
		newAnswersArr.push(answerToUpdate);

		AnswersApi.changeAnswer(answerToUpdate);
		UsersApi.changeUser(answerToUpdate.author);
		this.setState({ isAnyAnswerAccepted: true });
		// this.setState({ isAnyAnswerAccepted: true, answers: newAnswersArr });
	};

	handleAnswerFormSubmit = (answerText: string) => {
		if (this.props.user.password.length>0) {
this.props.addAnswerToUserRating();
this.props.createAnswer(this.props.user, this.props.question, answerText);
this.props.addAnswer(this.props.newAnswer)
		
			// answersArr.push(newAnswer);
			// AnswersApi.addAnswer(newAnswer);
			// UsersApi.changeUser(userToUpdate);
			// this.setState({ user: userToUpdate, answers: answersArr });
		}
	};

	render() {
		return (
			<div className="answers-box">
				<div className="question-details">
					<h1 className="question-details__title">{this.props.question.title}</h1>
					<div className="details">
						<AuthorShortInfo author={this.props.question.author} />
						<CreationDate date={this.props.question.creationDate} />
					</div>
					<div className="question-details__description">{this.props.question.description}</div>
				</div>
				<AnswerListTemplate
					answers={this.props.answers}
					user={this.props.user}
					handleLikesClick={this.handleLikesClick}
					handleAcceptBtnClick={this.handleAcceptBtnClick}
				/>
				{this.props.user.password.length>0 && !this.props.question.isClosed ? (
					<AnswerForm onSubmit={this.handleAnswerFormSubmit} />
				) : null}
			</div>
		);
	}
}

const mapStateToProps = (store: any) => {
	return {
		newAnswer: store.answer,
		 user: store.user,
		 question: store.question,
		 answers: store.answers.questionAnswers,
 }}

 const mapDispatchToProps = (dispatch: any) => {
	return {
	createAnswer: (author: IUser, question: IQuestion, text: string) =>dispatch(createAnswer(author, question, text)),
	addAnswerToUserRating: ()=> dispatch(addAcceptedAnswerToUserRating()),
	addAnswer: (answer: IAnswer)=>dispatch(addAnswer(answer)),
//  addAnswerToUserRating:() => dispatch(addAnswerToUserRating()),
 }}

export const AnswersPage = connect(mapStateToProps, mapDispatchToProps)(Answers);