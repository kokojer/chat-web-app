import { gql } from '../../__generated__';

export const GET_USER = gql(`
  query getUser($id: Int!) {
    getUser(id: $id) {
      username,
      id
    }
  }
`);
