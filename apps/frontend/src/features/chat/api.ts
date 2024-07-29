import { gql } from '../../../__generated__';

export const GET_CHAT = gql(`
  query getChat($id: Int!) {
    getChat(id: $id){
      ChatMembers{
        User{
          id,
          avatar,
          firstName,
          lastName,
          lastVisitTime
        }
      }
    }
  }
`);

export const SUBSCRIBE_CHAT = gql(`
  subscription messageAdded($chatId: Int!) {
    messageAdded(chatId: $chatId) {
      userId
      createdAt
      MessageContent {
        content
      }
    }
  }
`);

export const GET_CHAT_MESSAGES = gql(`
  query getChatMessages($chatId: Int!, $page: Int!) {
    getChatMessages(chatId: $chatId, page:$page){
      userId
      createdAt
      MessageContent{
        content
      }
    }
  }
`);

export const SEND_MESSAGE = gql(`
  mutation addMessage ($chatId: Int!, $text: String!) {
    addMessage(createMessageInput:{
      chatId: $chatId,
      text: $text,
    }){
      chatId
    }
  }
`);
