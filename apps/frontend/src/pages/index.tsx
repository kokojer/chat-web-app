import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorPage from './error';

const AuthPage = lazy(() => import('./auth'));

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Routing;
