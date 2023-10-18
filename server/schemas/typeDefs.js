const typeDefs = `#graphql
  type User {
    _id: ID
    firstName: String
    email: String
    github: String
    linkedin: String
    profile: Profiles
  }

  type Posts{
    _id: ID 
  }

  type Profiles{
    _id: ID
    bio: String
    skills: [String]
  }
  
  type Query {
    users: [User]
    posts: [Posts]
    profiles: [Profiles]
  }

  type Auth{
    toekn: ID!
    user: User
  }

  type Mutation {
    addUser(firstName: String!,lastName: String!,email:String!,github:String!,linkedin:String!): Auth
    login(email:String!,password:String!): Auth
    
  }
`

module.exports = typeDefs;