import React, { useContext } from "react";
import PostState from "./components/context/PostState";

function Stat({ stat }) {
	//const { dispatch } = useContext(PostState);

	return (
		<div>
			<li>
				{stat.date} <b>{stat.weight}</b>lbs{" "}
				<button
				// onClick={() =>
				// 	dispatch({
				// 		type: "SET_CURRENT_NOTE",
				// 		payload: note
				// 	})
				// }
				// className="edit"
				>
					Edit 2
				</button>
				<button
				// onClick={() =>
				// 	dispatch({
				// 		type: "DELETE_NOTE",
				// 		payload: note.id
				// 	})
				// }
				// className="delete"
				>
					Delete
				</button>
			</li>
		</div>
	);
}

export default Stat;
