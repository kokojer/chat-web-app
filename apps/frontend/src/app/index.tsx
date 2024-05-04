import { jwtDecode } from 'jwt-decode';

import Routing from 'pages';

import { UserInfo, userInfo } from 'shared/config/globalVars.ts';

import client from '../shared/config/apolloClient.ts';
import { GET_USER } from './api.tsx';
import { withProviders } from './providers/withProviders.tsx';
import GlobalStyle from './styles/globalStyles.ts';
import Layout from './ui';

const getUser = async (accessToken: string) => {
  const payloadJWT = jwtDecode<UserInfo>(accessToken);
  const { data } = await client.query({
    query: GET_USER,
    variables: {
      id: payloadJWT.userId,
    },
  });
  userInfo({
    userId: data.getUser.id,
    username: data.getUser.username,
    firstName: data.getUser.firstName,
    lastName: data.getUser.lastName,
  });
};

const App = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) getUser(accessToken).then();

  return (
    <Layout>
      <GlobalStyle />
      <Routing />
    </Layout>
  );
};

const AppWithProviders = withProviders(App);

export default AppWithProviders;
