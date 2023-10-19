const {Schema, model } = require('mongoose');

const postSchema = new Schema({
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    createdBy: [
      {
        type: Schema.Types.ObjectId,
        ref:'Profile'
      }
    ]
  });

    
const Post = model('Post', postSchema);

module.exports = Post;