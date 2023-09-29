import { ConfigProvider, Spin } from "antd";
import { ReactNode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { antdTheme } from "shared/config/antdTheme.ts";
import ThemeProvider from "./themeProvider.tsx";

export const withProviders = (component: () => ReactNode) => () => (
  <BrowserRouter>
    <ConfigProvider theme={antdTheme}>
      <ThemeProvider>
        <Suspense
          fallback={<Spin delay={300} className="overlay" size="large" />}
        >
          {component()}
        </Suspense>
      </ThemeProvider>
    </ConfigProvider>
  </BrowserRouter>
);
