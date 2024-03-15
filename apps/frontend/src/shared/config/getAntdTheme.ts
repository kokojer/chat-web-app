import { ThemeConfig, theme as antdTheme } from 'antd';
import { DefaultTheme } from 'styled-components';

import { TYPE_THEME } from './globalVars.ts';

export const getAntdTheme = (
  theme: DefaultTheme['base'],
  themeType: TYPE_THEME,
): ThemeConfig => ({
  token: {
    colorPrimary: theme.primary,
  },
  components: {
    Form: {
      fontSize: 11,
      labelFontSize: 14,
    },
  },
  algorithm:
    themeType === TYPE_THEME.DARK
      ? antdTheme.darkAlgorithm
      : antdTheme.defaultAlgorithm,
});
