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
		<div className="flex-center-main-upper">
			<div className="flex-center-main border-bot">
				<div className="flex-center ">
					<i className="weight icon"></i>
				</div>
				<div className="flex-center">{date}</div>
				<div className="flex-center">{weight} lbs </div>
				<div className="button-stack">
					<div
						className="ui animated button purple column"
						onClick={() => setPost(stat)}
					>
						<div className="hidden content">Edit</div>
						<div className="visible content">
							<i className="edit icon"></i>
						</div>
					</div>

					<div
						className="ui animated button red column"
						onClick={onDelete}
					>
						<div className="hidden content">Delete</div>
						<div className="visible content">
							<i className="trash icon"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Stat;
