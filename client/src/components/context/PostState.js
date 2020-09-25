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
	CLEAR_ERRORS,
	CLEAR_POSTS,
	USER_LOADED,
	AUTH_ERROR
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
			dispatch({ type: POST_ERROR, payload: err.response.msg });
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
			dispatch({ type: POST_ERROR, payload: err.response.msg });
		}
	};

	const deletePost = async id => {
		try {
			const res = await axios.delete(`/api/stats/${id}`);
			dispatch({ type: DELETE_POST, payload: id });
		} catch (err) {
			dispatch({ type: POST_ERROR, payload: err.response.msg });
		}
	};

	const editPost = async stat => {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		try {
			const res = await axios.put(`/api/stats/${stat._id}`, stat, config);
			dispatch({ type: EDIT_POST, payload: res.data });
		} catch (err) {
			dispatch({ type: POST_ERROR, payload: err.response.msg });
		}
	};

	const clearPosts = () => {
		dispatch({ type: CLEAR_POSTS });
	};

	const setPost = stat => {
		dispatch({ type: CURRENT_POST, payload: stat });
	};

	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	//LOAD USER
	// const loadUser = async () => {
	// 	try {
	// 		const res = await axios.get("api/auth");
	// 		dispatch({ type: USER_LOADED, payload: res.data });
	// 	} catch (err) {
	// 		dispatch({ type: AUTH_ERROR });
	// 	}
	// };

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
				clearPosts,
				error: state.error,
				current: state.current
			}}
		>
			{props.children}
		</PostContext.Provider>
	);
};

export default PostState;
