const { Post, Profile } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        posts: async () => {
            return await Post.find({});
        },
        profiles: async () => {
            return await Profile.find({});
        },
        post: async (parent, { postId }) => {
          return await Post.findOne({ _id: postId });
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
   
    removePost: async (parent, { jobTitle }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { jobTitle: jobTitle } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
