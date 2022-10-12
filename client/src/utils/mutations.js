import { gql } from "@apollo/client";


export const CREATE_VOTE = gql`
  mutation createVote($_id: String!, $elo: String!) {
    createVote(_id: $_id, elo: $elo) {
      highScore
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($wallet: String!) {
    addUser(wallet: $wallet) {
      user {
        _id
       wallet
       highScore
      }
    }
  }

  
`

export const ADD_ROOM = gql`
mutation AddRoom($wallet: String!, $roomNumber: String!, $roomTime: String!, $roomColor: String!) {
  addRoom(wallet: $wallet, roomNumber: $roomNumber, roomTime: $roomTime, roomColor: $roomColor) {
    room {
      roomNumber
      roomTime
      roomColor
      users
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
  }
}
`;
