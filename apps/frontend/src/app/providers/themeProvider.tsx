import { useReactiveVar } from '@apollo/client';
import { ConfigProvider, theme } from 'antd';
import { PropsWithChildren } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import { TYPE_THEME, typeTheme } from 'shared/config/apolloClient';
import { getAntdTheme } from 'shared/config/getAntdTheme';
import {
  darkStyledTheme,
  lightStyledTheme,
} from 'shared/config/styledTheme.ts';

const CombinedThemeProvider = ({ children }: PropsWithChildren) => {
  const { token } = theme.useToken();
  const themeType = useReactiveVar(typeTheme);
  const actualTheme =
    themeType === TYPE_THEME.LIGHT ? lightStyledTheme : darkStyledTheme;

  const combineTheme: DefaultTheme = {
    antd: token,
    base: actualTheme,
  };

  const antdTheme = getAntdTheme(actualTheme, themeType);

  return (
    <ConfigProvider theme={antdTheme}>
      <ThemeProvider theme={combineTheme}>{children}</ThemeProvider>
    </ConfigProvider>
  );
};

export default CombinedThemeProvider;
