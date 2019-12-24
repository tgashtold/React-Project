import React from 'react';
import { InputLabelWrapper, TextArea, Button, FormWrapper, IChangedEventArgs } from '../modules/common';
import { Question, QuestionsApi, QuestionForm,  createQuestion } from '../modules/questions';
import {IUser} from '../modules/users/user.model';
import { connect } from 'react-redux';
import {IQuestionCreationInfo} from '../modules/questions/question.worker';



interface ICreateQuestionProps {
		user: IUser;
		createQuestion: (questionInfo: IQuestionCreationInfo)=> any;
		isQuestionCreating: boolean;
}

interface ICreateQuestionState {
}

class CreateQuestion extends React.Component<ICreateQuestionProps, ICreateQuestionState> {

	handleQuestionFormSubmit = (questionTitle: string, questionDescription: string) => {
		// const userToUpdate = this.props.user;
		// userToUpdate.rating.questionsTotal += 1;

		// const newQuestion = new Question(userToUpdate);

		// newQuestion.title = questionTitle;
		// newQuestion.description = questionDescription;
this.props.createQuestion({author:this.props.user, title: questionTitle, description: questionDescription});

	//TODO:!!!!!!!!!!!!!!!!!!!!!
// this.props.addAnswerToUserRating();
		// QuestionsApi.addQuestion(newQuestion);
		// UsersApi.changeUser(userToUpdate);

		// this.setState({ user: userToUpdate });


        // RouteService.redirectToAnswersPage(this.props.question.id);
 	};


	// componentWillUpdate(nextProps: ICreateQuestionProps): boolean {
	// 	if (nextProps.question){
	// 	RouteService.redirectToAnswersPage(nextProps.question.id);}
	// 	console.log(nextProps);
	// return true;
	// }

	render() {
		return (
			<FormWrapper formTitle={'Create a question'}>
			{	this.props.isQuestionCreating ? <p className ="info-message">Creating question ...</p> : <QuestionForm onSubmit={this.handleQuestionFormSubmit} />}
			</FormWrapper>
		);
	}
}

const mapStateToProps = (store: any) => {
    return {
			 user: store.user,
			 isQuestionCreating: store.questions.isQuestionCreating,
   
   }}


   const mapDispatchToProps = (dispatch: any) => {
    return {
    createQuestion: (questionInfo: IQuestionCreationInfo) =>dispatch(createQuestion.fetch(questionInfo)),
   }}



export const CreateQuestionPage = connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);




