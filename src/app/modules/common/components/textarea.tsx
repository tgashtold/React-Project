import React from 'react';

interface ITextareaProps {
	specificaAreaClassName?: string;
	rowsQty: number;
	maxLength: number;
	placeholderValue: string;
	isValid: (isTrue: boolean) => void;
	sendEnteredValue: (value: string) => void;
}

interface ITextareaState {
	enteredValue: string;
}

class TextArea extends React.Component<ITextareaProps, ITextareaState> {
	errorMessage: string = '';

	constructor(props: any) {
		super(props);

		this.state = { enteredValue: '' };
		this.handleBlur = this.handleBlur.bind(this);
	}

	handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
		const valueEnteredByUser: string = event.target.value;

		if (this.isValueValid(valueEnteredByUser)) {
			this.setState({ enteredValue: valueEnteredByUser });

			this.props.sendEnteredValue(valueEnteredByUser);

			this.errorMessage = '';
		}
	};

	handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const valueEnteredByUser: string = event.target.value;

		this.errorMessage = '';

		this.props.sendEnteredValue(valueEnteredByUser);

		this.setState({ enteredValue: valueEnteredByUser });

		this.props.isValid(this.isValueValid(valueEnteredByUser));
	};

	isValueValid = (inputValue: string): boolean => {
		const result: boolean = inputValue.length > 0;

		return result;
	};

	render() {
		return (
			<React.Fragment>
				<textarea
					onChange={this.handleChange}
					onBlur={this.handleBlur}
					className={`${this.state.enteredValue.length > 0
						? 'input input-approved'
						: 'input'} input textarea ${this.props.specificaAreaClassName || ''}`}
					rows={this.props.rowsQty}
					maxLength={this.props.maxLength}
					placeholder={this.props.placeholderValue}
				/>
			</React.Fragment>
		);
	}
}

export default TextArea;
