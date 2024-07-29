import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useReactiveVar } from '@apollo/client';
import { Layout as AntdLayout, Button, Flex, Typography } from 'antd';
import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Avatar } from 'entities/avatar';
import { LogoutButton } from 'entities/logoutButton';
import { SidebarButton } from 'entities/sidebarButton';

import { userInfo } from 'shared/config/globalVars.ts';
import { SIDEBAR_ROUTES } from 'shared/config/routes.ts';

const { Sider } = AntdLayout;

export const Sidebar: FC = () => {
  const { pathname } = useLocation();
  const userStore = useReactiveVar(userInfo);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContainer
      width={250}
      collapsible
      trigger={null}
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      collapsedWidth={50}
    >
      <Flex align="stretch" vertical gap={40}>
        <ShowSidebarButton
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <Flex align="center" vertical gap={10}>
          <Avatar collapsed={collapsed} />
          <Name $hide={collapsed}>
            {userStore?.firstName} {userStore?.lastName}
          </Name>
        </Flex>
        <Flex vertical gap={10} flex={1}>
          {SIDEBAR_ROUTES.map((route) => (
            <SidebarButton
              route={route.pathname}
              key={route.pathname}
              buttonText={route.text}
              Icon={route.icon}
              active={pathname.startsWith(route.pathname)}
              sidebarCollapsed={collapsed}
            />
          ))}
        </Flex>
        <LogoutButton sidebarCollapsed={collapsed} />
      </Flex>
    </SidebarContainer>
  );
};

const SidebarContainer = styled(Sider)`
  padding-top: 60px;
  padding-bottom: 40px;
  min-height: 100%;
  box-shadow: 0 0 50px 1px ${({ theme }) => theme.base.boxShadow};

  & > div > div {
    height: 100%;
  }

  &.ant-layout-sider {
    background: none;
  }

  .ant-avatar {
    transition: 0.2s;
  }
`;

const ShowSidebarButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Name = styled(Typography)<{ $hide: boolean }>`
  font-size: 18px;
  max-height: 30px;
  padding: 0 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  width: 100%;
  transition: all 0.2s;
  opacity: ${({ $hide }) => ($hide ? '0' : '1')};
  white-space: nowrap;
`;
