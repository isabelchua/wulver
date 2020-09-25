import axios from "axios";

const setAuthToken = token => {
	if (token) {
		axios.defaults.headers.common["w-auth-token"] = token;
	} else {
		delete axios.defaults.headers.common["w-auth-token"];
	}
};

export default setAuthToken;
