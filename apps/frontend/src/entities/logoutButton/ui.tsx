import { Button, Typography } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

import IconPower from 'assets/power.svg?react';

interface LogoutButtonProps {
  sidebarCollapsed: boolean;
}

export const LogoutButton: FC<LogoutButtonProps> = ({
  sidebarCollapsed,
}: LogoutButtonProps) => {
  return (
    <StyledButton type="link" $sidebarCollapsed={sidebarCollapsed}>
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
