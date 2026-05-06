import { gql } from '../../../__generated__';

export const GET_CHATS_FOR_USER = gql(`
  query getChatsForUser($userId: Int!, $page: Int!) {
    getChatsForUser(userId: $userId, page: $page) {
      id
      updatedAt
      ChatMembers {
        User {
          id
          avatar
          firstName
          lastName
          username
        }
      }
      Message {
        id
        userId
        createdAt
        MessageContent {
          content
        }
      }
    }
  }
`);

export const SUBSCRIBE_CHATS = gql(`
  subscription chatUpdated($userId: Int!) {
    chatUpdated(userId: $userId) {
      id
      updatedAt
      ChatMembers {
        User {
          id
          avatar
          firstName
          lastName
          username
        }
      }
      Message {
        id
        userId
        createdAt
        MessageContent {
          content
        }
      }
    }
  }
`);
