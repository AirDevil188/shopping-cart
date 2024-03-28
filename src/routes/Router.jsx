import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Shop from "../components/Shop";
import ErrorPage from "./ErrorPage";
import HomePage from "../components/Home";

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Router;
