import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useShortcut } from "./use-shortcut";

function TestComponent({
  keys,
  callback,
  allowInEditable,
}: {
  keys: readonly string[];
  callback: (e: KeyboardEvent) => void;
  allowInEditable?: boolean;
}) {
  useShortcut(keys, callback, { allowInEditable });
  return (
    <>
      <input data-testid="input" />
      <textarea data-testid="textarea" />
      <div data-testid="editable" contentEditable />
    </>
  );
}

function fireKeyDown(options: Partial<KeyboardEvent>) {
  const event = new KeyboardEvent("keydown", { bubbles: true, ...options });
  document.dispatchEvent(event);
}

describe("useShortcut", () => {
  let callback: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    callback = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("calls callback on matching key", () => {
    // Arrange
    render(<TestComponent keys={["k"]} callback={callback} />);

    // Act
    fireKeyDown({ key: "k" });

    // Assert
    expect(callback).toHaveBeenCalledOnce();
  });

  it("does not call callback if non-matching key is pressed", () => {
    render(<TestComponent keys={["k"]} callback={callback} />);
    fireKeyDown({ key: "x" });
    expect(callback).not.toHaveBeenCalled();
  });

  it("respects modifier keys like Ctrl+K", () => {
    render(<TestComponent keys={["Ctrl", "k"]} callback={callback} />);
    fireKeyDown({ key: "k", ctrlKey: true });
    expect(callback).toHaveBeenCalledOnce();
  });

  it("does not trigger if modifier key is missing", () => {
    render(<TestComponent keys={["Ctrl", "k"]} callback={callback} />);
    fireKeyDown({ key: "k" }); // no ctrlKey
    expect(callback).not.toHaveBeenCalled();
  });

  it("does not trigger if focus is on input (default behavior)", () => {
    render(<TestComponent keys={["k"]} callback={callback} />);
    const input = screen.getByTestId("input");
    input.focus();
    fireKeyDown({ key: "k" });
    expect(callback).not.toHaveBeenCalled();
  });

  it("allows triggering in editable fields if allowInEditable is true", () => {
    render(<TestComponent keys={["k"]} callback={callback} allowInEditable />);
    const textarea = screen.getByTestId("textarea");
    textarea.focus();
    fireKeyDown({ key: "k" });
    expect(callback).toHaveBeenCalledOnce();
  });

  it("calls callback on Meta+Shift+X combo", () => {
    render(<TestComponent keys={["Meta", "Shift", "x"]} callback={callback} />);
    fireKeyDown({ key: "x", metaKey: true, shiftKey: true });
    expect(callback).toHaveBeenCalledOnce();
  });

  it("does not call callback if one of multiple modifiers is missing", () => {
    render(<TestComponent keys={["Meta", "Shift", "x"]} callback={callback} />);
    fireKeyDown({ key: "x", metaKey: true }); // missing shiftKey
    expect(callback).not.toHaveBeenCalled();
  });
});
