import React, { useReducer } from "react";

import PostContext from "./postContext";
import postReducer from "./postReducer";
import { ADD_POST } from "../types";
import { nanoid } from "nanoid";

const PostState = props => {
	const initialState = {
		stats: [
			{ id: 1, date: "09/19/2019", weight: 124 },
			{ id: 2, date: "09/22/2020", weight: 110 }
		],
		currentStat: null
	};

	const [state, dispatch] = useReducer(postReducer, initialState);

	const addPost = stat => {
		stat.id = nanoid();
		dispatch({ type: ADD_POST, payload: stat });
		// setForm(previous => ({
		// 	...previous,
		// 	stats: [...previous.stats, ...newData.stats]
		// }));
	};

	return (
		<PostContext.Provider
			value={{
				stats: state.stats,
				addPost
			}}
		>
			{props.children}
		</PostContext.Provider>
	);
};

export default PostState;
