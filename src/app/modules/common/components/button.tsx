import React from 'react';
import {Link} from 'react-router-dom';

interface IButtonLink {
    buttonTitle: string;
    disabled?: boolean;
    clickHandler?: () => void;
    btnSpecificClassName?: string;
}

export class Button extends React.Component<IButtonLink> {
    render() {
        return (
            <button onClick={this.props.clickHandler}
                    className={`button ${this.props.btnSpecificClassName || ''}`} disabled={this.props.disabled}>
                {this.props.buttonTitle}
            </button>

        );
    }
}


