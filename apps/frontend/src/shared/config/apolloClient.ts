import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

export enum TYPE_THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

const client = new ApolloClient({
  uri: import.meta.env.API_BASE_URL,
  cache: new InMemoryCache(),
});

export const typeTheme = makeVar<TYPE_THEME>(TYPE_THEME.DARK);

export default client;
