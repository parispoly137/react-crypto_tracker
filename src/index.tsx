import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* Provide the client to your App */}
    <QueryClientProvider client={queryClient}>
      {/* Router.tsx로부터 세팅된 Router 컴포넌트 받아옴 */}
      {/* -> App.tsx (-> Coins.tsx) */}
      <Router />
    </QueryClientProvider>
  </React.StrictMode>
);
