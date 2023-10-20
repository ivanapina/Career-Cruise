const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
// Create Schema
const ApplicantSchema = new Schema({
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
	numRating: {
		type: Number,
		default: 0
	},
	totalRating: {
		type: Number,
		default: 0
	},
	education: [
		{
			institutionName: {
				type: String,
				required: true,
				trim: true
			},
			startYear: {
				type: Number,
				required: true
			},
			endYear: Number
		}
	],
	skills: [
		{type: String}
	],
	accepted :{
		type : Boolean , 
		default : false
	},
	resume: Buffer,
	image: Buffer
});

// hashes each password
ApplicantSchema.pre('save', function (next) {
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

module.exports = User = mongoose.model("Applicants", ApplicantSchema);