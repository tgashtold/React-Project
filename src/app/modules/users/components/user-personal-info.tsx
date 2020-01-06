import React from 'react';
import {PersonalInfoItem} from '../../users';
import {IUserInfo} from '../../users/user.model';

interface IUserInfoProps {
    user: IUserInfo;
}

interface IUserInfoState {
}

export class UserPersonalInfo extends React.Component<IUserInfoProps, IUserInfoState> {
    render() {
        return (
            <div className="personal-info">
                <PersonalInfoItem infoTitle={'First name'} infoValue={this.props.user.personalData.firstName}/>
                <PersonalInfoItem infoTitle={'Last name'} infoValue={this.props.user.personalData.lastName}/>
                <PersonalInfoItem infoTitle={'E-mail'} infoValue={this.props.user.personalData.email}/>
                <PersonalInfoItem
                    infoTitle={'Preferred programming languages'}
                    infoValue={this.props.user.personalData.progLanguages.join(',  ')}
                />
                <PersonalInfoItem
                    infoTitle={'Working position'}
                    infoValue={
                        this.props.user.personalData.workingPosition.length > 0
                            ? this.props.user.personalData.workingPosition
                            : 'no data'
                    }
                />
                <PersonalInfoItem
                    infoTitle={'Work experience'}
                    infoValue={
                        this.props.user.personalData.workExperience.length > 0
                            ? this.props.user.personalData.workExperience
                            : '-'
                    }
                />
                {this.props.children}
            </div>
        );
    }
}
