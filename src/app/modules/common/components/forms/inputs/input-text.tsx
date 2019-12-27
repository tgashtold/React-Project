import React from 'react';
import { IChangedEventArgs } from '../../../index';
import { Input } from './input';

interface IInputTextProps {	
	onChanged: (input: IChangedEventArgs) => void;
	placeholderValue: string;
	name: string;
	inputBoxClassName?: string;
	value?: string;

}

interface IInputTextState {}

export class InputText extends React.Component<IInputTextProps, IInputTextState> {
	isValueValid = (inputValue: string): boolean => {
		const regExp = /^[a-z]([-\s]?[a-z0-9]){2,30}$/i;
		const result: boolean = regExp.test(inputValue);

		return result;
	};

	render() {
		return (
			<Input
				inputType={'text'}
				validationFunction={this.isValueValid}
				inputBoxClassName={this.props.inputBoxClassName}
				onChanged={this.props.onChanged}
				valueToInsert={this.props.value}
				name={this.props.name}
				placeholder={this.props.placeholderValue}
				maxLength={40}
				errorMessage={
					'The field shall contain 3-30 acceptable symbols: a-z, -, 0-9 and cannot start with digit or dash'
				}
			/>
		);
	}
}
