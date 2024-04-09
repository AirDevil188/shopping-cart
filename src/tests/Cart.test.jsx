import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
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
  initialIndex: 3,
});

beforeEach(() => {
  render(
    <RouterProvider router={router}>
      <Cart />
    </RouterProvider>
  );
});

it("Checks if Cart Heading is rendered", () => {
  const heading = screen.getByRole("heading", { name: "Your Cart: 0" });

  expect(heading).toBeInTheDocument();
});

it("Checks if the cart is empty", () => {
  const para = screen.getByRole("heading", { name: "Cart is empty" });
  expect(para).toBeInTheDocument();
});

it("Checks if product is being added", async () => {
  await userEvent.click(screen.getByText("Shop"));

  const addToCartButton = await screen.findAllByRole("button", {
    name: "Add To Cart",
  });

  await userEvent.click(addToCartButton[0]);
  await userEvent.click(addToCartButton[1]);
  await userEvent.click(screen.getByText("Cart (2)"));
  expect(await screen.findAllByRole("figure")).toBeTruthy();
});

it("Check if increment button is working", async () => {
  const productPrice = await screen.findAllByRole("status");
  const incrementButton = await screen.findAllByRole("button", { name: "+" });
  const productQuantity = await screen.findAllByTitle("quantity");
  await userEvent.click(incrementButton[0]);
  expect(productQuantity[0].textContent).toMatch(2);
  expect(productPrice[1].textContent).toMatch("Price: $219.90");
  await userEvent.click(incrementButton[0]);
  expect(productQuantity[0].textContent).toMatch(3);
  expect(productPrice[1].textContent).toMatch("Price: $329.85");
});

it("Check if subtotal is working", () => {
  const subtotal = screen.getByRole("heading", { level: 3 });
  expect(subtotal.textContent).toMatch("$352.15");
});

it("Check if decrement button is working", async () => {
  const productPrice = await screen.findAllByRole("status");
  const productQuantity = await screen.findAllByTitle("quantity");
  const decrementButton = await screen.findAllByRole("button", { name: "-" });
  await userEvent.click(decrementButton[0]);
  expect(productQuantity[0].textContent).toMatch(2);
  expect(productPrice[1].textContent).toMatch("Price: $219.90");
  await userEvent.click(decrementButton[0]);
  expect(productPrice[1].textContent).toMatch("Price: $109.95");
  expect(productQuantity[0].textContent).toMatch(1);
});

it("Check if product is deleted from cart", async () => {
  const deleteButton = await screen.findAllByRole("button", { name: "DELETE" });
  await userEvent.click(deleteButton[0]);
  await userEvent.click(deleteButton[1]);
  const para = screen.getByRole("heading", { name: "Cart is empty" });
  expect(deleteButton[0]).not.toBeInTheDocument();
  expect(deleteButton[1]).not.toBeInTheDocument();
  expect(para).toBeInTheDocument();
});
