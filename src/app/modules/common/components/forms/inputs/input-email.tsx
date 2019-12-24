import React from 'react';
import {IChangedEventArgs} from '../../../index';
import {Input} from './input';

interface IInputEmailProps {
    inputBoxClassName?: string;
    value?: string;
    name: string;
    onChanged: (values: IChangedEventArgs) => void;
}

interface IInputEmailState {
}

export class InputEmail extends React.Component<IInputEmailProps, IInputEmailState> {
    isEmailValid = (email: string): boolean => {
        const regExp = /^[a-z0-9]+?([\.-_][a-z0-9]+)*@[a-z0-9]+?([\.-][a-z0-9]+)*\.[a-z0-9]{2,3}$/i;
        const result: boolean = regExp.test(email);

        return result;
    };

    render() {
        return (
            <Input
                inputType={'Email'}
                validationFunction={this.isEmailValid}
                inputBoxClassName={this.props.inputBoxClassName}
                onChanged={this.props.onChanged}
                valueToInsert={this.props.value}
                name={this.props.name}
                maxLength={40}
                placeholder={'Enter your e-mail'}
                errorMessage={'Please verify e-mail address'}
            />
        );
    }
}


