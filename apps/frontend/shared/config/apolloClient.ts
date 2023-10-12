import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

export enum TYPE_THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

const client = new ApolloClient({
  uri: `http://localhost:${__SERVER_PORT__}`,
  cache: new InMemoryCache(),
});

export const typeTheme = makeVar<TYPE_THEME>(TYPE_THEME.DARK);

export default client;
