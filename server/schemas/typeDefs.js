const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Score {
    _id: ID
    wallet: String
    highScore: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
  }

  type Query {
    scores: [Score]!
    score(scoreId: ID!): Score
  }

  type Mutation {
    addScore(wallet: String!, highScore: String!): Score
    addComment(ScoreId: ID!, commentText: String!): Score
    removeScore(ScoreId: ID!): Score
    removeComment(ScoreId: ID!, commentId: ID!): Score
  }
`;

module.exports = typeDefs;
