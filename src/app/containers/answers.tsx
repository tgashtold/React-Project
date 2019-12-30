import React from 'react';
import {IQuestionInfo} from '../modules/questions/question.model';
import {AuthorShortInfo, UserServices, increaseAnswersQtyInUserRating} from '../modules/users';
import {IUserInfo} from '../modules/users/user.model';
import {CreationDate, Pagination, TagsField} from '../modules/common';
import {
    AnswerForm,
    AnswerListTemplate,
    createAnswer,
    acceptAnswer,
    addLikeToAnswer,
    getQuestionAndAnswersByQuestionId,
    getAnswersFromRequestedPosition
} from '../modules/answers';
import {
    IAddLikeArgs,
    IAnswer,
    IAnswerInfo,
    IGetAswersFromPositionArgs,
    IGetQuestionAndAswersArgs,
    ICreateAnswerArgs
} from '../modules/answers/answer.model';
import {RouteService} from '../services';
import {connect} from 'react-redux';
import {IAppState} from '../state';
import {RouteComponentProps} from 'react-router-dom';
import loader from '../../assets/images/loader.gif';
import RoutesConfig from "../config/Routes.config";

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
    createAnswer: (data: ICreateAnswerArgs) => any;
    acceptAnswer: (answerId: string) => any;
    getQuestionAndAnswers: (requestData: IGetQuestionAndAswersArgs) => any;
    addLikeToAnswer: (likeData: IAddLikeArgs) => any;
    addAnswerToUserRating: (userId: string) => any;
    getAnswersFromRequestedPosition: (requestData: IGetAswersFromPositionArgs) => any;
}

interface IAnswersProps extends IAnswersDispatchProps, IAnswersStateProps {
}

interface IAnswersState {
}

class Answers extends React.Component<RouteComponentProps<IAnswersParams> & IAnswersProps, IAnswersState> {
    answersQtyPerPage: number = 2;
    activePage: number = 1;
    activeTag: string = '';

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
            this.props.createAnswer({
                answer: {...answer, author: this.props.user, question: this.props.currentQuestion},
                answersCountPerPage: this.answersQtyPerPage
            });
            this.props.addAnswerToUserRating(this.props.user.id);
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
        this.activeTag = tagName;
    };

    disableLike = (answer: IAnswerInfo): boolean => {
        return !(!!this.props.user &&
            !UserServices.isUserLikedAnswer(this.props.user, answer) &&
            !UserServices.isUserAndAnswerAuthorEqual(this.props.user, answer));
    };

    render() {
        !this.props.isQuestionExist && RouteService.redirectToErrorPage();

        return (
            <div className="answers-box">
                {this.props.isDataLoading && <img src={loader} alt="Loading ..."/>}
                {!this.props.isDataLoading &&
                this.props.currentQuestion && (
                    <React.Fragment>
                        <div className="question-details">
                            <h1 className="question-details__title">{this.props.currentQuestion.title}</h1>
                            <div className="details">
                                <AuthorShortInfo author={this.props.currentQuestion.author}/>
                                <CreationDate date={this.props.currentQuestion.creationDate}/>
                            </div>
                            <div className="question-details__description">
                                {this.props.currentQuestion.description}
                            </div>
                            <TagsField redirectBasicRoute={RoutesConfig.routes.questionsList} activeTag={this.activeTag}
                                       onTagClick={this.handleTagClick} tags={this.props.currentQuestion.hashTags}/>
                        </div>
                        <Pagination
                            activePage={this.activePage}
                            handlePageBtnClick={this.handlePagesBtnClick}
                            pagesQty={Math.ceil(this.props.answersTotalQty / this.answersQtyPerPage)}
                        >
                            <AnswerListTemplate
                                disableLike={this.disableLike}
                                answers={this.props.answers}
                                user={this.props.user}
                                handleLikesClick={this.handleLikeClick}
                                handleAcceptBtnClick={this.handleAcceptBtnClick}
                            />
                        </Pagination>
                    </React.Fragment>
                )}
                {this.props.user && this.props.currentQuestion && !this.props.currentQuestion.isClosed ? (
                    <AnswerForm clearForm={this.props.isDataLoading} onSubmit={this.handleAnswerFormSubmit}/>
                ) : null}
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
        createAnswer: (data: ICreateAnswerArgs) => dispatch(createAnswer.call(data)),
        acceptAnswer: (answerId: string) => dispatch(acceptAnswer.call(answerId)),
        getQuestionAndAnswers: (requestData: IGetQuestionAndAswersArgs) =>
            dispatch(getQuestionAndAnswersByQuestionId.call(requestData)),
        addLikeToAnswer: (likeData: IAddLikeArgs) => dispatch(addLikeToAnswer.call(likeData)),
        addAnswerToUserRating: (userId: string) => dispatch(increaseAnswersQtyInUserRating.call(userId)),
        getAnswersFromRequestedPosition: (requestData: IGetAswersFromPositionArgs) =>
            dispatch(getAnswersFromRequestedPosition.call(requestData))
    };
};

export const AnswersPage = connect(mapStateToProps, mapDispatchToProps)(Answers);
