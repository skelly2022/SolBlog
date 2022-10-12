import { gql } from "@apollo/client";

export const QUERY_SCORES = gql`
  query getScores {
    scores {
      _id
      wallet
      highScore
      createdAt
    }
  }
`;
export const QUERY_SCORE = gql`
  query score($wallet: String!) {
    score(wallet: $wallet) {
      _id
      highScore
    }
  }
`;

export const QUERY_ROOM = gql`
query Query($roomNumber: String!) {
  room(roomNumber: $roomNumber) {
    wallet
    roomNumber
    roomTime
    roomColor
    wallet2
    users
  }
}
`
export const QUERY_ROOMS = gql`
query Rooms {
  rooms {
    wallet
    roomNumber
    roomTime
    roomColor
  }
}
`;
