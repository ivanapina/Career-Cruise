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
    },

    Mutation: {
        addUser: async (parent,{firstName,lastName,email,password,github,linkin,company}) => {
            const users = await User.create({firstName,lastName,email,password,github,linkin,company});
            const token = signToken(user);

            return token;
        },
        login: async (parent,{email,password}) => {
            const user = await User.findOne({email});
            
            if(!user){
                throw AuthenticationError;
            }
            const correntPw = await user.isCorrentPassword(password);
            
            if(!correntPw){
                throw AuthenticationError;
            }
            
            const token = signToken(user);
            
            return {token,user};
        },
        
    }
}

module.exports = resolvers;