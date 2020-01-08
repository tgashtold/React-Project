import React from 'react';
import loader from '../../../../assets/images/loader.gif';


interface ILoaderProps {
	isActive: boolean;
}

interface ILoaderState {}

export class Loader extends React.Component<ILoaderProps, ILoaderState | any> {
	render() {
		return (
			<React.Fragment>
        {this.props.isActive 
          ? <img src={loader} alt="Loading ..." /> 
          : this.props.children}
			</React.Fragment>
		);
	}
}
