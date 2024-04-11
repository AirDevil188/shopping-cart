import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import ShopProducts from "../components/ShopProducts";

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
  {
    id: 2,
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
  {
    id: 3,
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
  {
    id: 4,
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
  {
    id: 5,
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

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useOutletContext: () => [mockCart],
  };
});

it("Renders shop with products", async () => {
  render(
    <BrowserRouter>
      <ShopProducts data={mockCart}></ShopProducts>
    </BrowserRouter>
  );

  const figureElement = await screen.findAllByRole("figure");
  const headingElement = await screen.findAllByRole("heading");
  const outputElement = await screen.findAllByRole("status");
  const addToCartButton = await screen.findAllByRole("button", {
    name: "Add To Cart",
  });

  expect(figureElement[0]).toBeInTheDocument();
  expect(figureElement[1]).toBeInTheDocument();
  expect(figureElement[2]).toBeInTheDocument();
  expect(figureElement[3]).toBeInTheDocument();
  expect(figureElement[4]).toBeInTheDocument();

  expect(headingElement[0]).toBeInTheDocument();
  expect(headingElement[1]).toBeInTheDocument();
  expect(headingElement[2]).toBeInTheDocument();
  expect(headingElement[3]).toBeInTheDocument();
  expect(headingElement[4]).toBeInTheDocument();

  expect(outputElement[0]).toBeInTheDocument();
  expect(outputElement[1]).toBeInTheDocument();
  expect(outputElement[2]).toBeInTheDocument();
  expect(outputElement[3]).toBeInTheDocument();
  expect(outputElement[4]).toBeInTheDocument();

  expect(addToCartButton[0]).toBeInTheDocument();
  expect(addToCartButton[1]).toBeInTheDocument();
  expect(addToCartButton[2]).toBeInTheDocument();
  expect(addToCartButton[3]).toBeInTheDocument();
  expect(addToCartButton[4]).toBeInTheDocument();
});

it("Expects for function to get called when the add to cart button is clicked.", async () => {
  const mockAddToCartHandler = vi.fn();
  render(
    <BrowserRouter>
      <ShopProducts
        data={mockCart}
        handleAddToCart={mockAddToCartHandler}
      ></ShopProducts>
    </BrowserRouter>
  );
  const addToCartButton = await screen.findAllByRole("button", {
    name: "Add To Cart",
  });
  await userEvent.click(addToCartButton[0]);

  screen.debug();
  expect(mockAddToCartHandler).toBeCalled();
});
