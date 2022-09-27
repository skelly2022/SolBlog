import { gql } from '@apollo/client';

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
