const mongoose = require('mongoose');

const { Schema } = mongoose;
const User  = require ("./User");

const postSchema = new Schema({
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    //createdBy: [User.Schema]
  });

    
const Post = mongoose.model('Post', postSchema);

module.exports = Post;