import React from 'react';
import {IChangedEventArgs} from '../../../common';

interface ITextareaProps {
    onChanged: (values: IChangedEventArgs) => void;
    name: string;
    rowsQty: number;
    maxLength: number;
    placeholderValue: string;
    value?: string;
    clear?: boolean;
    specificAreaClassName?: string;
}

interface ITextareaState {
    enteredValue: string;
}

export class TextArea extends React.Component<ITextareaProps, ITextareaState> {
    constructor(props: any) {
        super(props);

        this.state = {enteredValue: this.props.value || ''};
    }

    componentWillUpdate() {
        if (this.props.clear) {
            this.setState({enteredValue: ''});
        }
    }

    handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const valueEnteredByUser: string = event.target.value;

        this.setState({enteredValue: valueEnteredByUser});

        if (this.isValueValid(valueEnteredByUser)) {
            this.props.onChanged({
                name: this.props.name,
                isValid: true,
                value: valueEnteredByUser
            });
        } else {
            this.props.onChanged({
                name: this.props.name,
                isValid: false,
                value: valueEnteredByUser
            });
        }
    };

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const valueEnteredByUser: string = event.target.value;

        this.setState({enteredValue: valueEnteredByUser});

        if (this.isValueValid(valueEnteredByUser)) {
            this.props.onChanged({
                name: this.props.name,
                isValid: true,
                value: valueEnteredByUser
            });
        } else {
            this.props.onChanged({
                name: this.props.name,
                isValid: false,
                value: valueEnteredByUser
            });
        }
    };

    isValueValid = (inputValue: string): boolean => {
        const result: boolean = inputValue.length > 0;

        return result;
    };

    render() {
        return (
            <textarea
                value={this.state.enteredValue}
                name={this.props.name}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                className={`${this.state.enteredValue.length > 0
                    ? 'input-approved'
                    : ''
                    } input textarea ${this.props.specificAreaClassName || ''}`}
                rows={this.props.rowsQty}
                maxLength={this.props.maxLength}
                placeholder={this.props.placeholderValue}
            />
        );
    }
}
