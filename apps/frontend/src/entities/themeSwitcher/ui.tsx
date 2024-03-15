import { BulbFilled } from '@ant-design/icons';
import { Switch } from 'antd';
import { FC, useCallback, useState } from 'react';
import styled from 'styled-components';

import { TYPE_THEME, typeTheme } from 'shared/config/globalVars.ts';

export const ThemeSwitcher: FC = () => {
  const [checked, setChecked] = useState(typeTheme() === TYPE_THEME.DARK);

  const onChangeSwitch = useCallback((checked: boolean) => {
    setChecked(checked);
    typeTheme(checked ? TYPE_THEME.DARK : TYPE_THEME.LIGHT);
    localStorage.setItem('theme', checked ? TYPE_THEME.DARK : TYPE_THEME.LIGHT);
  }, []);

  return (
    <SwitchContainer>
      <BulbFilled />
      <Switch onChange={onChangeSwitch} defaultChecked={checked} />
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
