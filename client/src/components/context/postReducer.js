import {
	ADD_POST,
	CLEAR_CURRENT,
	CLEAR_POSTS,
	CURRENT_POST,
	DELETE_POST,
	EDIT_POST,
	GET_POSTS,
	POST_ERROR
} from "../types";

export default (state, action) => {
	switch (action.type) {
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
				stats: state.stats.filter(stat => stat.id !== action.payload),
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
					stat.id === action.payload.id ? action.payload : stat
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
