const { Post } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    posts: async () => {
      return Post.find();
    },

    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
    },

  },

  Mutation: {
    addPost: async (parent, { jobTitle, jobDescription }) => {
      const post = await Post.create({ jobTitle, jobDescription });
      const token = signToken(profile);

      return { token, post };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },
   
    removePost: async (parent, { post }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { post: post } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
