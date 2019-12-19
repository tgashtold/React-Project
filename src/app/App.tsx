import React from 'react';
import Routes from './Routes';
import '../assets/App.scss';
import Header from './modules/common/header/header';

class App extends React.Component {
	render() {
		return (
			<div className="App content">
				<Header />
				<main className="main">
					<Routes />
				</main>
			</div>
		);
	}
}

export default App;
