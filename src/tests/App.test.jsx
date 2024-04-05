import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { describe, expect, it, vi } from "vitest";
import Router from "../routes/Router";
import userEvent from "@testing-library/user-event";

vi.mock("../components/Home", () => ({
  default: () => {
    return <>Mock Home Page</>;
  },
}));

vi.mock("../components/Shop", () => ({
  default: () => {
    return <>Mock Shop Page</>;
  },
}));

vi.mock("../components/Cart", () => ({
  default: () => {
    return <>Mock Cart Page</>;
  },
}));

describe("App component", () => {
  it("renders layout correctly", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("routes to Shop page when Shop link is clicked", async () => {
    render(
      <Router>
        <App />
      </Router>
    );
    await userEvent.click(screen.getByText("Shop"));
    await waitFor(() => {
      expect(screen.getByText("Mock Shop Page")).toBeInTheDocument();
    });
    expect(screen.queryByText("Mock Home Page")).not.toBeInTheDocument();
    expect(screen.queryByText("Mock Cart Page")).not.toBeInTheDocument();
  });

  it("routes to Cart page when Cart link is clicked", async () => {
    render(
      <Router>
        <App />
      </Router>
    );
    await userEvent.click(screen.getByText("Cart (0)"));
    await waitFor(() => {
      expect(screen.getByText("Mock Cart Page")).toBeInTheDocument();
    });
    expect(screen.queryByText("Mock Home Page")).not.toBeInTheDocument();
    expect(screen.queryByText("Mock Shop Page")).not.toBeInTheDocument();
  });
});
