const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Score {
    _id: ID
    wallet: String
    highScore: String
    createdAt: String
    comments: [Comment]!
  }

  type Auth {
    token: ID!
    user: Score
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
  }

  type Query {
    scores: [Score]!
    score(wallet: String!): Score
  }

  type Mutation {
    createVote(_id: String!): Score
    addUser(wallet: String!): Auth
  }
`;

module.exports = typeDefs;
