import React, { useReducer } from "react";
import axios from "axios";
import PostContext from "./postContext";
import postReducer from "./postReducer";
import {
	ADD_POST,
	CLEAR_CURRENT,
	CURRENT_POST,
	DELETE_POST,
	EDIT_POST,
	POST_ERROR,
	GET_POSTS,
	CLEAR_ERRORS
} from "../types";
import { nanoid } from "nanoid";

const PostState = props => {
	const initialState = {
		stats: [
			{ id: 1, date: "09/19/2019", weight: 124 },
			{ id: 2, date: "09/22/2020", weight: 110 }
		],
		currentStat: null,
		current: null,
		error: null
	};

	const [state, dispatch] = useReducer(postReducer, initialState);

	// get contacts
	const getPosts = async () => {
		try {
			const res = await axios.get("/api/stats");
			dispatch({ type: GET_POSTS, payload: res.data });
		} catch (err) {
			dispatch({ type: POST_ERROR, payload: err.resonse.msg });
		}
	};

	//add post

	const addPost = async stat => {
		//stat.id = nanoid();
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		try {
			const res = await axios.post("/api/stats", stat, config);
			dispatch({ type: ADD_POST, payload: res.data });
		} catch (err) {
			dispatch({ type: POST_ERROR, payload: err.resonse.msg });
		}
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

	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	return (
		<PostContext.Provider
			value={{
				stats: state.stats,
				addPost,
				deletePost,
				editPost,
				setPost,
				clearCurrent,
				getPosts,
				error: state.error,
				current: state.current
			}}
		>
			{props.children}
		</PostContext.Provider>
	);
};

export default PostState;
