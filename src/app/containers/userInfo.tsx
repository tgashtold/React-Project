import React from 'react';
import {Link} from 'react-router-dom';
import {ButtonLink, Button} from '../modules/common';
import RoutesConfig from '../config/Routes.config';
import {RegistrationForm, UserPersonalInfo, UserRating, UserInfoSection, UsersApi, User,updateUserPersonalInfo} from '../modules/users';
import {IPersonalInfo} from '../modules/users/user.model';
import {IUser} from '../modules/users/user.model';
import {UserQuestionsCollection, Question, QuestionsApi, questionsReducer} from '../modules/questions';
import {LSService} from '../services/LS-service';
import {RouteService} from '../services';
import {IQuestionAnswersObj, AnswersApi} from '../modules/answers';
import { connect } from 'react-redux';

interface IUserInfoProps {
    user: User| IUser;
    userQuestions: Array<Question>;
    answersToUserQuestionsInfo: Array<IQuestionAnswersObj>;
    updateUserPersonalInfo: (personalInfo: IPersonalInfo)=> any;
}

interface IUserInfoState {
    // user: User | IUser;
    // userQuestions: Array<Question>;
    // answersToUserQuestionsInfo: Array<IQuestionAnswersObj>;
    editPersonalInfo: boolean;
}

class UserInfo extends React.Component<IUserInfoProps, IUserInfoState> {
    constructor(props: IUserInfoProps) {
        super(props);
        this.state = {
            // userQuestions: this.props.userQuestions,
            // user: this.props.user,
            // answersToUserQuestionsInfo: this.props.answersToUserQuestionsInfo,
            editPersonalInfo: false
        };
    }

    // componentWillMount = () => {
    //     const userId = LSService.getUserIdFromLS();

    //     if (userId) {
    //         UsersApi.getUserById(userId).then((userFromDB: User) =>{console.log(userFromDB);
    //         this.setState({user: userFromDB});});
    //         QuestionsApi.getQuestions()
    //             .then((questionsFromDB: Array<Question>) => {
    //                 const userQuestionsFromDB = questionsFromDB.filter(
    //                     (question: Question) => userId === question.author.id
    //                 );
    //                 this.setState({userQuestions: userQuestionsFromDB});
    //                 return questionsFromDB;
    //             })
    //             .then((questions: Array<Question>) => {
    //                 AnswersApi.getQuestionAnswersInfoArr(
    //                     questions
    //                 ).then((questionsAnswersObjArr: Array<IQuestionAnswersObj>) => {
    //                     this.setState({answersToUserQuestionsInfo: questionsAnswersObjArr});
    //                 });
    //             });
    //     } else {
    //         RouteService.redirectToErrorPage();
    //     }
    // };

    changeEditPersonalInfoMode = (user: IUser) => {
        this.setState({editPersonalInfo: !this.state.editPersonalInfo});
        this.props.updateUserPersonalInfo(user.personalData);
    };

    handleBtnEditClick = () => {
        this.setState({editPersonalInfo: !this.state.editPersonalInfo});
    };

    getEditablePersonalInfoField = () => {
        const editablePersonalInfo = (
            <RegistrationForm
                passwordFieldClassName={'hidden'}
                onSubmit={this.changeEditPersonalInfoMode}
                btnSpecificClassName={'edit-button'}
                tagsInputSpecificClassName={'user-info__input-wrapper'}
                formSpecificClassName={'user-info__form'}
                inputBoxSpecificClassName={'user-info__input-wrapper'}
                labelSpecificClassName={'user-info__list'}
                insertValue={true}
                user={this.props.user}
                formBtnTitle={'Save'}
            />
        );

        return editablePersonalInfo;
    };

    getNotEditablePersonalInfoField = () => {
        const notEditablePersonalInfo = (
            <UserPersonalInfo user={this.props.user}>
                <Button clickHandler={this.handleBtnEditClick} buttonTitle={'Edit'}/>
            </UserPersonalInfo>
        );

        return notEditablePersonalInfo;
    };

    render() {
        return (
            <div className="user-info">
                <UserInfoSection sectionTitle={'Personal information'}>
                    {this.state.editPersonalInfo
                        ? this.getEditablePersonalInfoField()
                        : this.getNotEditablePersonalInfoField()}
                </UserInfoSection>

                <UserInfoSection sectionTitle={'My questions'}>
                    {/* раскоментить */}
                    {/* <UserQuestionsCollection userQuestions={this.props.answersToUserQuestionsInfo}/> */}
                    <ButtonLink buttonTitle={'Create new question'} buttonRoute={RoutesConfig.routes.createQuestion}/>
                </UserInfoSection>

                <UserInfoSection sectionTitle={'My questions'}>
                    <UserRating userRating={this.props.user.rating}/>
                </UserInfoSection>
            </div>
        );
    }
}


const mapStateToProps = (store: any) => {
    return {
       user: store.user,
       userQuestions: store.questions.questions,
       answersToUserQuestionsInfo: store.answers.userQuestionAnswersInfo,
   }}

   const mapDispatchToProps = (dispatch: any) => {
    return {
       updateUserPersonalInfo: (personalInfo: IPersonalInfo) =>dispatch(updateUserPersonalInfo(personalInfo)),
   }}

export const UserInfoPage = connect(mapStateToProps, mapDispatchToProps)(UserInfo);

