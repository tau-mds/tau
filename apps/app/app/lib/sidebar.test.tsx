import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { sidebar } from "./sidebar";
import { createWrapper } from "~/lib/tests/tanstack-query";
import { Splitter } from "@tau/ui";

vi.mock("vinxi/http", async (importOriginal) => ({
  ...(await importOriginal<typeof import("vinxi/http")>()),
  getCookie: vi.fn(),
  setCookie: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("sidebar", () => {
  describe("useWidth()", () => {
    it("should return the width capped at MAX_WIDTH", async () => {
      // Arrange
      const { wrapper, queryClient } = createWrapper();
      queryClient.setQueryData(sidebar.queries.get().queryKey, sidebar.MAX_WIDTH + 5);

      // Act
      const { result } = renderHook(() => sidebar.useWidth(), { wrapper });

      // Assert
      expect(result.current).toBe(sidebar.MAX_WIDTH);
    });
  });

  describe("useSetWidth()", () => {
    it("should mutate the width and update query cache", async () => {
      // Arrange
      const { wrapper, queryClient } = createWrapper();
      const newWidth = 20;

      // Act
      const { result } = renderHook(() => sidebar.useSetWidth(), { wrapper });
      await act(async () => {
        await result.current.mutateAsync({ data: newWidth });
      });

      // Assert
      expect(queryClient.getQueryData(sidebar.queries.get().queryKey)).toBe(newWidth);
    });

    it("should use MIN_WIDTH when no data provided", async () => {
      // Arrange
      const { wrapper, queryClient } = createWrapper();

      // Act
      const { result } = renderHook(() => sidebar.useSetWidth(), { wrapper });
      await act(async () => {
        await result.current.mutateAsync(undefined);
      });

      // Assert
      expect(queryClient.getQueryData(sidebar.queries.get().queryKey)).toBe(
        sidebar.MIN_WIDTH,
      );
    });
  });

  describe("useToggle()", () => {
    it("should toggle from open to closed", async () => {
      // Arrange
      const { wrapper, queryClient } = createWrapper();
      queryClient.setQueryData(sidebar.queries.get().queryKey, sidebar.MIN_WIDTH);

      // Act
      const { result } = renderHook(() => sidebar.useToggle(), { wrapper });
      await act(async () => {
        await result.current.mutateAsync();
      });

      // Assert
      expect(queryClient.getQueryData(sidebar.queries.get().queryKey)).toBe(0);
    });

    it("should toggle from closed to open", async () => {
      // Arrange
      const { wrapper, queryClient } = createWrapper();
      queryClient.setQueryData(sidebar.queries.get().queryKey, 0);

      // Act
      const { result } = renderHook(() => sidebar.useToggle(), { wrapper });
      await act(async () => {
        await result.current.mutateAsync();
      });

      // Assert
      expect(queryClient.getQueryData(sidebar.queries.get().queryKey)).toBe(
        sidebar.MIN_WIDTH,
      );
    });
  });
});
