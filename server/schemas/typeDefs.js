const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Score {
    _id: ID
    wallet: String
    highScore: String
    createdAt: String
  }
  type Room {
    _id: ID
    wallet: String
    roomNumber: String
    roomTime: String
    roomColor: String
    wallet2:String
    users:String
  }

  type Auth {
    token: ID!
    user: Score
    room: Room
  }

  type Query {
    scores: [Score]!
    score(wallet: String!): Score
    rooms: [Room]!
    room(roomNumber: String!): Room
 
  }

  type Mutation {
    createVote(_id: String!,elo:String!): Score
    addUser(wallet: String!): Auth
    addRoom(wallet: String!, roomNumber: String!, roomTime: String!, roomColor: String! ): Auth
    startGame(roomNumber:String!, wallet2: String!): Room
  }
`;

module.exports = typeDefs;
