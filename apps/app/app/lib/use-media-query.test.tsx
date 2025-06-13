import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useIsMobile, useMediaQuery } from "./use-media-query";

function createMatchMedia(width: number) {
  return (query: string) => {
    const match = query.match(/\(max-width:\s*(\d+)px\)/);
    const maxWidth = match ? Number(match[1]) : Number.POSITIVE_INFINITY;

    return {
      matches: width < maxWidth,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList;
  };
}

describe("useIsMobile", () => {
  beforeEach(() => {
    vi.stubGlobal("innerWidth", 500); // mobile
    vi.stubGlobal("matchMedia", createMatchMedia(window.innerWidth));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should return true when window width is less than 768", () => {
    // Arrange
    // innerWidth is 500 from beforeEach

    // Act
    const { result } = renderHook(() => useIsMobile());

    // Assert
    expect(result.current).toBe(true);
  });

  it("should return false when window width is 1024", () => {
    // Arrange
    vi.stubGlobal("innerWidth", 1024);
    vi.stubGlobal("matchMedia", createMatchMedia(window.innerWidth));

    // Act
    const { result } = renderHook(() => useIsMobile());

    // Assert
    expect(result.current).toBe(false);
  });
});

describe("useMediaQuery", () => {
  const breakpoint = 600;

  beforeEach(() => {
    vi.stubGlobal("innerWidth", 550);
    vi.stubGlobal("matchMedia", createMatchMedia(window.innerWidth));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should return true when window width is less than breakpoint", () => {
    // Arrange
    // innerWidth is 550, breakpoint is 600

    // Act
    const { result } = renderHook(() => useMediaQuery(breakpoint));

    // Assert
    expect(result.current).toBe(true);
  });

  it("should return false when window width is greater than breakpoint", () => {
    // Arrange
    vi.stubGlobal("innerWidth", 800);
    vi.stubGlobal("matchMedia", createMatchMedia(window.innerWidth));

    // Act
    const { result } = renderHook(() => useMediaQuery(breakpoint));

    // Assert
    expect(result.current).toBe(false);
  });
});
