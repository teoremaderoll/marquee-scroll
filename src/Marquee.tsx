import { forwardRef, useImperativeHandle, useRef } from "react";
import type { MarqueeProps, MarqueeRef } from "./types";

const DEFAULT_SPEED = 75;
const DEFAULT_SPEED_LEAVE = 200;

export const Marquee = forwardRef<MarqueeRef, MarqueeProps>(
  (
    {
      children,
      className,
      speed = DEFAULT_SPEED,
      speedLeave = DEFAULT_SPEED_LEAVE,
      direction = "left",
      onDirectionChange,
      onIdleStateChange,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<Animation | null>(null);
    const offsetRef = useRef(0);
    const frameRef = useRef<number | null>(null);

    const stopAnimation = () => {
      if (animationRef.current) {
        animationRef.current.cancel();
        animationRef.current = null;
      }
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    const animateEnter = () => {
      if (!containerRef.current) {
        return;
      }

      stopAnimation();

      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = containerRef.current.scrollWidth;
      const isLeft = direction === "left";
      const distance = isLeft ? textWidth - containerWidth : containerWidth - textWidth;

      if (distance <= 0) {
        return;
      }

      const startOffset = offsetRef.current;
      const remainingDistance = distance - startOffset;

      if (remainingDistance <= 0) {
        onDirectionChange?.("idle");
        onIdleStateChange?.(true);
        return;
      }

      const durationEnter = (remainingDistance / speed) * 1000;

      const startTransform = isLeft ? -startOffset : startOffset;
      const endTransform = isLeft ? -distance : distance;

      const keyframes = [
        { transform: `translateX(${startTransform}px)` },
        { transform: `translateX(${endTransform}px)` },
      ];

      onDirectionChange?.(direction);

      const animation = containerRef.current.animate(keyframes, {
        duration: durationEnter,
        easing: "linear",
        fill: "forwards",
      });
      animationRef.current = animation;

      const updateOffset = () => {
        if (animationRef.current && animationRef.current.playState === "running") {
          const progress =
            Number(animationRef.current.currentTime) /
            Number(animationRef.current.effect!.getComputedTiming().duration);
          offsetRef.current = startOffset + remainingDistance * progress;
          frameRef.current = requestAnimationFrame(updateOffset);
        }
      };
      frameRef.current = requestAnimationFrame(updateOffset);

      animation.onfinish = () => {
        offsetRef.current = distance;
        onDirectionChange?.("idle");
        onIdleStateChange?.(true);
        if (frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }
      };
    };

    const animateLeave = () => {
      if (!containerRef.current) {
        return;
      }

      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = containerRef.current.scrollWidth;
      const isLeft = direction === "left";
      const distance = isLeft ? textWidth - containerWidth : containerWidth - textWidth;

      if (distance <= 0) {
        offsetRef.current = 0;
        stopAnimation();
        return;
      }

      const startOffset = Math.min(offsetRef.current, distance);
      const actualDistance = startOffset;

      if (actualDistance <= 0) {
        offsetRef.current = 0;
        return;
      }

      stopAnimation();

      const durationLeave = (actualDistance / speedLeave) * 1000;

      const startTransform = isLeft ? -startOffset : startOffset;

      const keyframes = [{ transform: `translateX(${startTransform}px)` }, { transform: "translateX(0px)" }];

      const oppositeDirection = direction === "left" ? "right" : "left";
      onDirectionChange?.(oppositeDirection);
      onIdleStateChange?.(false);

      const animation = containerRef.current.animate(keyframes, {
        duration: durationLeave,
        easing: "linear",
        fill: "forwards",
      });
      animationRef.current = animation;

      const updateOffset = () => {
        if (animationRef.current && animationRef.current.playState === "running") {
          const progress =
            Number(animationRef.current.currentTime) /
            Number(animationRef.current.effect!.getComputedTiming().duration);
          offsetRef.current = startOffset * (1 - progress);
          frameRef.current = requestAnimationFrame(updateOffset);
        }
      };
      frameRef.current = requestAnimationFrame(updateOffset);

      animation.onfinish = () => {
        offsetRef.current = 0;
        onDirectionChange?.("idle");
        containerRef.current?.style.setProperty("transform", "translateX(0px)");
        if (frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }
      };
    };

    useImperativeHandle(ref, () => ({
      enter: animateEnter,
      leave: animateLeave,
    }));

    return (
      <div className={className} ref={containerRef}>
        <div style={{ whiteSpace: "nowrap", overflow: "visible" }}>{children}</div>
      </div>
    );
  }
);

Marquee.displayName = "Marquee";
