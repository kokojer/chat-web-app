import { ApolloClient, HttpLink, InMemoryCache, concat } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { jwtDecode } from 'jwt-decode';

import { gql } from '../../../__generated__';
import { userInfo } from './globalVars.ts';

export const REFRESH_TOKENS = gql(`mutation refreshTokens {
  refreshTokens {
    user {
      username
      userId: id
    }
    access_token
  }
}`);

const httpLink = new HttpLink({
  uri: import.meta.env.API_BASE_URL,
  credentials: 'include',
});

let isRefreshTokenMutation = false;

const authMiddleware = setContext(async () => {
  let accessToken = localStorage.getItem('accessToken');

  if (accessToken && !isRefreshTokenMutation) {
    const payloadJWT = jwtDecode(accessToken);
    const isTokenExpired =
      payloadJWT.exp && payloadJWT.exp * 1000 < +new Date();
    if (isTokenExpired) {
      isRefreshTokenMutation = true;

      const { data, errors } = await client.mutate({
        mutation: REFRESH_TOKENS,
        errorPolicy: 'all',
      });

      isRefreshTokenMutation = false;

      if (errors?.length) {
        localStorage.removeItem('accessToken');
        userInfo(undefined);
        window.location.replace('/');
      }

      if (data) accessToken = data?.refreshTokens.access_token;
    }

    return {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default client;
