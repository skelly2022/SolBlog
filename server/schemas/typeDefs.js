const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Score {
    _id: ID
    wallet: String
    highScore: String
    elo: String
    userName:String
    createdAt: String
  }
  type Room {
    _id: ID
    wallet: String
    roomNumber: String
    roomTime: String
    roomColor: String
    wallet2:String
    elo:String
  }

  type Auth {
    token: ID!
    user: Score
    room: Room
  }

  type Query {
    scores: [Score]!
    score(wallet: String!): Score
    scoresElo: [Score]!
    rooms: [Room]!
    room(roomNumber: String!): Room
 
  }

  type Mutation {
    createVote(_id: String!,elo:String!): Score
    addUser(wallet: String!): Score!
    addUserName(wallet: String!, userName:String!): Score!
    addRoom(wallet: String!, roomNumber: String!, roomTime: String!, roomColor: String! elo: String!  ): Auth
    startGame(roomNumber:String!, wallet2: String!): Room!
    updateElo(wallet: String!,elo:String! wallet2: String!, wallet2elo:String!): Score
  }
`;

module.exports = typeDefs;
