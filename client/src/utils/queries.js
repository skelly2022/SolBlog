import { gql } from "@apollo/client";

export const QUERY_SCORES = gql`
  query getScores {
    scores {
      _id
      wallet
      highScore
      elo
      createdAt
    }
  }
`;

export const QUERY_SCORESELO = gql`
  query getScoresElo {
      scoresElo {
        elo
      wallet
      userName
    }
  }
`;
export const QUERY_SCORE = gql`
  query score($wallet: String!) {
    score(wallet: $wallet) {
      _id
      wallet
      userName
      highScore
      elo
      createdAt
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
    elo
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
