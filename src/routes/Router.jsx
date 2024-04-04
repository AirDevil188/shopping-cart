import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Shop from "../components/Shop";
import Cart from "../components/Cart";
import ErrorPage from "./ErrorPage";
import HomePage from "../components/Home";
import ProductDetails from "../components/ProductDetails";
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

        {
          path: "shop/products/:productID",
          element: <ProductDetails />,
        },
        { path: "/shopping-cart", element: <Cart /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default Router;
