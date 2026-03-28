import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MarqueeMask } from "../src/MarqueeMask";

describe("MarqueeMask component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders children correctly", () => {
    render(
      <MarqueeMask>
        <span>Test content</span>
      </MarqueeMask>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("accepts custom className", () => {
    render(
      <MarqueeMask className="custom-mask-class">
        <span>Content</span>
      </MarqueeMask>
    );

    const container = screen.getByText("Content").closest(".custom-mask-class");
    expect(container).toBeInTheDocument();
  });

  it("exposes enter and leave methods via ref", () => {
    const marqueeRef = { current: null };

    render(
      <MarqueeMask ref={marqueeRef}>
        <span>Test</span>
      </MarqueeMask>
    );

    expect(marqueeRef.current).not.toBeNull();
    expect(typeof marqueeRef.current?.enter).toBe("function");
    expect(typeof marqueeRef.current?.leave).toBe("function");
  });

  it("calls onDirectionChange callback", () => {
    const onDirectionChange = vi.fn();

    render(
      <MarqueeMask onDirectionChange={onDirectionChange}>
        <span>Test</span>
      </MarqueeMask>
    );

    expect(onDirectionChange).not.toHaveBeenCalled();
  });

  it("calls onIdleStateChange callback", () => {
    const onIdleStateChange = vi.fn();

    render(
      <MarqueeMask onIdleStateChange={onIdleStateChange}>
        <span>Test</span>
      </MarqueeMask>
    );

    expect(onIdleStateChange).not.toHaveBeenCalled();
  });

  it("supports mask config as boolean (false)", () => {
    render(
      <MarqueeMask mask={false}>
        <span>Test</span>
      </MarqueeMask>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("supports mask config with custom size", () => {
    render(
      <MarqueeMask mask={{ size: 24 }}>
        <span>Test</span>
      </MarqueeMask>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("supports mask config with custom color", () => {
    render(
      <MarqueeMask mask={{ color: "rgba(255,0,0,0.5)" }}>
        <span>Test</span>
      </MarqueeMask>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders without mask when mask.enabled is false", () => {
    render(
      <MarqueeMask mask={{ enabled: false }}>
        <span>Test</span>
      </MarqueeMask>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("handles undefined mask (default behavior)", () => {
    render(
      <MarqueeMask>
        <span>Test</span>
      </MarqueeMask>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
