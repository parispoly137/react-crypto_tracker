import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* theme.ts로부터 기본 theme에 대한 객체를 받아와 적용 */}
    <ThemeProvider theme={theme}>
      {/* Router.tsx로부터 세팅된 Router 컴포넌트 받아옴 */}
      {/* -> App.tsx (-> Coins.tsx) */}
      <Router />
    </ThemeProvider>
  </React.StrictMode>
);
