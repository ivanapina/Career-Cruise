const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Create Schema
const JobSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
	recruiterID: mongoose.Schema.Types.ObjectId,
    recruiterName: {
        type: String,
        required: true,
        trim: true
    },
    recruiterEmail: {
        type: String,
        required: true
    },
    availablePos: {
        type: Number
    },
    maxApplications: {
        type: Number
    },
    currentApplications:{
        type:Number,
        default:0
    },
    dateOfPosting: {
        type: Date
    },
    dateOfJoining: {
        type: Date
    },
    deadline: {
        type: Date
    },
    requiredSkills: [{
        type:String
    }],
    jobType: {
        type: Number
    },
    duration: {
        type: Number
    },
    salary: {
        type: Number
    },
    numRating: {
		type: Number,
		default: 0
	},
	totalRating: {
		type: Number,
		default: 0
    },
});

module.exports = User = mongoose.model("Jobs", JobSchema);
