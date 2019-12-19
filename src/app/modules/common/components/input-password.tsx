import React from 'react';
import { IChangedEventArgs } from '../../../Utils/Interfaces';
import Input from './input';

interface IInputPasswordProps {
	inputBoxClassName?: string;
	value?: string;
	name: string;
	onChanged: (input: IChangedEventArgs) => void;
}

interface IInputPasswordState {}

class InputPassword extends React.Component<IInputPasswordProps, IInputPasswordState> {
	isPasswordValid = (password: string): boolean => {
		const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		const result: boolean = regExp.test(password);

		return result;
	};

		render() {
		return (
			<React.Fragment>
				<Input
					inputType={'password'}
					validationFunction={this.isPasswordValid}
					inputBoxClassName={this.props.inputBoxClassName}
					onChanged={this.props.onChanged}
					valueToInsert={this.props.value}
					name={this.props.name}
					placeholder={'Enter your password'}
					maxLength={15}
					errorMessage={
						'The password shall have at least 8-symbols length and contain the following symbols: 0-9, a-z and A-Z'
					}
				/>
			</React.Fragment>
		);
	}
}

export default InputPassword;

