import React from 'react';
import { Link } from 'react-router-dom';

interface IButtonLink {
	buttonTitle: string;
	buttonRoute: string;
	disabled?: boolean;
	onSubmit?:(data: any) => void;
	clickHandler?: () => void;
	btnSpecificClassName?: string;
}

class ButtonLink extends React.Component<IButtonLink> {
	render() {
		return (
			<React.Fragment>
				<Link to={this.props.buttonRoute} className={this.props.btnSpecificClassName || ''}>
					<button onSubmit={this.props.onSubmit} onClick={this.props.clickHandler} className="button" disabled={this.props.disabled}>
						{this.props.buttonTitle}
					</button>
				</Link>
			</React.Fragment>
		);
	}
}

export default ButtonLink;
