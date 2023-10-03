import { ThemeConfig } from 'antd';

import { styledTheme } from './styledTheme.ts';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: styledTheme.blue,
  },
};
