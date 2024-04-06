import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Set local storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("Sets localStorage Item", () => {
    const mockValue = "cart";
    const mockCart = { data: "jsonData" };
    localStorage.setItem(mockValue, JSON.stringify(mockCart));
    expect(localStorage.getItem(mockValue)).toEqual(JSON.stringify(mockCart));
  });

  it("Overwrites localStorage with new data", () => {
    const mockValue = "cart";
    const mockOldCart = { data: "OldJsonData" };
    const mockNewCart = { data: "NewJsonData" };

    localStorage.setItem(mockValue, JSON.stringify(mockOldCart));
    expect(localStorage.getItem(mockValue)).toEqual(
      JSON.stringify(mockOldCart)
    );
    localStorage.setItem(mockValue, JSON.stringify(mockNewCart));
    expect(localStorage.getItem(mockValue)).toEqual(
      JSON.stringify(mockNewCart)
    );
  });
});
