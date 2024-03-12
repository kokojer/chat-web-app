import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(loginUserInput: { username: $username, password: $password }) {
      user {
        username
      }
      access_token
    }
  }
`;
