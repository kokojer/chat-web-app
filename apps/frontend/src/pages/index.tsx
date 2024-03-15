import { useReactiveVar } from '@apollo/client';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { userInfo } from 'shared/config/globalVars.ts';

const AuthPage = lazy(() => import('./auth'));
const ErrorPage = lazy(() => import('./error'));
const ChatPage = lazy(() => import('./chat'));

const Routing = () => {
  const userStore = useReactiveVar(userInfo);
  return (
    <Routes>
      <Route path="/" element={userStore ? <ChatPage /> : <AuthPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Routing;
