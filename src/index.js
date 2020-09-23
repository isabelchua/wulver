import React from "react";
import ReactDOM from "react-dom";
import PostState from "./components/context/PostState";

import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<PostState>
			<App />
		</PostState>
	</React.StrictMode>,
	document.getElementById("root")
);
