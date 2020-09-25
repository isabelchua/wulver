import {
	ADD_POST,
	AUTH_ERROR,
	CLEAR_CURRENT,
	CLEAR_POSTS,
	CURRENT_POST,
	DELETE_POST,
	EDIT_POST,
	GET_POSTS,
	POST_ERROR,
	REGISTER_FAIL,
	USER_LOADED
} from "../types";

export default (state, action) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload
			};
		case GET_POSTS:
			return {
				...state,
				stats: action.payload,
				loading: false
			};
		case ADD_POST:
			return {
				...state,
				stats: [...state.stats, action.payload],
				loading: false
			};
		case DELETE_POST:
			return {
				...state,
				stats: state.stats.filter(stat => stat._id !== action.payload),
				loading: false
			};
		case CLEAR_POSTS:
			return {
				...state,
				contacts: null,
				filtered: null,
				error: null,
				current: null
			};
		case EDIT_POST:
			return {
				...state,
				stats: state.stats.map(stat =>
					stat._id === action.payload._id ? action.payload : stat
				),
				loading: false
			};
		case CURRENT_POST:
			return { ...state, current: action.payload };
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};
		case POST_ERROR:
			return {
				...state,
				error: action.payload
			};

		default:
			return state;
	}
};
