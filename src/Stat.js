import React, { useContext } from "react";
//import PostState from "./components/context/PostState";
import PostContext from "./components/context/postContext";

function Stat({ stat }) {
	const postContext = useContext(PostContext);
	const { deletePost, setPost, clearCurrent } = postContext;

	const { id, date, weight } = stat;

	const onDelete = () => {
		deletePost(id);
		clearCurrent();
	};

	return (
		<div>
			<li>
				{date} <b>{weight}</b>lbs{" "}
				<button onClick={() => setPost(stat)}>Edit</button>
				<button onClick={onDelete} className="delete">
					Delete
				</button>
			</li>
		</div>
	);
}

export default Stat;
