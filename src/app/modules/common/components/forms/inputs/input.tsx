import React from 'react';
import {IChangedEventArgs} from '../../../index';

interface IInputProps {
    name: string;
    errorMessage: string;
    placeholder: string;
    inputType: string;
    validationFunction: (value: any) => boolean;
    onChanged: (values: IChangedEventArgs) => void;
    min?: number;
    max?: number;
    inputBoxClassName?: string;
    valueToInsert?: string;
    maxLength?: number;
}

interface IInputState {
    inputValue: string;
    isValid: boolean;
    errorMessage: string;
}

export class Input extends React.Component<IInputProps, IInputState> {
    constructor(props: any) {
        super(props);
        this.state = {
            inputValue: this.props.valueToInsert || '',
            isValid: !!this.props.valueToInsert,
            errorMessage: ''
        };
    }

    handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueEnteredByUser: string = event.target.value;
        const isValueValid = this.isValueValid(valueEnteredByUser);

        if (isValueValid) {
            this.setState({inputValue: valueEnteredByUser, isValid: true, errorMessage: ''});

            this.props.onChanged({
                name: this.props.name,
                value: valueEnteredByUser,
                isValid: isValueValid
            });
        } else {
            if (valueEnteredByUser.length > 0) {
                this.setState({isValid: false});
                this.setState({errorMessage: this.props.errorMessage});
            }
        }
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueEnteredByUser: string = event.target.value;
        const isValueValid = this.isValueValid(valueEnteredByUser);

        if (isValueValid) {
            this.setState({isValid: true, errorMessage: ''});
        } else {
            this.setState({isValid: false});
        }

        this.setState({inputValue: valueEnteredByUser});

        this.props.onChanged({
            name: this.props.name,
            value: valueEnteredByUser,
            isValid: isValueValid
        });
    };

    isValueValid = (value: any): boolean => {
        const result: boolean = this.props.validationFunction(value);

        return result;
    };

    render() {
        return (
            <div className={`input-wrapper ${this.props.inputBoxClassName || ''}`}>
                {this.state.errorMessage.length > 0 && <span className="error-message">{this.state.errorMessage}</span>}
                <input
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    className={this.state.isValid
                        ? 'input input-approved'
                        : 'input'}
                    type={this.props.inputType}
                    placeholder={this.props.placeholder}
                    value={this.props.valueToInsert}
                    name={this.props.name}
                    min={this.props.min}
                    max={this.props.max}
                    maxLength={this.props.maxLength}
                />
            </div>
        );
    }
}
