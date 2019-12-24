import React from 'react';

interface IUserWelcomeMessageProps {
   userFirstName: string;
    userLastName: string;

}

interface IUserWelcomeMessageState {
}

export class UserWelcomeMessage extends React.Component<IUserWelcomeMessageProps, IUserWelcomeMessageState> {
    render() {
        return (
            <div className="welcome-message">
                <p className="welcome-message__text">Welcome in ProgAssistant, </p>
                <p className="welcome-message__user-name">{this.props.userFirstName} {this.props.userLastName}
                    <span className="welcome-message__text"> !</span></p>
            </div>
        );
    }
}