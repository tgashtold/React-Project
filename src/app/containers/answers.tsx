import React from 'react';
import {IQuestionInfo} from '../modules/questions/question.model';
import {UserService} from '../modules/users';
import {IUserInfo} from '../modules/users/user.model';
import {Loader, Pagination, TagsField} from '../modules/common';
import {answerActions, AnswerForm, AnswerList} from '../modules/answers';
import {QuestionDetails} from '../modules/questions';
import {
    IAddLikeArgs,
    IAnswer,
    IAnswerInfo,
    IGetAswersFromPositionArgs,
    IGetQuestionAndAswersArgs
} from '../modules/answers/answer.model';
import {RouteService} from '../services';
import {connect} from 'react-redux';
import {IAppState} from '../state';
import {RouteComponentProps} from 'react-router-dom';
import {Redirect} from "react-router";
import RoutesConfig from '../config/Routes.config';

interface IAnswersParams {
    id: string;
}

interface IAnswersStateProps {
    user: IUserInfo | null;
    currentQuestion: IQuestionInfo | null;
    answers: Array<IAnswerInfo>;
    isQuestionExist: boolean;
    isDataLoading: boolean;
    answersTotalQty: number;
    answerCreationError: string;
    getAnswersError: string;
    updateAnswersError: string
}

interface IAnswersDispatchProps {
    createAnswer: (newAnswer: IAnswer) => any;
    acceptAnswer: (answerId: string) => any;
    getQuestionAndAnswers: (requestData: IGetQuestionAndAswersArgs) => any;
    getUpdatedQuestionAndAnswers: (requestData: IGetQuestionAndAswersArgs) => any;
    addLikeToAnswerAndUpdateQuestionAndAnswers: (likeData: IAddLikeArgs) => any;
    getAnswersFromRequestedPosition: (requestData: IGetAswersFromPositionArgs) => any;
}

interface IAnswersProps extends IAnswersDispatchProps, IAnswersStateProps {
}

interface IAnswersState {
    activeTag: string;
}

class Answers extends React.Component<RouteComponentProps<IAnswersParams> & IAnswersProps, IAnswersState> {
    answersQtyPerPage: number = 2;
    activePage: number = 1;

    constructor(props: RouteComponentProps<IAnswersParams> & IAnswersProps) {
        super(props);
        this.state = {activeTag: ''}
    }

    componentDidMount() {
        this.props.getQuestionAndAnswers({
            questionId: this.props.match.params.id,
            answersCountPerPage: this.answersQtyPerPage
        });
    }

    handleLikeClick = (answer: IAnswerInfo) => {
        this.props.user && this.props.addLikeToAnswerAndUpdateQuestionAndAnswers({
            answerId: answer.id,
            userId: this.props.user.id,
            questionId: this.props.currentQuestion ? this.props.currentQuestion.id : '',
            answersCount: this.answersQtyPerPage,
            answersStartNumber: (this.activePage - 1) * this.answersQtyPerPage,
        });
    };

    handleAcceptBtnClick = (answer: IAnswerInfo) => {
        this.props.acceptAnswer(answer.id);
    };

    handleAnswerFormSubmit = (answer: IAnswer) => {
        if (this.props.user && this.props.currentQuestion) {
            this.props.createAnswer({...answer, author: this.props.user, question: this.props.currentQuestion});
            this.props.getUpdatedQuestionAndAnswers({
                questionId: this.props.match.params.id,
                answersCountPerPage: this.answersQtyPerPage
            });
        }
    };

    handlePagesBtnClick = (activePage: number) => {
        this.activePage = activePage;
        this.props.getAnswersFromRequestedPosition({
            questionId: this.props.match.params.id,
            itemsCount: this.answersQtyPerPage,
            startNumber: (activePage - 1) * this.answersQtyPerPage
        });
    };

    handleTagClick = (tagName: string) => {
        this.setState({activeTag: tagName});
    };

    disableLike = (answer: IAnswerInfo): boolean => {
        return !(
            !!this.props.user && !UserService.isUserAndAnswerAuthorEqual(this.props.user, answer)
        );
    };

    render() {
        if( !this.props.isQuestionExist ){
            return <Redirect to={RoutesConfig.routes.error}/>
       }

        if (this.state.activeTag.length > 0) {
            return <Redirect to={RouteService.getQuestionsTagRoute(this.state.activeTag)}/>
        }

        return (
            <div className="answers-box">
                <Loader isActive={this.props.isDataLoading}>
                    {this.props.currentQuestion && (
                        <React.Fragment>
                            <QuestionDetails question={this.props.currentQuestion}>
                                <TagsField
                                    activeTag={this.state.activeTag}
                                    onTagClick={this.handleTagClick}
                                    tags={this.props.currentQuestion.hashTags}
                                />
                            </QuestionDetails>
                            {this.props.updateAnswersError.length > 0
                                ? <p className="error-message">{this.props.updateAnswersError}</p>
                                : null}
                            <Pagination
                                activePage={this.activePage}
                                handlePageBtnClick={this.handlePagesBtnClick}
                                pagesQty={Math.ceil(this.props.answersTotalQty / this.answersQtyPerPage)}
                            >
                                {this.props.getAnswersError.length > 0
                                    ? <p className="error-message">{this.props.getAnswersError}</p>
                                    : <AnswerList
                                        isQuestionClosed={this.props.currentQuestion.isClosed}
                                        disableLike={this.disableLike}
                                        answers={this.props.answers}
                                        user={this.props.user}
                                        handleLikesClick={this.handleLikeClick}
                                        handleAcceptBtnClick={this.handleAcceptBtnClick}
                                    />}
                            </Pagination>
                        </React.Fragment>
                    )}
                </Loader>
                {this.props.user && this.props.currentQuestion && !this.props.currentQuestion.isClosed
                    ? <AnswerForm error={this.props.answerCreationError} clearForm={this.props.isDataLoading}
                                  onSubmit={this.handleAnswerFormSubmit}/>
                    : null}
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState): IAnswersStateProps => {
    return {
        user: state.user.user,
        currentQuestion: state.answers.currentQuestion,
        answers: state.answers.answers,
        isQuestionExist: state.answers.isQuestionExist,
        isDataLoading: state.answers.gettingAnswerData,
        answersTotalQty: state.answers.answersTotalQty,
        answerCreationError: state.answers.answerCreationError,
        getAnswersError: state.answers.getAnswersError,
        updateAnswersError: state.answers.updateAnswersError
    };
};

const mapDispatchToProps = (dispatch: any): IAnswersDispatchProps => {
    return {
        createAnswer: (newAnswer: IAnswer) => dispatch(answerActions.createAnswer.call(newAnswer)),
        acceptAnswer: (answerId: string) => dispatch(answerActions.acceptAnswer.call(answerId)),
        getQuestionAndAnswers: (requestData: IGetQuestionAndAswersArgs) =>
            dispatch(answerActions.getQuestionAndAnswersByQuestionId.call(requestData)),
        getUpdatedQuestionAndAnswers: (requestData: IGetQuestionAndAswersArgs) =>
            dispatch(answerActions.getUpdatedQuestionAndAnswersByQuestionId.call(requestData)),
        addLikeToAnswerAndUpdateQuestionAndAnswers: (likeData: IAddLikeArgs) => dispatch(answerActions.addLikeToAnswerAndUpdateQuestionAndAnswers.call(likeData)),
        getAnswersFromRequestedPosition: (requestData: IGetAswersFromPositionArgs) =>
            dispatch(answerActions.getAnswersFromRequestedPosition.call(requestData))
    };
};

export const AnswersPage = connect(mapStateToProps, mapDispatchToProps)(Answers);
