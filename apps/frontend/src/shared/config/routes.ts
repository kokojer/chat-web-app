import IconChat from 'assets/icon-chat.svg?react';

export enum CHAT_ROUTES {
  MAIN = '/',
  AUTH = '/auth',
  CHAT = '/chat/:id',
}

export const SIDEBAR_ROUTES = [
  {
    pathname: '/',
    text: 'Chat',
    icon: IconChat,
  },
];
