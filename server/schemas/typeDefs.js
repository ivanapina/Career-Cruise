const typeDefs = `
    type User {
    _id: ID
    firstName: String
    email: String
    github: String
    linkedin: String
  }

  type Query {
    users: [User]
  }
`

module.exports = typeDefs;