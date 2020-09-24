const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult, check } = require("express-validator");

const User = require("../models/User");

// @route	POST api/users
// @desc		Register a user
// @access	Public

router.post(
	"/",
	[
		check("name", "Please add name").not().isEmpty(),
		check("email", "Please add a valid email").isEmail(),
		check(
			"password",
			"Please enter a password with 5 or more characters!"
		).isLength({ min: 5 })
	],
	async (req, res) => {
		//res.send(req.body);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		//res.send('passed');
		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email: email });

			if (user) {
				return res.status(400).json({ msg: "User already exists!" });
			}

			user = new User({
				name,
				email,
				password
			});

			//hash password with bcrypt
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			//res.send('User Saved');
			const payload = {
				user: {
					id: user.id
				}
			};
			//lets the user log in after registering
			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 360000
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
