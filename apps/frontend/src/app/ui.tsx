import { Layout as AntdLayout } from 'antd';
import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { ThemeSwitcher } from 'entities/themeSwitcher';

const { Content } = AntdLayout;

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MainWrapper>
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
  min-height: 100vh;
  padding: 50px;
  position: relative;
`;
