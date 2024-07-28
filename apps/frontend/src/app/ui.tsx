import { useReactiveVar } from '@apollo/client';
import { Layout as AntdLayout } from 'antd';
import { FC, PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Sidebar } from 'features/sidebar';

import { ThemeSwitcher } from 'entities/themeSwitcher';

import { userInfo } from '../shared/config/globalVars.ts';
import { CHAT_ROUTES } from '../shared/config/routes.ts';

const { Content } = AntdLayout;

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const userStore = useReactiveVar(userInfo);
  const showSidebar = Object.values(CHAT_ROUTES).some((route) => {
    const regex = new RegExp(`^${route.replace(/:.+(?=\/|$)/i, '.+')}$`);
    return regex.test(pathname);
  });

  return (
    <MainWrapper>
      {userStore && showSidebar && <Sidebar />}
      <ContentWrapper>
        <ThemeSwitcher />
        {children}
      </ContentWrapper>
    </MainWrapper>
  );
};

export default Layout;

const MainWrapper = styled(AntdLayout)`
  min-height: 100vh;
  background: ${({ theme }) => theme.base.background.light};
`;

const ContentWrapper = styled(Content)`
  display: flex;
  max-height: 100vh;
  padding: 50px 50px 20px 50px;
  position: relative;
`;
