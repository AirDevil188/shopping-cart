import { expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ProductDetails from "../components/ProductDetails";
import ShopProducts from "../components/ShopProducts";
import getData from "../helper/getData";
import { act } from "react-dom/test-utils";

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

vi.mock("../helper/getData", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useOutletContext: () => [mockCart],
  };
});

it("Expects, link to be correct", async () => {
  render(
    <BrowserRouter>
      <ShopProducts data={mockCart}></ShopProducts>
    </BrowserRouter>
  );
  const link = await screen.findAllByTitle("prod-link");
  await userEvent.click(link[0]);

  await waitFor(() => {
    expect(window.location.pathname).toBe(`/shop/products/${mockCart[0].id}`);
  });
});

it("Renders product details/page", async () => {
  getData.mockImplementation(() => {
    return { data: mockCart, error: false, loading: false };
  });

  await act(async () => {
    render(
      <BrowserRouter>
        <ProductDetails />
      </BrowserRouter>
    );

    screen.debug();
  });

  expect(screen.getByRole("figure")).toBeInTheDocument();
  expect(screen.getByRole("heading")).toBeInTheDocument();
  expect(screen.getByTitle("prod-desc")).toBeInTheDocument();
  expect(screen.getByRole("status")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "ADD TO CART" })
  ).toBeInTheDocument();
  expect(screen.getByRole("spinbutton")).toBeInTheDocument();
});

it("Renders error details/page", async () => {
  getData.mockImplementation(() => {
    return { data: null, error: true, loading: false };
  });

  await act(async () => {
    render(
      <BrowserRouter>
        <ProductDetails />
      </BrowserRouter>
    );
  });
  expect(screen.getByRole("heading", { name: "Oppps, page not found!" }));
});

it("Renders loading details/page", async () => {
  getData.mockImplementation(() => {
    return { data: null, error: false, loading: true };
  });

  await act(async () => {
    render(
      <BrowserRouter>
        <ProductDetails />
      </BrowserRouter>
    );
  });
  expect(screen.getByRole("heading", { name: "Loading posts..." }));
});
