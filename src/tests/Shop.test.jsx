import { expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../routes/ErrorPage";
import HomePage from "../components/Home";
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
  initialIndex: 1,
});

beforeEach(() => {
  render(
    <RouterProvider router={router}>
      <Shop></Shop>
    </RouterProvider>
  );
});

it("Checks if heading is in the document", () => {
  expect(
    screen.getByRole("heading", { name: "Check out our awesome new items!" })
  );
});

it("Checks if every product item has been rendered and has title, picture, price and button element", async () => {
  await waitFor(() => {
    const products = screen.getAllByRole("figure");
    const headings = screen.getAllByRole("heading", { level: 4 });
    const images = screen.getAllByRole("img");
    const price = screen.getAllByRole("status");
    const buttons = screen.getAllByRole("button");
    const totalProducts = products.length;

    expect(products).toHaveLength(totalProducts);
    expect(images).toHaveLength(totalProducts);
    expect(headings).toHaveLength(totalProducts);
    expect(price).toHaveLength(totalProducts);
    expect(buttons).toHaveLength(totalProducts);
  });
});
