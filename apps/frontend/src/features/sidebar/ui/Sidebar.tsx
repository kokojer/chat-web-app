import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useReactiveVar } from '@apollo/client';
import { Layout as AntdLayout, Avatar, Button, Flex, Typography } from 'antd';
import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { SidebarButton } from 'entities/sidebarButton';

import { userInfo } from 'shared/config/globalVars.ts';
import { ROUTES_WITH_SIDEBAR } from 'shared/config/routes.ts';

import { LogoutButton } from '../../../entities/logoutButton';

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
          <Avatar size={collapsed ? 32 : 96} icon={<UserOutlined />} />
          <Name $hide={collapsed}>
            {userStore?.firstName} {userStore?.lastName}
          </Name>
        </Flex>
        <Flex vertical gap={10} flex={1}>
          {ROUTES_WITH_SIDEBAR.map((route) => (
            <SidebarButton
              route={route.pathname}
              key={route.pathname}
              buttonText={route.text}
              Icon={route.icon}
              active={route.pathname === pathname}
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
  transition: all 0.2s;
  opacity: ${({ $hide }) => ($hide ? '0' : '1')};
  white-space: nowrap;
`;
