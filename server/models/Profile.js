const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileSchema = new Schema({
    bio: {
      type: String,
      trim: true,
    },
    skills: [String],});

    
const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;