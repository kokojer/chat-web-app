import { GlobalToken } from 'antd';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    antd: GlobalToken;
    base: {
      primary: string;
      notification: string;
      typography: {
        text: string;
        inActiveText: string;
      };
      background: {
        main: string;
        light: string;
        primary: string;
      };
      boxShadow: string;
      scrollbar: {
        track: string;
        thumb: string;
        thumbHover: string;
      };
    };
  }
}
