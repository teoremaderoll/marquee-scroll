import type React from "react";

export type ScrollDirection = "idle" | "left" | "right";
export type TriggerType = "hover" | "none";
export type ScrollDirectionType = "left" | "right";
export type MaskPosition = "inside" | "outside";

export interface DefaultMaskConfig {
  color: string;
  enabled: boolean;
  gradient: string | null;
  left: React.ReactNode | null;
  position: MaskPosition;
  right: React.ReactNode | null;
  size: number;
}

export interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  direction?: ScrollDirectionType;
  enabled?: boolean;
  mask?: Partial<DefaultMaskConfig> | boolean;
  onDirectionChange?: (direction: ScrollDirection) => void;
  onEnter?: () => void;
  onIdleStateChange?: (showLeft: boolean) => void;
  onLeave?: () => void;
  speed?: number;
  speedLeave?: number;
  trigger?: TriggerType;
}

export interface UseMarqueeOptions {
  direction?: ScrollDirectionType;
  enabled?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  speed?: number;
  speedLeave?: number;
}

export interface UseMarqueeReturn {
  enter: () => void;
  leave: () => void;
  marqueeRef: React.RefObject<MarqueeRef | null>;
}

export interface MarqueeMaskProps {
  children: React.ReactNode;
  className?: string;
  mask?: Partial<DefaultMaskConfig> | boolean;
  onDirectionChange?: (direction: ScrollDirection) => void;
  onIdleStateChange?: (showLeft: boolean) => void;
}

export interface MarqueeRef {
  enter: () => void;
  leave: () => void;
}
