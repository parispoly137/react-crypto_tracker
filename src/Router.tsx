import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Coins from "./components/Coins";
import Coin from "./components/Coin";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Coins />,
      },
      {
        path: "/:coinId",
        element: <Coin />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
