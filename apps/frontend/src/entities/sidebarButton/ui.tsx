import { Button, Typography } from 'antd';
import { FC, FunctionComponent, SVGProps } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface SidebarButtonProps {
  route: string;
  buttonText: string;
  Icon: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  active: boolean;
  sidebarCollapsed: boolean;
}

export const SidebarButton: FC<SidebarButtonProps> = ({
  route,
  buttonText,
  Icon,
  active,
  sidebarCollapsed,
}: SidebarButtonProps) => {
  return (
    <NavLink to={route}>
      <StyledButton
        type="link"
        $active={active}
        $sidebarCollapsed={sidebarCollapsed}
      >
        <Icon />
        <Typography>{buttonText}</Typography>
      </StyledButton>
    </NavLink>
  );
};

const StyledButton = styled(Button)<{
  $active: boolean;
  $sidebarCollapsed: boolean;
}>`
  width: 100%;
  position: relative;
  display: flex;
  padding: ${({ $sidebarCollapsed }) =>
    $sidebarCollapsed ? '0 0 0 12px' : '0 0 0 30px'};
  transition: all 0.2s;
  gap: 12px;
  height: 40px;
  align-items: center;
  ${({ $active }) =>
    $active &&
    `&::after {
    content: '';
    position: absolute;
    top: 0;
    left: -1px;
    width: 3px;
    border-radius: 3px;
    box-shadow: 2px 0 15px 1px #2a8bf2;
    height: 100%;
    background: #2a8bf2;
  }`};

  rect {
    fill: ${({ $active }) => ($active ? '#2a8bf2' : '#707C97')};
  }

  svg {
    min-width: 24px;
  }

  article {
    color: ${({ $active }) => ($active ? '#2a8bf2' : '#707C97')};
    font-weight: 700;
    text-transform: uppercase;
    transition: all 0.2s;
    opacity: ${({ $sidebarCollapsed }) => ($sidebarCollapsed ? '0' : '1')};
    display: ${({ $sidebarCollapsed }) =>
      $sidebarCollapsed ? 'none' : 'block'};
  }
`;
