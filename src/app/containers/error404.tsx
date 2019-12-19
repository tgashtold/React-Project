import React from 'react';

interface IUserInfoProps {}
interface IUserInfoState {}

class Error404 extends React.Component<IUserInfoProps, IUserInfoState> {
	render() {
		return (
			<div className="error">
				<p className="error-text">Error 404 - the page is not found</p>
			</div>
		);
	}
}

export default Error404;
