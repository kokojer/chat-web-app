import { theme } from "antd";
import React from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { styledTheme } from "shared/config/styledTheme.ts";

const combinedThemeProvider = ({ children }: React.PropsWithChildren) => {
  const { token } = theme.useToken();
  const combineTheme: DefaultTheme = {
    antd: token,
    base: styledTheme,
  };

  return <ThemeProvider theme={combineTheme}>{children}</ThemeProvider>;
};

export default combinedThemeProvider;
