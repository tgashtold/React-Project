import React from 'react';
import {Button, ButtonLink} from '../modules/common';
import RoutesConfig from '../config/Routes.config';
import {RegistrationForm, userActions, UserInfoSection, UserPersonalInfo, UserRating} from '../modules/users';
import {IUpdatePersonalInfoArgs, IUser, IUserInfo} from '../modules/users/user.model';
import {UserQuestionsCollection} from '../modules/questions';
import {IAppState} from '../state';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

interface IUserInfoStateProps {
    user: IUserInfo | null;
}

interface IUserInfoDispatchProps {
    updateUserPersonalInfo: (personalInfo: IUpdatePersonalInfoArgs) => any;
}

interface IUserInfoProps extends IUserInfoStateProps, IUserInfoDispatchProps {
}

interface IUserInfoState {
    editPersonalInfo: boolean;
}

class UserInfo extends React.Component<IUserInfoProps, IUserInfoState> {
    constructor(props: IUserInfoProps) {
        super(props);
        this.state = {
            editPersonalInfo: false
        };
    }

    changeEditPersonalInfoMode = (user: IUser) => {
        if (this.props.user) {
            this.setState({editPersonalInfo: !this.state.editPersonalInfo});
            this.props.updateUserPersonalInfo({id: this.props.user.id, personalData: user.personalData});
        }
    };

    handleBtnEditClick = () => {
        this.setState({editPersonalInfo: !this.state.editPersonalInfo});
    };

    renderEditablePersonalInfoField = () => {
        if (this.props.user) {
            return (
                <RegistrationForm
                    passwordFieldClassName={'hidden'}
                    onSubmit={this.changeEditPersonalInfoMode}
                    formSpecificClassName={'user-info__form'}
                    insertValue={true}
                    user={this.props.user}
                    formBtnTitle={'Save'}
                />
            );
        }
    };

    renderNotEditablePersonalInfoField = () => {
        if (this.props.user) {
            return (
                <UserPersonalInfo user={this.props.user}>
                    <Button clickHandler={this.handleBtnEditClick} buttonTitle={'Edit'}/>
                </UserPersonalInfo>
            );
        }
    };

    render() {
        return (
            <div className="user-info">
                {!this.props.user
                    ? <Redirect to={`${RoutesConfig.routes.mainPage}`}/>
                    : ''
                }
                <UserInfoSection sectionTitle={'Personal information'}>
                    {this.state.editPersonalInfo
                        ? this.renderEditablePersonalInfoField()
                        : this.renderNotEditablePersonalInfoField()
                    }
                </UserInfoSection>

                <UserInfoSection sectionTitle={'My questions'}>
                    {this.props.user
                        ? <UserQuestionsCollection userQuestions={this.props.user.questions}/>
                        : ''}
                    <ButtonLink buttonTitle={'Create new question'} buttonRoute={RoutesConfig.routes.createQuestion}/>
                </UserInfoSection>

                <UserInfoSection sectionTitle={'My questions'}>
                    {this.props.user
                        ? <UserRating userRating={this.props.user.rating}/>
                        : ''}
                </UserInfoSection>
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState): IUserInfoStateProps => {
    return {
        user: state.user.user
    };
};

const mapDispatchToProps = (dispatch: any): IUserInfoDispatchProps => {
    return {
        updateUserPersonalInfo: (personalInfo: IUpdatePersonalInfoArgs) =>
            dispatch(userActions.updateUserPersonalInfo.call(personalInfo))
    };
};

export const UserInfoPage = connect(mapStateToProps, mapDispatchToProps)(UserInfo);
