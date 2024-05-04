import { gql } from '../../../../__generated__';

export const LOGIN = gql(`
  mutation login($username: String!, $password: String!) {
    login(loginUserInput: { username: $username, password: $password }) {
      user {
        username,
        userId: id,
        firstName,
        lastName
      }
      access_token
    }
  }
`);

export const SIGNUP = gql(`
  mutation signup($firstName: String!,$lastName: String!, $username: String!, $password: String!) {
    signup(signupUserInput: { firstName: $firstName, lastName:$lastName, username: $username, password: $password }) {
      user {
        username
        userId: id,
        firstName,
        lastName
      }
      access_token
    }
}
`);
