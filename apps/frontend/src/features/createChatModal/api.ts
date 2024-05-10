import { gql } from '../../../__generated__';

export const GET_USERS_BY_OCCURRENCES = gql(`
  query getUserByOccurrences($nameOrUsername: String!, $page: Int!) {
    getUsersByOccurrences(nameOrUsername: $nameOrUsername, page: $page) {
      avatar,
      firstName,
      lastName,
      username,
      userId: id
    }
  }
`);
