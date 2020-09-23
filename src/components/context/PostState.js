import React, { useReducer } from "react";

import PostContext from "./postContext";
import postReducer from "./postReducer";
import { ADD_POST, CURRENT_POST, DELETE_POST, EDIT_POST } from "../types";
import { nanoid } from "nanoid";

const PostState = props => {
	const initialState = {
		stats: [
			{ id: 1, date: "09/19/2019", weight: 124 },
			{ id: 2, date: "09/22/2020", weight: 110 }
		],
		currentStat: null,
		current: null
	};

	const [state, dispatch] = useReducer(postReducer, initialState);

	const addPost = stat => {
		stat.id = nanoid();
		dispatch({ type: ADD_POST, payload: stat });
	};

	const deletePost = id => {
		dispatch({ type: DELETE_POST, payload: id });
	};

	const editPost = stat => {
		dispatch({ type: EDIT_POST, payload: stat });
	};

	const setPost = stat => {
		dispatch({ type: CURRENT_POST, payload: stat });
	};

	return (
		<PostContext.Provider
			value={{
				stats: state.stats,
				addPost,
				deletePost,
				editPost,
				setPost,
				current: state.current
			}}
		>
			{props.children}
		</PostContext.Provider>
	);
};

export default PostState;
