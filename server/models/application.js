const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Create Schema
const ApplicationSchema = new Schema({
	applicantID: mongoose.Schema.Types.ObjectId,
	recruiterID: mongoose.Schema.Types.ObjectId,
	jobID: mongoose.Schema.Types.ObjectId,
	dateOfApplication: Date,
	SOP: {
		type: String,
		required: true,
		trim: true
	},
	status: {
		type: Number,
		default: 0
	}
});

module.exports = User = mongoose.model("Applications", ApplicationSchema);