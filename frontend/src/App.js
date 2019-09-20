import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Public from './Components/Public/Public';
import Admin from './Components/Admin/Admin';
import Login from './Components/Login/Login';

import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<Route render={({ location }) => (
						<Switch location={location}>
							<Route path="/admin" component={Admin} />
							<Route path="/login" component={Login} />
							<Route path="/" component={Public} />
						</Switch>
					)} />
				</Router>
			</div>
		);
	}
}

export default App;
