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
    isRegistered: boolean | null;
    creationError: string
}

interface ICreateQuestionDispatchProps {
    createQuestion: (questionInfo: IQuestion) => any;
    updateUser: (userId: string) => any;
    isAuthorized: () => any;
}

interface ICreateQuestionProps extends ICreateQuestionDispatchProps, ICreateQuestionStateProps {
}

interface ICreateQuestionState {
}

class CreateQuestion extends React.Component<ICreateQuestionProps, ICreateQuestionState> {
    componentDidMount() {
        this.props.isAuthorized();
    }

    handleQuestionFormSubmit = (newQuestion: IQuestion) => {
        if (this.props.user) {
            this.props.createQuestion({...newQuestion, author: this.props.user});
            this.props.updateUser(this.props.user.id);
        }
    };

    render() {
        if (!this.props.user && !this.props.isRegistered) {
            return <Redirect to={`${RoutesConfig.routes.mainPage}`}/>;
        }

        return (
            <FormWrapper formTitle={'Create a question'}>
                <Loader isActive={this.props.isQuestionCreating}>
                    <QuestionForm
                        onSubmit={this.handleQuestionFormSubmit}
                    serverError={this.props.creationError}/>
                </Loader>
            </FormWrapper>
        );
    }
}

const mapStateToProps = (state: IAppState): ICreateQuestionStateProps => {
    return {
        user: state.user.user,
        isQuestionCreating: state.questions.isDataLoading,
        isRegistered: state.user.isRegistered,
        creationError:state.questions.creationError
    };
};

const mapDispatchToProps = (dispatch: any): ICreateQuestionDispatchProps => {
    return {
        updateUser: (userId: string) => dispatch(userActions.getUserById.call(userId)),
        createQuestion: (question: IQuestion) => dispatch(questionActions.createQuestion.call(question)),
        isAuthorized: () => dispatch(userActions.isUserAuthorized.call())
    };
};

export const CreateQuestionPage = connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);
