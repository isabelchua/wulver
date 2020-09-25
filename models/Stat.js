const mongoose = require("mongoose");

const StatSchema = mongoose.Schema({
	//get from a specific user to only get the contacts from specific user
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users"
	},
	weight: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("stat", StatSchema);
