import { vi, expect, test } from "vitest";
import { getRequestFetch } from "../helper/fetchData";

global.fetch = vi.fn();

function createFetchResponse(data) {
  return {
    json: () => new Promise((resolve) => resolve(data)),
    ok: true,
  };
}

test("makes a request to fetch data from FakeAPIStore and returns the result", async () => {
  const fakeAPIStoreResponse = [];
  fetch.mockResolvedValue(createFetchResponse(fakeAPIStoreResponse));

  const products = await getRequestFetch(
    "https://fakestoreapi.com/products?limit=5"
  );
  console.log(products);
  expect(fetch).toHaveBeenCalledWith(
    "https://fakestoreapi.com/products?limit=5"
  );
});
