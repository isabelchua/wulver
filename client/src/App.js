import React from "react";
import PostState from "./components/context/PostState";
import "./App.css";
import RecordForm from "./RecordForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AlertState from "./components/context/alert/AlertState";
import AuthState from "./components/context/auth/AuthState";

function App() {
	return (
		<div className="App">
			<AuthState>
				<AlertState>
					<PostState>
						<Router>
							<Switch>
								<Route exact path="/" component={RecordForm} />

								<Route exact path="/register" component={Register} />
								<Route exact path="/login" component={Login} />
								{/* <RecordForm /> */}
							</Switch>
						</Router>
					</PostState>
				</AlertState>
			</AuthState>
		</div>
	);
}

export default App;
