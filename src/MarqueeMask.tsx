import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Marquee } from "./Marquee";
import type { DefaultMaskConfig, MarqueeMaskProps, MarqueeRef, ScrollDirection } from "./types";

const DEFAULT_MASK_CONFIG: DefaultMaskConfig = {
  enabled: true,
  size: 12,
  position: "inside",
  left: null,
  right: null,
  color: "rgba(0,0,0,0.8)",
  gradient: null,
};

const DefaultGradient = ({ direction, color }: { direction: "left" | "right"; color: string }) => (
  <div
    className="pointer-events-none absolute inset-y-0 z-10"
    style={{
      [direction === "left" ? "left" : "right"]: 0,
      width: "100%",
      background:
        direction === "left"
          ? `linear-gradient(to right, ${color}, transparent)`
          : `linear-gradient(to left, ${color}, transparent)`,
    }}
  />
);

export const MarqueeMask = forwardRef<MarqueeRef, MarqueeMaskProps>(
  ({ children, className, mask, onDirectionChange, onIdleStateChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<MarqueeRef | null>(null);
    const [hasOverflow, setHasOverflow] = useState(false);
    const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("idle");
    const [showLeftWhenIdle, setShowLeftWhenIdle] = useState(false);

    const resolvedMask: DefaultMaskConfig =
      mask === undefined
        ? DEFAULT_MASK_CONFIG
        : typeof mask === "boolean"
          ? { ...DEFAULT_MASK_CONFIG, enabled: mask }
          : { ...DEFAULT_MASK_CONFIG, ...mask };

    useImperativeHandle(ref, () => ({
      enter: () => marqueeRef.current?.enter(),
      leave: () => marqueeRef.current?.leave(),
    }));

    useEffect(() => {
      const checkOverflow = () => {
        if (containerRef.current) {
          setHasOverflow(containerRef.current.scrollWidth > containerRef.current.offsetWidth);
        }
      };

      checkOverflow();

      const observer = new ResizeObserver(checkOverflow);
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, []);

    const handleDirectionChange = (direction: ScrollDirection) => {
      setScrollDirection(direction);
      onDirectionChange?.(direction);
    };

    const handleIdleStateChange = (showLeft: boolean) => {
      setShowLeftWhenIdle(showLeft);
      onIdleStateChange?.(showLeft);
    };

    const isAnimating = scrollDirection !== "idle";
    const showGradientLeft = resolvedMask.enabled && (isAnimating || showLeftWhenIdle);
    const showGradientRight = resolvedMask.enabled && (isAnimating || (hasOverflow && !showLeftWhenIdle));

    const gradientStyle = resolvedMask.gradient ? { background: resolvedMask.gradient } : {};

    return (
      <div className={`relative ${className ?? ""}`} ref={containerRef}>
        {resolvedMask.enabled &&
          showGradientLeft &&
          (resolvedMask.left === null ? (
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10"
              style={{
                width: `${resolvedMask.size}px`,
                ...gradientStyle,
              }}
            >
              <DefaultGradient color={resolvedMask.color} direction="left" />
            </div>
          ) : (
            resolvedMask.left
          ))}

        {resolvedMask.enabled &&
          showGradientRight &&
          (resolvedMask.right === null ? (
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10"
              style={{
                width: `${resolvedMask.size}px`,
                ...gradientStyle,
              }}
            >
              <DefaultGradient color={resolvedMask.color} direction="right" />
            </div>
          ) : (
            resolvedMask.right
          ))}

        <Marquee
          className="w-full"
          onDirectionChange={handleDirectionChange}
          onIdleStateChange={handleIdleStateChange}
          ref={marqueeRef}
        >
          {children}
        </Marquee>
      </div>
    );
  }
);

MarqueeMask.displayName = "MarqueeMask";
