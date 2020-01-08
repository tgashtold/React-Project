import React from 'react';
import {FormWrapper, Loader} from '../modules/common';
import {questionActions, QuestionForm} from '../modules/questions';
import {IUserInfo} from '../modules/users/user.model';
import {userActions} from '../modules/users';
import {IAppState} from '../state';
import {Redirect} from 'react-router-dom';
import RoutesConfig from '../config/Routes.config';
import {connect} from 'react-redux';
import {IQuestion} from '../modules/questions/question.model';

interface ICreateQuestionStateProps {
    user: IUserInfo | null;
    isQuestionCreating: boolean;
}

interface ICreateQuestionDispatchProps {
    createQuestion: (questionInfo: IQuestion) => any;
    increaseQuestionsQtyInUserRating: (userId: string) => any;
}

interface ICreateQuestionProps extends ICreateQuestionDispatchProps, ICreateQuestionStateProps {
}

interface ICreateQuestionState {
}

class CreateQuestion extends React.Component<ICreateQuestionProps, ICreateQuestionState> {
    handleQuestionFormSubmit = (newQuestion: IQuestion) => {
        if (this.props.user) {
            this.props.createQuestion({...newQuestion, author: this.props.user});
            this.props.increaseQuestionsQtyInUserRating(this.props.user.id);
        }
    };

    render() {
        if (!this.props.user) {
            return <Redirect to={`${RoutesConfig.routes.mainPage}`}/>;
        }

        if (this.props.isQuestionCreating) {
            return <Redirect to={`${RoutesConfig.routes.questionsList}`}/>;
        }

        return (
            <FormWrapper formTitle={'Create a question'}>
                <Loader isActive={this.props.isQuestionCreating}>
                    <QuestionForm onSubmit={this.handleQuestionFormSubmit}/>
                </Loader>
            </FormWrapper>
        );
    }
}

const mapStateToProps = (state: IAppState): ICreateQuestionStateProps => {
    return {
        user: state.user.user,
        isQuestionCreating: state.questions.isDataLoading
    };
};

const mapDispatchToProps = (dispatch: any): ICreateQuestionDispatchProps => {
    return {
        increaseQuestionsQtyInUserRating: (userId: string) =>
            dispatch(userActions.increaseQuestionsQtyInUserRating.call(userId)),
        createQuestion: (question: IQuestion) => dispatch(questionActions.createQuestion.call(question))
    };
};

export const CreateQuestionPage = connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);
