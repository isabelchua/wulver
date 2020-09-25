import React from "react";
import PostState from "./components/context/PostState";
import "./App.css";
import RecordForm from "./RecordForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AlertState from "./components/context/alert/AlertState";
import AuthState from "./components/context/auth/AuthState";
import setAuthToken from "./components/utils/setAuthToken";
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	return (
		<>
			<AuthState>
				<AlertState>
					<PostState>
						<Router>
							<Navbar />
							<div className="App">
								<Alerts />
								<Switch>
									<Route exact path="/" component={RecordForm} />

									<Route exact path="/register" component={Register} />
									<Route exact path="/login" component={Login} />
								</Switch>
							</div>
						</Router>
					</PostState>
				</AlertState>
			</AuthState>
		</>
	);
}

export default App;
