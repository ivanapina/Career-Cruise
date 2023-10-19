const typeDefs = `#graphql
  type Post{
    _id: ID 
    jobTitle:String
    jobDecription:String
    createdBy: Profile
  }

  type Profile{
    _id: ID
    name: String
    email: String
    password: String
    company: Boolean
  }
  
  type Query {
    posts: [Post]
    profiles: [Profile]
    post(id: ID!): Post
  }

  type Auth{
    toekn: ID!
    profile: Profile
  }

  type Mutation {
    addProfile(name:String!,email:String!,github:String!,linkedin:String!): Auth
    login(email:String!,password:String!): Auth
    addPost(jobTitle:String!,jobDecription: String!): Post
    removePost(jobTitle:String!):Profile
  }
`

module.exports = typeDefs;