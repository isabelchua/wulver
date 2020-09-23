import React from "react";
import PostState from "./components/context/PostState";

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
