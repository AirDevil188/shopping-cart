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

it("checks if heading section is in the document", () => {
  const heading = screen.getByRole("heading", {
    name: "Fresh prices, the right place to buy everything!",
  });
  const headingSection = screen.getAllByRole("generic");

  expect(heading).toBeInTheDocument();
  expect(headingSection[0]).toBeInTheDocument();
});
