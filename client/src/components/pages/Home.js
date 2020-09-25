import React, { useContext, useEffect } from "react";

const Home = () => {
	const authContext = useContext(AuthContext);

	useEffect(() => {
		authContext.loadUser();
		// eslint-disable-next-line
	}, []);

	return <div className="grid-2"></div>;
};

export default Home;
