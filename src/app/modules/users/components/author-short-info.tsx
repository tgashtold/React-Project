import React from 'react';
import {User} from '../../users';
import {IUser} from '../../users/user.model';

interface IAuthorShortInfonProps {
    author: User | IUser;
}

interface IAuthorShortInfoState {
}

export class AuthorShortInfo extends React.Component<IAuthorShortInfonProps, IAuthorShortInfoState> {
    render() {
        const author = this.props.author;

        return (
            <div className="author-info">
                <span className="author-info__title">Author:</span>
                <span
                    className="author-info__value">{`${author.personalData.firstName} ${author.personalData.lastName}`}</span>
                <span className="author-info__rating">
					(rating
					<span className="author-info__rating-part" title="number of created questions">
						{author.rating.questionsTotal || 0}
					</span>/
					<span className="author-info__rating-part" title="number of answers">
						{author.rating.answersTotal || 0}
					</span>/
					<span className="author-info__rating-part" title="answers liked by other users">
						{author.rating.answersLikedByOthers || 0}
					</span>/
					<span className="author-info__rating-part" title="answers accepted by other users">
						{author.rating.answersAcceptedByOthers || 0}
					</span>)
				</span>
            </div>
        );
    }
}


