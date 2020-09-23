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
		<div className="item">
			<div className="right floated middle aligned content">
				<div
					className="ui animated button purple"
					tabindex="0"
					onClick={() => setPost(stat)}
				>
					<div className="hidden content">Edit</div>
					<div className="visible content">
						<i className="edit icon"></i>
					</div>
				</div>
				<div
					className="ui animated button red"
					tabindex="0"
					onClick={onDelete}
				>
					<div className="hidden content">Delete</div>
					<div className="visible content">
						<i className="trash icon"></i>
					</div>
				</div>
			</div>
			<i className="weight middle aligned icon"></i>
			<div className="content middle aligned ">
				{/* <div className="header">Semantic-Org/Semantic-UI</div> */}
				{date} <b>{weight}</b>lbs{" "}
			</div>
		</div>
	);
}

export default Stat;
