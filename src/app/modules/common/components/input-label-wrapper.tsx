import React from 'react';

interface IInputLabelWrapperProps {
	isRequiredField: boolean;
	labelText: string;
	labelSpecificClassName?: string;
}
interface IInputLabelWrapperState {}

class InputLabelWrapper extends React.Component<IInputLabelWrapperProps, IInputLabelWrapperState> {
	labelClassName: string = `registration-form__item + ${this.props.labelSpecificClassName}`;

	render() {
		return (
			<label
				className={`${this.props.labelSpecificClassName
					? this.props.labelSpecificClassName
					: ''} registration-form__item`}
			>
				<span className="registration-form__item-title">
					{this.props.isRequiredField && <span className="required-field">*</span>}
					{this.props.labelText}:
				</span>

				{this.props.children}
			</label>
		);
	}
}

export default InputLabelWrapper;
