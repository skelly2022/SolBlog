import { gql } from "@apollo/client";

export const CREATE_MATCHUP = gql`
  mutation createMatchup($tech1: String!, $tech2: String!) {
    createMatchup(tech1: $tech1, tech2: $tech2) {
      _id
      tech1
      tech2
    }
  }
`;

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
`;
