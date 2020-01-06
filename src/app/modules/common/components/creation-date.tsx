import React from 'react';

interface ICreationDateProps {
    date: Date;
}

interface ICreationDateState {
}

export class CreationDate extends React.Component<ICreationDateProps, ICreationDateState> {
    render() {
        return (
            <div className="question-info">
                <span className="question-info__title">Creation:</span>
                <span className="question-info__value">{new Date(this.props.date).toLocaleDateString()}</span>
            </div>
        );
    }
}
