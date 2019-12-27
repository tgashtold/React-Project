import React from 'react';

interface IUserInfoSectionProps {
	sectionTitle: string;
}

interface IUserInfoSectionState {}

export class UserInfoSection extends React.Component<IUserInfoSectionProps, IUserInfoSectionState> {
	render() {
		return (
			<section className="user-info__section">
				<h2 className="user-info__section-head">
					<div className="user-info__section-decor" />
					<span className="user-info__section-title">{this.props.sectionTitle}</span>
				</h2>
				<div className="user-info__section-description">{this.props.children}</div>
			</section>
		);
	}
}
