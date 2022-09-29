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
