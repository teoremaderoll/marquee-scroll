import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useMarquee } from "../src/useMarquee";

describe("useMarquee hook", () => {
  it("returns enter and leave functions", () => {
    const { result } = renderHook(() => useMarquee());

    expect(typeof result.current.enter).toBe("function");
    expect(typeof result.current.leave).toBe("function");
  });

  it("returns marqueeRef", () => {
    const { result } = renderHook(() => useMarquee());

    expect(result.current.marqueeRef).not.toBeNull();
    expect(result.current.marqueeRef).toHaveProperty("current");
  });

  it("accepts custom options", () => {
    const { result } = renderHook(() =>
      useMarquee({
        speed: 100,
        speedLeave: 200,
        direction: "left",
        enabled: true,
      })
    );

    expect(typeof result.current.enter).toBe("function");
    expect(typeof result.current.leave).toBe("function");
  });

  it("calls onEnter callback when entering", () => {
    const onEnter = vi.fn();
    const { result } = renderHook(() => useMarquee({ onEnter }));

    act(() => {
      result.current.enter();
    });

    expect(onEnter).toHaveBeenCalled();
  });

  it("calls onLeave callback when leaving", () => {
    const onLeave = vi.fn();
    const { result } = renderHook(() => useMarquee({ onLeave }));

    act(() => {
      result.current.leave();
    });

    expect(onLeave).toHaveBeenCalled();
  });

  it("does not call enter when disabled", () => {
    const onEnter = vi.fn();
    const { result } = renderHook(() => useMarquee({ onEnter, enabled: false }));

    act(() => {
      result.current.enter();
    });

    expect(onEnter).not.toHaveBeenCalled();
  });

  it("does not call leave when disabled", () => {
    const onLeave = vi.fn();
    const { result } = renderHook(() => useMarquee({ onLeave, enabled: false }));

    act(() => {
      result.current.leave();
    });

    expect(onLeave).not.toHaveBeenCalled();
  });
});
