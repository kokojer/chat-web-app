import Routing from 'pages';

import { withProviders } from './providers/withProviders.tsx';
import GlobalStyle from './styles/globalStyles.ts';
import Layout from './ui';

const App = () => {
  return (
    <Layout>
      <GlobalStyle />
      <Routing />
    </Layout>
  );
};

const AppWithProviders = withProviders(App);

export default AppWithProviders;
