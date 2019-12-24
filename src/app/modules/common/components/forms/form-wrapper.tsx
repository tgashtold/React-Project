import React from 'react';

interface IFormWrapperProps {
    formTitle: string;

}

interface IFormWrapperState {
}

export class FormWrapper extends React.Component<IFormWrapperProps, IFormWrapperState> {
    render() {
        return (
            <div className="registration-wrapper">
                <h1 className="registration__head">{this.props.formTitle}</h1>
                {this.props.children}
            </div>
        );
    }
}