const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
// Create Schema
const RecruiterSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		// minlength: 8
	},
	contactNo: {
		type: Number
	},
	bio: {
		type:String,
		trim: true
	}
});

// hashes each password
RecruiterSchema.pre('save', function (next) {
	const user = this;

	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

module.exports = User = mongoose.model("Recruiters", RecruiterSchema);
