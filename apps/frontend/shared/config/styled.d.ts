import { GlobalToken } from 'antd';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    antd: GlobalToken;
    base: {
      black: string;
      blue: string;
      radicalRed: string;
      gray: string;
      solitude: string;
      ghostWhite: string;
      white: string;
    };
  }
}
