import React from 'react';
import { IChangedEventArgs } from '../../../Utils/Interfaces';
import Input from './input';

interface IInputNumberProps {
	placeholderValue: string;
	min?: number;
	max?: number;
	value?: string;
	inputBoxClassName?: string;
	name: string;
	onChanged: (input: IChangedEventArgs) => void;
}

interface IInputNumberState {
	enteredValue: string;
}

class InputNumber extends React.Component<IInputNumberProps, IInputNumberState> {
	min = this.props.min || 0;
	max = this.props.max || 50;

	isValueValid = (inputValue: string): boolean => {
		const result = inputValue.length > 0 && +inputValue >= this.min && +inputValue <= this.max;
		return result;
	};

	render() {
		return (
			<React.Fragment>
				<Input
					inputType={'number'}
					validationFunction={this.isValueValid}
					inputBoxClassName={this.props.inputBoxClassName}
					onChanged={this.props.onChanged}
					valueToInsert={this.props.value}
					name={this.props.name}
					min={this.min}
					max={this.max}
					placeholder={this.props.placeholderValue}
					errorMessage={`The field shall contain number from ${this.min} to ${this.max}`}
				/>
			</React.Fragment>
		);
	}
}

export default InputNumber;

