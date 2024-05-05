import { gql } from '../../../__generated__';

export const GET_USERS_BY_OCCURRENCES = gql(`
  query getUserByOccurrences($nameOrUsername: String!) {
    getUsersByOccurrences(nameOrUsername: $nameOrUsername) {
      avatar,
      firstName,
      lastName,
      username,
      userId: id
    }
  }
`);
