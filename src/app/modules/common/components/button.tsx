import React from 'react';

interface IButtonLink {
	buttonTitle: string;
	btnSpecificClassName?: string;	
	disabled?: boolean;
	clickHandler?: () => void;
}

export class Button extends React.Component<IButtonLink> {
	render() {
		return (
			<button
				onClick={this.props.clickHandler}
				className={`button ${this.props.btnSpecificClassName || ''}`}
				disabled={this.props.disabled}
			>
				{this.props.buttonTitle}
			</button>
		);
	}
}
