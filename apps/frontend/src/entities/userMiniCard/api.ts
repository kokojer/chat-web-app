import { gql } from '../../../__generated__';

export const CREATE_CHAT = gql(`
 mutation createChat($userId: Int!) {
  createChat(userId: $userId) {
    ChatMembers{
      User{
        username
      }
    }
  }
}
`);
