const mongoose = require('mongoose');

const { Schema } = mongoose;
const Profile  = require ("./Profile");

const postSchema = new Schema({
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    //createdBy: [Profile.Schema]
  });

    
const Post = mongoose.model('Post', postSchema);

module.exports = Post;