import React from 'react';
import {questionActions, QuestionTemplate} from '../modules/questions';
import {ButtonLink, SearchFrom, TagsField} from '../modules/common';
import {IUserInfo} from '../modules/users/user.model';
import {IQuestionInfo} from '../modules/questions/question.model';
import {connect} from 'react-redux';
import RoutesConfig from '../config/Routes.config';
import {IAppState} from '../state';
import loader from '../../assets/images/loader.gif';
import {RouteComponentProps} from 'react-router-dom';
import {RouteService} from '../services';

interface IQuestionsParams {
    tag: string;
}

interface IQuestionsListStateProps {
    user: IUserInfo | null;
    questions: Array<IQuestionInfo>;
    isQuestionUploading: boolean;
    tags: Array<string>;
    isFilterProcess: boolean;
}

interface IQuestionsListDispatchProps {
    getQuestions: () => Array<IQuestionInfo>;
    searchQuestions: (searchedText: string) => any;
    getQuestionsByTag: (tag: string) => any;
    getQuestionsTags: () => any;
}

interface IQuestionsListProps extends IQuestionsListStateProps, IQuestionsListDispatchProps {
}

interface IQuestionsListState {
    activeTag: string;
    searchedValue: string;
}

class QuestionsList extends React.Component<RouteComponentProps<IQuestionsParams> & IQuestionsListProps,
    IQuestionsListState> {
    constructor(props: RouteComponentProps<IQuestionsParams> & IQuestionsListProps) {
        super(props);
        this.state = {
            activeTag: this.props.match.params.tag && !this.props.location.search
                ? this.props.match.params.tag
                : '',
            searchedValue: RouteService.getSearchValueFromLoactionSearch(this.props.location.search) || '',
        };
    }

    componentWillMount() {
        const searchedTag: string | undefined = this.props.match.params.tag;
        const searchedText: string | undefined = this.props.location.search;
console.log('rerender')
        if (searchedText) {
            this.props.searchQuestions(RouteService.getSearchValueFromLoactionSearch(searchedText));
        } else if (searchedTag && !searchedText) {
            this.props.getQuestionsByTag(searchedTag);
        } else {
            this.props.getQuestions();
        }

        this.props.getQuestionsTags();
    }

    getQuestionsTemplate = (): any => {
        return this.props.questions.map((question: IQuestionInfo) => (
            <QuestionTemplate
                key={question.id}
                question={question}
                specificWrapperClass={'question-wrapper'}
                specificLinkClass={'question__link'}
                specificTitleClass={'question__title'}
            />
        ));
    };

    renderQuestions = (): any => {
        return this.props.questions.length > 0
            ? this.getQuestionsTemplate()
            : <p className="info-message">no questions</p>;
    };

    handleSearchFormSubmit = (searchText: string) => {
        this.props.searchQuestions(searchText);
        this.setState({searchedValue: searchText, activeTag: ''});
    };

    handleTagClick = (tagName: string) => {
        this.props.getQuestionsByTag(tagName);
        this.setState({activeTag: tagName, searchedValue: ''});
    };

    render() {
        return (
            <div className="questions-wrapper">
                <div className="questions">
                    <h1 className="questions__head">Questions List</h1>
                    <SearchFrom
                        isActive={!this.props.isFilterProcess}
                        searchedValue={this.state.searchedValue}
                        basicRoute={RoutesConfig.routes.questionsList}
                        searchRoute={RouteService.getQuestionsSearchRoute()}
                        onSubmit={this.handleSearchFormSubmit}
                    />
                    {this.props.isQuestionUploading
                        ? <img src={loader} alt="Loading ..."/>
                        : this.renderQuestions()}
                    {this.props.user
                        ? <div className="button-wrapper">
                            <ButtonLink
                                buttonTitle={'Create new question'}
                                buttonRoute={RoutesConfig.routes.createQuestion}
                            />
                        </div>
                        : null}
                </div>
                <TagsField
                    redirectBasicRoute={RoutesConfig.routes.questionsList}
                    activeTag={this.state.activeTag}
                    tags={this.props.tags}
                    onTagClick={this.handleTagClick}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState): IQuestionsListStateProps => {
    return {
        user: state.user.user,
        questions: state.questions.questions,
        isQuestionUploading: state.questions.isDataLoading,
        tags: state.questions.tags,
        isFilterProcess: state.questions.isFilterProcess,
    };
};

const mapDispatchToProps = (dispatch: any): IQuestionsListDispatchProps => {
    return {
        getQuestions: () => dispatch(questionActions.getQuestions.call()),
        searchQuestions: (searchedText: string) => dispatch(questionActions.searchQuestionsByTitle.call(searchedText)),
        getQuestionsByTag: (tag: string) => dispatch(questionActions.getQuestionsByTag.call(tag)),
        getQuestionsTags: () => dispatch(questionActions.getQuestionsTags.call())
    };
};

export const QuestionsListPage = connect(mapStateToProps, mapDispatchToProps)(QuestionsList);
