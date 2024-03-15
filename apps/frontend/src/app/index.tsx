import { jwtDecode } from 'jwt-decode';

import Routing from 'pages';

import { UserInfo, userInfo } from 'shared/config/globalVars.ts';

import { withProviders } from './providers/withProviders.tsx';
import GlobalStyle from './styles/globalStyles.ts';
import Layout from './ui';

const App = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const payloadJWT = jwtDecode<UserInfo>(accessToken);
    userInfo({ userId: payloadJWT.userId, username: payloadJWT.username });
  }

  return (
    <Layout>
      <GlobalStyle />
      <Routing />
    </Layout>
  );
};

const AppWithProviders = withProviders(App);

export default AppWithProviders;
