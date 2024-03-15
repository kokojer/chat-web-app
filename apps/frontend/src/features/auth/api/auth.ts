import { gql } from '../../../../__generated__';

export const LOGIN = gql(`
  mutation login($username: String!, $password: String!) {
    login(loginUserInput: { username: $username, password: $password }) {
      user {
        username,
        userId: id
      }
      access_token
    }
  }
`);

export const SIGNUP = gql(`
  mutation signup($username: String!, $password: String!) {
    signup(signupUserInput: { username: $username, password: $password }) {
      user {
        username
        userId: id
      }
      access_token
    }
}
`);
