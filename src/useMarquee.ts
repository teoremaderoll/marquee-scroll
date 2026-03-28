import { useCallback, useRef } from "react";
import type { MarqueeRef, UseMarqueeOptions } from "./types";

export interface UseMarqueeReturn {
  enter: () => void;
  leave: () => void;
  marqueeRef: React.RefObject<MarqueeRef | null>;
}

export function useMarquee(options: UseMarqueeOptions = {}): UseMarqueeReturn {
  const { enabled = true, onEnter, onLeave } = options;
  const marqueeRef = useRef<MarqueeRef | null>(null);

  const enter = useCallback(() => {
    if (!enabled) {
      return;
    }
    onEnter?.();
    marqueeRef.current?.enter();
  }, [enabled, onEnter]);

  const leave = useCallback(() => {
    if (!enabled) {
      return;
    }
    onLeave?.();
    marqueeRef.current?.leave();
  }, [enabled, onLeave]);

  return {
    enter,
    leave,
    marqueeRef,
  };
}

export type { MarqueeProps, MarqueeRef, ScrollDirection, UseMarqueeOptions } from "./types";
