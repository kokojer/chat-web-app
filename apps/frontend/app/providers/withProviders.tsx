import { ApolloProvider } from '@apollo/client';
import { Spin } from 'antd';
import { ReactNode, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import client from 'shared/config/apolloClient.ts';

import CombinedThemeProvider from './themeProvider.tsx';

export const withProviders = (component: () => ReactNode) => () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <CombinedThemeProvider>
        <Suspense
          fallback={<Spin delay={300} className="overlay" size="large" />}
        >
          {component()}
        </Suspense>
      </CombinedThemeProvider>
    </ApolloProvider>
  </BrowserRouter>
);
