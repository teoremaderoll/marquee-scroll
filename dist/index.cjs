"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Marquee: () => Marquee,
  MarqueeMask: () => MarqueeMask,
  useMarquee: () => useMarquee
});
module.exports = __toCommonJS(index_exports);

// src/Marquee.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var DEFAULT_SPEED = 75;
var DEFAULT_SPEED_LEAVE = 200;
var Marquee = (0, import_react.forwardRef)(
  ({
    children,
    className,
    speed = DEFAULT_SPEED,
    speedLeave = DEFAULT_SPEED_LEAVE,
    direction = "left",
    onDirectionChange,
    onIdleStateChange
  }, ref) => {
    const containerRef = (0, import_react.useRef)(null);
    const animationRef = (0, import_react.useRef)(null);
    const offsetRef = (0, import_react.useRef)(0);
    const frameRef = (0, import_react.useRef)(null);
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
      const durationEnter = remainingDistance / speed * 1e3;
      const startTransform = isLeft ? -startOffset : startOffset;
      const endTransform = isLeft ? -distance : distance;
      const keyframes = [
        { transform: `translateX(${startTransform}px)` },
        { transform: `translateX(${endTransform}px)` }
      ];
      onDirectionChange?.(direction);
      const animation = containerRef.current.animate(keyframes, {
        duration: durationEnter,
        easing: "linear",
        fill: "forwards"
      });
      animationRef.current = animation;
      const updateOffset = () => {
        if (animationRef.current && animationRef.current.playState === "running") {
          const progress = Number(animationRef.current.currentTime) / Number(animationRef.current.effect.getComputedTiming().duration);
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
      const durationLeave = actualDistance / speedLeave * 1e3;
      const startTransform = isLeft ? -startOffset : startOffset;
      const keyframes = [{ transform: `translateX(${startTransform}px)` }, { transform: "translateX(0px)" }];
      const oppositeDirection = direction === "left" ? "right" : "left";
      onDirectionChange?.(oppositeDirection);
      onIdleStateChange?.(false);
      const animation = containerRef.current.animate(keyframes, {
        duration: durationLeave,
        easing: "linear",
        fill: "forwards"
      });
      animationRef.current = animation;
      const updateOffset = () => {
        if (animationRef.current && animationRef.current.playState === "running") {
          const progress = Number(animationRef.current.currentTime) / Number(animationRef.current.effect.getComputedTiming().duration);
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
    (0, import_react.useImperativeHandle)(ref, () => ({
      enter: animateEnter,
      leave: animateLeave
    }));
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className, ref: containerRef, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { whiteSpace: "nowrap", overflow: "visible" }, children }) });
  }
);
Marquee.displayName = "Marquee";

// src/MarqueeMask.tsx
var import_react2 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var DEFAULT_MASK_CONFIG = {
  enabled: true,
  size: 12,
  position: "inside",
  left: null,
  right: null,
  color: "rgba(0,0,0,0.8)",
  gradient: null
};
var DefaultGradient = ({ direction, color }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  "div",
  {
    className: "pointer-events-none absolute inset-y-0 z-10",
    style: {
      [direction === "left" ? "left" : "right"]: 0,
      width: "100%",
      background: direction === "left" ? `linear-gradient(to right, ${color}, transparent)` : `linear-gradient(to left, ${color}, transparent)`
    }
  }
);
var MarqueeMask = (0, import_react2.forwardRef)(
  ({ children, className, mask, onDirectionChange, onIdleStateChange }, ref) => {
    const containerRef = (0, import_react2.useRef)(null);
    const marqueeRef = (0, import_react2.useRef)(null);
    const [hasOverflow, setHasOverflow] = (0, import_react2.useState)(false);
    const [scrollDirection, setScrollDirection] = (0, import_react2.useState)("idle");
    const [showLeftWhenIdle, setShowLeftWhenIdle] = (0, import_react2.useState)(false);
    const resolvedMask = mask === void 0 ? DEFAULT_MASK_CONFIG : typeof mask === "boolean" ? { ...DEFAULT_MASK_CONFIG, enabled: mask } : { ...DEFAULT_MASK_CONFIG, ...mask };
    (0, import_react2.useImperativeHandle)(ref, () => ({
      enter: () => marqueeRef.current?.enter(),
      leave: () => marqueeRef.current?.leave()
    }));
    (0, import_react2.useEffect)(() => {
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
    const handleDirectionChange = (direction) => {
      setScrollDirection(direction);
      onDirectionChange?.(direction);
    };
    const handleIdleStateChange = (showLeft) => {
      setShowLeftWhenIdle(showLeft);
      onIdleStateChange?.(showLeft);
    };
    const isAnimating = scrollDirection !== "idle";
    const showGradientLeft = resolvedMask.enabled && (isAnimating || showLeftWhenIdle);
    const showGradientRight = resolvedMask.enabled && (isAnimating || hasOverflow && !showLeftWhenIdle);
    const gradientStyle = resolvedMask.gradient ? { background: resolvedMask.gradient } : {};
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `relative ${className ?? ""}`, ref: containerRef, children: [
      resolvedMask.enabled && showGradientLeft && (resolvedMask.left === null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "div",
        {
          className: "pointer-events-none absolute inset-y-0 left-0 z-10",
          style: {
            width: `${resolvedMask.size}px`,
            ...gradientStyle
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DefaultGradient, { color: resolvedMask.color, direction: "left" })
        }
      ) : resolvedMask.left),
      resolvedMask.enabled && showGradientRight && (resolvedMask.right === null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "div",
        {
          className: "pointer-events-none absolute inset-y-0 right-0 z-10",
          style: {
            width: `${resolvedMask.size}px`,
            ...gradientStyle
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DefaultGradient, { color: resolvedMask.color, direction: "right" })
        }
      ) : resolvedMask.right),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        Marquee,
        {
          className: "w-full",
          onDirectionChange: handleDirectionChange,
          onIdleStateChange: handleIdleStateChange,
          ref: marqueeRef,
          children
        }
      )
    ] });
  }
);
MarqueeMask.displayName = "MarqueeMask";

// src/useMarquee.ts
var import_react3 = require("react");
function useMarquee(options = {}) {
  const { enabled = true, onEnter, onLeave } = options;
  const marqueeRef = (0, import_react3.useRef)(null);
  const enter = (0, import_react3.useCallback)(() => {
    if (!enabled) {
      return;
    }
    onEnter?.();
    marqueeRef.current?.enter();
  }, [enabled, onEnter]);
  const leave = (0, import_react3.useCallback)(() => {
    if (!enabled) {
      return;
    }
    onLeave?.();
    marqueeRef.current?.leave();
  }, [enabled, onLeave]);
  return {
    enter,
    leave,
    marqueeRef
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Marquee,
  MarqueeMask,
  useMarquee
});
//# sourceMappingURL=index.cjs.map