import React from "react";
import PostState from "./components/context/PostState";
import "./App.css";
import RecordForm from "./RecordForm";

function App() {
	return (
		<div className="App">
			<PostState>
				<RecordForm />
			</PostState>
		</div>
	);
}

export default App;
