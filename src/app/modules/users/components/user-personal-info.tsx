import React from 'react';
import User from '../../../models/User';

interface IUserInfoProps {
	user: User;
}

interface IUserInfoState {}

class UserPersonalInfo extends React.Component<IUserInfoProps, IUserInfoState> {
	render() {
		return (
			<div className="personal-info">
				<div className="personal-info__item">
					<span className="personal-info__item-title">First name:</span>
					<span className="personal-info__item-value">{this.props.user.personalData.firstName}</span>
				</div>
				<div className="personal-info__item">
					<span className="personal-info__item-title">Last name:</span>
					<span className="personal-info__item-value">{this.props.user.personalData.lastName}</span>
				</div>
				<div className="personal-info__item">
					<span className="personal-info__item-title">E-mail:</span>
					<span className="personal-info__item-value">{this.props.user.personalData.email}</span>
				</div>
				<div className="personal-info__item">
					<span className="personal-info__item-title">Preferred programming languages:</span>
					<span className="personal-info__item-value">{this.props.user.personalData.progLanguages}</span>
				</div>
				<div className="personal-info__item">
					<span className="personal-info__item-title">Working position:</span>
					<span className="personal-info__item-value">
						{this.props.user.personalData.workingPosition.length > 0 
							? this.props.user.personalData.workingPosition
							: 'no data'
						}
					</span>
				</div>
				<div className="personal-info__item">
					<span className="personal-info__item-title">Work experience:</span>
					<span className="personal-info__item-value">
						{this.props.user.personalData.workExperience.length > 0 
							? this.props.user.personalData.workExperience
							: '-'
						}
					</span>
				</div>
				{this.props.children}
			</div>
		);
	}
}

export default UserPersonalInfo;
