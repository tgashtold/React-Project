import React from 'react';

interface IUserRatingItemProps {
    ratingItemTitle: string;
    ratingItemValue: any;

}

interface IUserRatingItemState {
}

export class UserRatingItem extends React.Component<IUserRatingItemProps, IUserRatingItemState> {
    render() {
        return (
                <div className="rating__item">
                    <span className="rating__item-title">{this.props.ratingItemTitle}:</span>
                    <span className="rating__item-value">{this.props.ratingItemValue}</span>
                </div>
        );
    }
}