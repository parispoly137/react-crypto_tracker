import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import NotFound from "./NotFound";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

// Router 세팅
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // root 파일에 연결된 children 컴포넌트 정의
    children: [
      {
        path: "/",
        element: <Coins />,
      },
      {
        path: "/:coinId",
        element: <Coin />,
        children: [
          {
            path: "chart",
            element: <Chart />,
          },
          {
            path: "price",
            element: <Price />,
          },
        ],
      },
    ],
    // 위 컴포넌트들에 해당하는 url이 아닌 경우 보여주는 페이지
    errorElement: <NotFound />,
  },
]);

// -> index.tsx
export default function Router() {
  return <RouterProvider router={router} />;
}
