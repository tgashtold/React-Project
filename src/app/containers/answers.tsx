import React from 'react';
import {IQuestionInfo} from '../modules/questions/question.model';
import {userActions, UserService} from '../modules/users';
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
}

interface IAnswersDispatchProps {
    createAnswer: (newAnswer: IAnswer) => any;
    acceptAnswer: (answerId: string) => any;
    getQuestionAndAnswers: (requestData: IGetQuestionAndAswersArgs) => any;
    getUpdatedQuestionAndAnswers: (requestData: IGetQuestionAndAswersArgs) => any;
    addLikeToAnswer: (likeData: IAddLikeArgs) => any;
    addAnswerToUserRating: (userId: string) => any;
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

    componentWillMount() {
        this.props.getQuestionAndAnswers({
            questionId: this.props.match.params.id,
            answersCountPerPage: this.answersQtyPerPage
        });
    }

    handleLikeClick = (answer: IAnswerInfo) => {
        this.props.user && this.props.addLikeToAnswer({answerId: answer.id, user: this.props.user});
    };

    handleAcceptBtnClick = (answer: IAnswerInfo) => {
        this.props.acceptAnswer(answer.id);
    };

    handleAnswerFormSubmit = (answer: IAnswer) => {
        if (this.props.user && this.props.currentQuestion) {
            this.props.createAnswer({...answer, author: this.props.user, question: this.props.currentQuestion});
            this.props.addAnswerToUserRating(this.props.user.id);
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
            !!this.props.user &&
            !UserService.isUserLikedAnswer(this.props.user, answer) &&
            !UserService.isUserAndAnswerAuthorEqual(this.props.user, answer)
        );
    };

    render() {
        !this.props.isQuestionExist && RouteService.redirectToErrorPage();

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
                            <Pagination
                                activePage={this.activePage}
                                handlePageBtnClick={this.handlePagesBtnClick}
                                pagesQty={Math.ceil(this.props.answersTotalQty / this.answersQtyPerPage)}
                            >
                                <AnswerList
                                    disableLike={this.disableLike}
                                    answers={this.props.answers}
                                    user={this.props.user}
                                    handleLikesClick={this.handleLikeClick}
                                    handleAcceptBtnClick={this.handleAcceptBtnClick}
                                />
                            </Pagination>
                        </React.Fragment>
                    )}
                </Loader>
                {this.props.user && this.props.currentQuestion && !this.props.currentQuestion.isClosed
                    ? <AnswerForm clearForm={this.props.isDataLoading} onSubmit={this.handleAnswerFormSubmit}/>
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
        answersTotalQty: state.answers.answersTotalQty
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
        addLikeToAnswer: (likeData: IAddLikeArgs) => dispatch(answerActions.addLikeToAnswer.call(likeData)),
        addAnswerToUserRating: (userId: string) => dispatch(userActions.increaseAnswersQtyInUserRating.call(userId)),
        getAnswersFromRequestedPosition: (requestData: IGetAswersFromPositionArgs) =>
            dispatch(answerActions.getAnswersFromRequestedPosition.call(requestData))
    };
};

export const AnswersPage = connect(mapStateToProps, mapDispatchToProps)(Answers);
