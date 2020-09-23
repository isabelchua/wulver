import { ADD_POST } from "../types";

export default (state, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				stats: [...state.stats, action.payload]
			};
		//case DELETE_
		default:
			return state;
	}
};
