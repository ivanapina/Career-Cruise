const {User,Profile,Post} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        }
    }
}

module.exports = resolvers;