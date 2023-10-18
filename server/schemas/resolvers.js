const {User,Profile,Post} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        
        posts: async () => {
            return await Post.find({});
        },
        profiles: async () => {
            return await Profile.find({});
        }
    }
}

module.exports = resolvers;