import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: `http://localhost:${__SERVER_PORT__}`,
  cache: new InMemoryCache(),
});

export default client;
