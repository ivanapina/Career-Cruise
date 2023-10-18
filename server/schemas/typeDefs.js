const typeDefs = `#graphql
  type User {
    _id: ID
    firstName: String
    email: String
    github: String
    linkedin: String
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

  type Mutation {
    
  }
`

module.exports = typeDefs;