import { BulbFilled } from '@ant-design/icons';
import { Switch } from 'antd';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { TYPE_THEME, typeTheme } from 'shared/config/apolloClient';

export const ThemeSwitcher: FC = () => {
  const [checked, setChecked] = useState(typeTheme() === TYPE_THEME.DARK);

  return (
    <SwitchContainer>
      <BulbFilled />
      <Switch
        onChange={(checked) => {
          setChecked(checked);
          typeTheme(checked ? TYPE_THEME.DARK : TYPE_THEME.LIGHT);
        }}
        defaultChecked={checked}
      />
    </SwitchContainer>
  );
};

const SwitchContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  span {
    font-size: 20px;
    color: ${({ theme }) => theme.base.typography.text};
  }
`;
