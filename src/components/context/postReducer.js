import {
	ADD_POST,
	CLEAR_CURRENT,
	CURRENT_POST,
	DELETE_POST,
	EDIT_POST
} from "../types";

export default (state, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				stats: [...state.stats, action.payload]
			};
		case DELETE_POST:
			return {
				...state,
				stats: state.stats.filter(stat => stat.id !== action.payload)
			};
		case EDIT_POST:
			return {
				...state,
				stats: state.stats.map(stat =>
					stat.id === action.payload.id ? action.payload : stat
				)
			};
		case CURRENT_POST:
			return { ...state, current: action.payload };
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};

		default:
			return state;
	}
};
