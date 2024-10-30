import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./layouts/Layout";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Pizza } from "./pages/Pizza";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pizza/:id",
        element: <Pizza />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);