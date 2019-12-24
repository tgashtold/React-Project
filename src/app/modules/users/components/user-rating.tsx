import React from 'react';
import {User, UserRatingItem} from '../../../modules/users';


interface IUserRatingProps {
    userRating: any;
}

interface IUserRatingState {
}

export class UserRating extends React.Component<IUserRatingProps, IUserRatingState> {
    render() {
        return (
            <div className="rating">
                <UserRatingItem ratingItemTitle={'My questions'}
                                ratingItemValue={this.props.userRating.questionsTotal}/>
                <UserRatingItem ratingItemTitle={'My answers'} ratingItemValue={this.props.userRating.answersTotal}/>
                <UserRatingItem ratingItemTitle={'My answers liked by other users'}
                                ratingItemValue={this.props.userRating.answersLikedByOthers}/>
                <UserRatingItem ratingItemTitle={'My answers accepted by other users'}
                                ratingItemValue={this.props.userRating.answersAcceptedByOthers}/>
            </div>
        );
    }
}

