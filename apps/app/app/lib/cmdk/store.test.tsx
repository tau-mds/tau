import { describe, it, expect, beforeEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { cmdk } from "./store";

function OpenComponent() {
  const isOpen = cmdk.useOpen();
  return <div>Open: {isOpen ? "true" : "false"}</div>;
}

function RouteComponent() {
  const route = cmdk.useRoute();
  return <div>Route: {route ?? "none"}</div>;
}

function SearchComponent() {
  const search = cmdk.useSearch();
  return <div>Search: {!search ? "none" : search}</div>;
}

function App() {
  return (
    <>
      <OpenComponent />
      <RouteComponent />
      <SearchComponent />
    </>
  );
}

describe("cmdk store", () => {
  beforeEach(() => {
    // Reset store before each test
    act(() => cmdk.action.close());
  });

  it("should open the root path", () => {
    // Arrange
    render(<App />);

    // Act
    act(() => cmdk.action.open());

    // Assert
    expect(screen.getByText("Open: true")).toBeInTheDocument();
    expect(screen.getByText("Route: root")).toBeInTheDocument();
    expect(screen.getByText("Search: none")).toBeInTheDocument();
  });

  it("should toggle open and close", () => {
    // Arrange
    render(<App />);

    // Act
    act(() => cmdk.action.toggle());
    expect(screen.getByText("Open: true")).toBeInTheDocument();

    act(() => cmdk.action.toggle());
    expect(screen.getByText("Open: false")).toBeInTheDocument();
  });

  it("should navigate to a new route", () => {
    // Arrange
    render(<App />);
    act(() => cmdk.action.open());

    // Act
    act(() => cmdk.action.navigate({ to: "search" }));

    // Assert
    expect(screen.getByText("Route: search")).toBeInTheDocument();
  });

  it("should go back to previous route with return", () => {
    // Arrange
    render(<App />);
    act(() => {
      cmdk.action.open();
      cmdk.action.navigate({ to: "foo" });
      cmdk.action.navigate({ to: "bar" });
    });

    // Act
    act(() => cmdk.action.return());

    // Assert
    expect(screen.getByText("Route: foo")).toBeInTheDocument();
  });

  it("should update search query", () => {
    // Arrange
    render(<App />);
    act(() => cmdk.action.open());

    // Act
    act(() => cmdk.action.search({ value: "hello" }));

    // Assert
    expect(screen.getByText("Search: hello")).toBeInTheDocument();
  });

  it("should throw when searching with no path", () => {
    // Arrange
    render(<App />);

    // Act & Assert
    expect(() => act(() => cmdk.action.search({ value: "boom" }))).toThrow(
      "path cannot be empty",
    );
  });
});
