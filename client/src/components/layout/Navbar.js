import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/auth/authContext";
import PostContext from "../context/postContext";

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const postContext = useContext(PostContext);

	const { isAuthenticated, logout, user } = authContext;
	const { clearPosts } = postContext;

	const onLogout = () => {
		logout();
		clearPosts();
	};

	const authLinks = (
		<Fragment>
			<li>Hello {user && user.name}</li>
			<li>
				<a onClick={onLogout} href="/">
					<i className="sign-out icon"></i>{" "}
					<span className="hide-sm">Logout</span>
				</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</Fragment>
	);

	return (
		<div className="navbar bg-primary">
			<a href="/">
				<h1>
					<i className="cogs icon" /> Wulver
				</h1>
			</a>
			<ul>{isAuthenticated ? authLinks : guestLinks} </ul>
		</div>
	);
};

export default Navbar;
