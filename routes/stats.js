const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { body, validationResult, check } = require("express-validator");

const User = require("../models/User");
const Stat = require("../models/Stat");

// @route	GET api/stats
// @desc		Get all users stats
// @access	Private

router.get("/", auth, async (req, res) => {
	//res.send('Get all stats');
	try {
		// -1 returns the most recent stat first
		const stats = await Stat.find({ user: req.user.id }).sort({
			date: -1
		});
		res.json(stats);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route	POST api/stats
// @desc		Add new stat
// @access	Private
//require name when editing
router.post(
	"/",
	[
		auth,
		[check("weight", "Weight is required").not().isEmpty()],
		[check("date", "Date is required").not().isEmpty()]
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { weight, date } = req.body;

		try {
			const newStat = new Stat({
				weight,
				date,
				user: req.user.id
			});
			const stat = await newStat.save();

			res.json(stat);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @route	PUT api/stats/:id
// @desc		Update stat
// @access	Private

router.put("/:id", auth, async (req, res) => {
	//res.send('Update stat');
	const { weight, date } = req.body;

	// build a stat object
	const statFields = {};
	if (weight) statFields.weight = weight;
	if (date) statFields.date = date;

	try {
		let stat = await Stat.findById(req.params.id);

		if (!stat) return res.status(404).json({ msg: "stat not found" });

		//Make sure user owns stat
		if (stat.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not Authorized" });
		}

		stat = await Stat.findByIdAndUpdate(
			req.params.id,
			{ $set: statFields },
			{ new: true }
		);

		res.json(stat);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error 4");
	}
});

// @route	DELETE api/stats/:id
// @desc		Delete stat
// @access	Private

router.delete("/:id", auth, async (req, res) => {
	//res.send('Delete stat');

	try {
		let stat = await Stat.findById(req.params.id);

		if (!stat) return res.status(404).json({ msg: "stat not found" });

		//Make sure user owns stat
		if (stat.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not Authorized" });
		}

		await stat.findByIdAndRemove(req.params.id);

		res.json({ msg: "stat removed" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error 4");
	}
});

module.exports = router;
