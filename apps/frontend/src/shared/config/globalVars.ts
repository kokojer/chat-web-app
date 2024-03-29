import { makeVar } from '@apollo/client';

export enum TYPE_THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface UserInfo {
  userId: number;
  username: string;
}

export const typeTheme = makeVar<TYPE_THEME>(
  (localStorage.getItem('theme') as TYPE_THEME) || TYPE_THEME.DARK,
);

export const userInfo = makeVar<UserInfo | undefined>(undefined);
