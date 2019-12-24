import React from 'react';
import {Link} from 'react-router-dom';

interface IButtonLink {
    buttonTitle: string;
    buttonRoute: string;
    btnSpecificClassName?: string;
}

export class ButtonLink extends React.Component<IButtonLink> {
    render() {
        return (
            <Link to={this.props.buttonRoute} className={`button ${this.props.btnSpecificClassName || ''}`}>
                {this.props.buttonTitle}
            </Link>
        );
    }
}


