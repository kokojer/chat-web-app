import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const AuthPage = lazy(() => import('./auth'));

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default Routing;
