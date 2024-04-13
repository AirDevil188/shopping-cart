import { BrowserRouter, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import Cart from "../components/Cart";
import CartProducts from "../components/CartProducts";

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

it("Checks if the product is being rendered properly", async () => {
  render(
    <BrowserRouter>
      <CartProducts data={mockCart}></CartProducts>
    </BrowserRouter>
  );
  expect(screen.getByTitle("li-item")).toBeInTheDocument();

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
