import { useMutation } from '@apollo/client';
import { Button, Typography, notification } from 'antd';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import IconPower from 'assets/power.svg?react';

import { userInfo } from '../../shared/config/globalVars.ts';
import { LOGOUT } from './api.ts';

interface LogoutButtonProps {
  sidebarCollapsed: boolean;
}

export const LogoutButton: FC<LogoutButtonProps> = ({
  sidebarCollapsed,
}: LogoutButtonProps) => {
  const [logout, { error: logoutError }] = useMutation(LOGOUT);
  const navigate = useNavigate();

  useEffect(() => {
    if (!logoutError) return;

    notification.error({
      message: 'Error!',
      description: logoutError?.message,
    });
  }, [logoutError]);

  return (
    <StyledButton
      type="link"
      $sidebarCollapsed={sidebarCollapsed}
      onClick={async () => {
        await logout();
        localStorage.removeItem('accessToken');
        userInfo(undefined);
        navigate('/');
      }}
    >
      <IconPower />
      <Typography>LOGOUT</Typography>
    </StyledButton>
  );
};

const StyledButton = styled(Button)<{
  $sidebarCollapsed: boolean;
}>`
  width: 100%;
  display: flex;
  gap: 12px;
  padding: ${({ $sidebarCollapsed }) =>
    $sidebarCollapsed ? '0 0 0 12px' : '0 0 0 30px'};
  height: 40px;
  align-items: center;
  svg {
    min-width: 24px;
  }
  article {
    font-weight: 700;
    color: #707c97;
    text-transform: uppercase;
    transition: all 0.2s;
    opacity: ${({ $sidebarCollapsed }) => ($sidebarCollapsed ? '0' : '1')};
    display: ${({ $sidebarCollapsed }) =>
      $sidebarCollapsed ? 'none' : 'block'};
  }
`;
