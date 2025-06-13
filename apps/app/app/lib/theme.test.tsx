import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { theme } from "./theme";
import { clientHintsQueries } from "./client-hint";
import { createWrapper } from "~/lib/tests/tanstack-query";

vi.mock("vinxi/http", async (importOriginal) => ({
  ...(await importOriginal<typeof import("vinxi/http")>()),
  getCookie: vi.fn(),
  setCookie: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("🧠 Logic: next() and is()", () => {
  describe("next()", () => {
    it("should return light when current is system", () => {
      // Arrange
      const currentTheme = theme.system;

      // Act
      const result = theme.next(currentTheme);

      // Assert
      expect(result).toBe(theme.light);
    });

    it("should return dark when current is light", () => {
      // Arrange
      const currentTheme = theme.light;

      // Act
      const result = theme.next(currentTheme);

      // Assert
      expect(result).toBe(theme.dark);
    });

    it("should return system when current is dark", () => {
      // Arrange
      const currentTheme = theme.dark;

      // Act
      const result = theme.next(currentTheme);

      // Assert
      expect(result).toBe(theme.system);
    });
  });

  describe("is()", () => {
    it("should return true when theme matches", () => {
      // Arrange
      const testCases = [
        { name: "light", value: theme.light },
        { name: "dark", value: theme.dark },
        { name: "system", value: theme.system },
      ];

      for (const test of testCases) {
        // Act
        const result = theme.is(test.name, test.value);

        // Assert
        expect(result).toBe(true);
      }
    });

    it("should return false when theme doesn't match", () => {
      // Arrange
      const name = "banana";
      const value = theme.light;

      // Act
      const result = theme.is(name, value);

      // Assert
      expect(result).toBe(false);
    });
  });
});

describe("🔁 React Query: useToggle()", () => {
  it("should optimistically update and invalidate theme query", async () => {
    // Arrange
    const { wrapper, queryClient } = createWrapper();
    const newTheme = theme.dark;

    // Act
    const { result } = renderHook(() => theme.useToggle(), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({ data: newTheme });
    });

    // Assert
    expect(queryClient.getQueryData(theme.queries.get().queryKey)).toBe(newTheme);
  });
});

describe("🎯 useWithPrefference()", () => {
  it("should return client-hint theme when stored theme is 'system'", async () => {
    // Arrange
    const { wrapper, queryClient } = createWrapper();
    queryClient.setQueryData(clientHintsQueries.get().queryKey, { theme: "dark" });
    queryClient.setQueryData(theme.queries.get().queryKey, theme.system);

    // Act
    const { result } = renderHook(() => theme.useWithPrefference(), { wrapper });

    // Assert
    expect(result.current).toBe(theme.dark);
  });

  it("should return stored theme when it's not 'system'", async () => {
    // Arrange
    const { wrapper, queryClient } = createWrapper();
    const storedTheme = theme.light;

    queryClient.setQueryData(clientHintsQueries.get().queryKey, { theme: "light" });
    queryClient.setQueryData(theme.queries.get().queryKey, storedTheme);

    // Act
    const { result } = renderHook(() => theme.useWithPrefference(), { wrapper });

    // Assert
    expect(result.current).toBe(storedTheme);
  });
});
