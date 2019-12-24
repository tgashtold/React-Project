import React from 'react';
import {IChangedEventArgs} from '../../../index';

interface IInputProps {
    inputBoxClassName?: string;
    valueToInsert?: string;
    name: string;
    onChanged: (values: IChangedEventArgs) => void;
    errorMessage: string;
    placeholder: string;
    validationFunction: (value: any) => boolean;
    inputType: string;
    min?: number;
    max?: number;
    maxLength?: number;
}

interface IInputState {
    inputValue: string;
    isValid: boolean;
}

export class Input extends React.Component<IInputProps, IInputState> {
    errorMessage: string = '';

    constructor(props: any) {
        super(props);
        this.state = {
            inputValue: this.props.valueToInsert || '',
            isValid: !!this.props.valueToInsert
        };
    }

    handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueEnteredByUser: string = event.target.value;
        const isValueValid = this.isValueValid(valueEnteredByUser);

        if (isValueValid) {
            this.errorMessage = '';
            this.setState({inputValue: valueEnteredByUser, isValid: true});

            this.props.onChanged({
                name: this.props.name,
                value: valueEnteredByUser,
                isValid: isValueValid
            });
        } else {
            if (valueEnteredByUser.length > 0) {
                this.setState({isValid: false});
                this.errorMessage = this.props.errorMessage;
            }
        }
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueEnteredByUser: string = event.target.value;
        const isValueValid = this.isValueValid(valueEnteredByUser);
        if (isValueValid) {
            this.setState({isValid: true});
            this.errorMessage = '';
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
                {this.errorMessage.length > 0 && <span className="error-message">{this.errorMessage}</span>}
                <input
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    className={
                        this.state.isValid
                            ? 'input input-approved'
                            :'input'
                    }
                    required
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


