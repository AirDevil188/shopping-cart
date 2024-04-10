import {
  BrowserRouter,
  RouterProvider,
  createMemoryRouter,
  useOutletContext,
} from "react-router-dom";
import { getByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import HomePage from "../components/Home";
import App from "../App";
import ErrorPage from "../routes/ErrorPage";
import Shop from "../components/Shop";
import ProductDetails from "../components/ProductDetails";
import Cart from "../components/Cart";
import CartProducts from "../components/CartProducts";

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

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useOutletContext: () => [mockCart],
  };
});

const mockCart = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    quantity: 1,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/", "/shop", "shop/products/:productID", "/shopping-cart"],
  initialIndex: 3,
});

it("Checks if the product is being rendered properly", async () => {
  render(
    <BrowserRouter>
      <CartProducts data={mockCart}></CartProducts>
    </BrowserRouter>
  );
  expect(screen.getByRole("figure")).toBeInTheDocument();
  expect(screen.getByRole("figure")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "+" }));
  expect(screen.getByRole("button", { name: "-" }));
  expect(screen.getByTitle("quantity"));
});

it("Checks if number of products in cart is one", async () => {
  render(
    <BrowserRouter>
      <Cart></Cart>
    </BrowserRouter>
  );

  screen.debug();
  expect(screen.getByRole("heading", { name: "Your Cart: 1" }));
});

it("Checks if increment button is function is called", async () => {
  const handleClickIncrement = vi.fn();
  render(
    <BrowserRouter>
      <CartProducts
        data={mockCart}
        handleIncrement={handleClickIncrement}
      ></CartProducts>
    </BrowserRouter>
  );

  const incrementButton = screen.getByRole("button", { name: "+" });
  await userEvent.click(incrementButton);
  expect(handleClickIncrement).toBeCalled();
});

it("Checks if decrement button is function is called", async () => {
  const handleClickDecrement = vi.fn();
  render(
    <BrowserRouter>
      <CartProducts
        data={mockCart}
        handleDecrement={handleClickDecrement}
      ></CartProducts>
    </BrowserRouter>
  );

  const decrementButton = screen.getByRole("button", { name: "-" });
  await userEvent.click(decrementButton);
  expect(handleClickDecrement).toBeCalled();
});

it("Checks if increment button is function is called", async () => {
  const handleClickDelete = vi.fn();
  render(
    <BrowserRouter>
      <CartProducts
        data={mockCart}
        handleDelete={handleClickDelete}
      ></CartProducts>
    </BrowserRouter>
  );

  const deleteButton = screen.getByRole("button", { name: "DELETE" });
  await userEvent.click(deleteButton);
  expect(handleClickDelete).toBeCalled();
});
