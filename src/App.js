import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './scss/main.scss';

import About from './components/About/About';
import Tracker from './components/Tracker/Tracker';


function App() {
	return (
		<div className="container-fluid">
		<Router>
			<div className="row">
				<nav className="navigation">
					<Link to="/" className="navigation__link">Home</Link>
					<Link to="/about" className="navigation__link">About</Link>
				</nav>
			</div>
			<Switch>
				<Route exact path="/" component={Tracker}></Route>
				<Route path="/about" component={About}></Route>
			</Switch>
		</Router>
		</div>
		);
	}
	
	export default App;
	