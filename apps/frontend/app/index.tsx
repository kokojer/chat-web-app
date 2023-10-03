import Routing from 'pages';

import { withProviders } from './providers/withProviders.tsx';
import GlobalStyle from './styles/globalStyles.ts';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routing />
    </>
  );
};

const AppWithProviders = withProviders(App);

export default AppWithProviders;
