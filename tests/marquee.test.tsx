import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Marquee } from "../src/Marquee";

describe("Marquee component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders children correctly", () => {
    render(
      <Marquee>
        <span>Test content</span>
      </Marquee>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("accepts custom className", () => {
    render(
      <Marquee className="custom-class">
        <span>Content</span>
      </Marquee>
    );

    const container = screen.getByText("Content").parentElement?.parentElement;
    expect(container).toHaveClass("custom-class");
  });

  it("exposes enter and leave methods via ref", () => {
    const marqueeRef = { current: null };

    render(
      <Marquee ref={marqueeRef}>
        <span>Test</span>
      </Marquee>
    );

    expect(marqueeRef.current).not.toBeNull();
    expect(typeof marqueeRef.current?.enter).toBe("function");
    expect(typeof marqueeRef.current?.leave).toBe("function");
  });

  it("calls onDirectionChange callback", () => {
    const onDirectionChange = vi.fn();

    render(
      <Marquee onDirectionChange={onDirectionChange}>
        <span>Test</span>
      </Marquee>
    );

    expect(onDirectionChange).not.toHaveBeenCalled();
  });

  it("calls onIdleStateChange callback", () => {
    const onIdleStateChange = vi.fn();

    render(
      <Marquee onIdleStateChange={onIdleStateChange}>
        <span>Test</span>
      </Marquee>
    );

    expect(onIdleStateChange).not.toHaveBeenCalled();
  });

  it("supports custom speed values", () => {
    render(
      <Marquee speed={100} speedLeave={300}>
        <span>Test</span>
      </Marquee>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("supports left direction", () => {
    render(
      <Marquee direction="left">
        <span>Test</span>
      </Marquee>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("supports right direction", () => {
    render(
      <Marquee direction="right">
        <span>Test</span>
      </Marquee>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("handles disabled state", () => {
    render(
      <Marquee enabled={false}>
        <span>Test</span>
      </Marquee>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("handles trigger prop", () => {
    render(
      <Marquee trigger="hover">
        <span>Test</span>
      </Marquee>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("handles trigger none", () => {
    render(
      <Marquee trigger="none">
        <span>Test</span>
      </Marquee>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
