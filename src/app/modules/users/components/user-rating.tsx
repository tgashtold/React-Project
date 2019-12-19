import React from 'react';
import User from '../../../models/User';

interface IUserRatingProps {
	user: User;
}

interface IUserRatingState {}

class UserRating extends React.Component<IUserRatingProps, IUserRatingState> {
	render() {
		return (
			<div className="rating">
				<div className="rating__item">
					<span className="rating__item-title">My questions:</span>
					<span className="rating__item-value">{this.props.user.rating.questionsTotal}</span>
				</div>
				<div className="rating__item">
					<span className="rating__item-title">My answers:</span>
					<span className="rating__item-value">{this.props.user.rating.answersTotal}</span>
				</div>
				<div className="rating__item">
					<span className="rating__item-title">My answers liked by other users:</span>
					<span className="rating__item-value">{this.props.user.rating.answersLikedByOthers}</span>
				</div>
				<div className="rating__item">
					<span className="rating__item-title">My answers accepted by other users:</span>
					<span className="rating__item-value">{this.props.user.rating.answersAcceptedByOthers}</span>
				</div>
			</div>
		);
	}
}

export default UserRating;
