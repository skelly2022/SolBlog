import { gql } from "@apollo/client";


export const CREATE_VOTE = gql`
  mutation createVote($_id: String!, $elo: String!) {
    createVote(_id: $_id, elo: $elo) {
      highScore
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($wallet: String!){
    addUser(wallet: $wallet) {
      wallet
      highScore
      elo
    }
  }

  
`
export const UPDATE_USERNAME = gql`
mutation Mutation($wallet: String!, $userName: String!) {
  addUserName(wallet: $wallet, userName: $userName) {
    userName
    wallet
    elo
  }
}
`

export const ADD_ROOM = gql`
mutation AddRoom($wallet: String!, $roomNumber: String!, $roomTime: String!, $roomColor: String!, $elo: String!) {
  addRoom(wallet: $wallet, roomNumber: $roomNumber, roomTime: $roomTime, roomColor: $roomColor, elo: $elo) {
    room {
      wallet
      roomNumber
      roomTime
      roomColor
      wallet2
      elo
    }
  }
}
`
export const START_GAME = gql`
mutation StartGame($roomNumber: String!, $wallet2: String!) {
  startGame(roomNumber: $roomNumber, wallet2: $wallet2) {
    wallet
    roomNumber
    roomTime
    roomColor
    wallet2
    elo
  }
}
`
export const UPDATE_ELO = gql`
mutation Mutation($wallet: String!, $elo: String!, $wallet2: String!, $wallet2Elo: String!) {
  updateElo(wallet: $wallet, elo: $elo, wallet2: $wallet2, wallet2elo: $wallet2Elo) {
    elo
    wallet
  }
}
`;
