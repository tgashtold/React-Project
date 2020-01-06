import React from 'react';

interface IPersonalInfoItemProps {
    infoTitle: string;
    infoValue: any;
}

interface IPersonalInfoItemState {
}

export class PersonalInfoItem extends React.Component<IPersonalInfoItemProps, IPersonalInfoItemState> {
    render() {
        return (
            <div className="personal-info__item">
                <span className="personal-info__item-title">{this.props.infoTitle}:</span>
                <span className="personal-info__item-value">{this.props.infoValue}</span>
            </div>
        );
    }
}
