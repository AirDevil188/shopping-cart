import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import HomePage from "../components/Home";
import App from "../App";
import ErrorPage from "../routes/ErrorPage";
import Shop from "../components/Shop";
import ProductDetails from "../components/ProductDetails";
import Cart from "../components/Cart";

const routes = [
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
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/", "/shop", "shop/products/:productID", "/shopping-cart"],
  initialIndex: 0,
});

beforeEach(() => {
  render(
    <RouterProvider router={router}>
      <HomePage />
    </RouterProvider>
  );
});

it("check if heading is in the document", () => {
  const heading = screen.getByRole("heading", {
    name: "Come as costumer stay as family!",
  });
  const heroImage = screen.getByRole("img");
  expect(heading).toBeInTheDocument();
  expect(heroImage).toBeInTheDocument();
});
