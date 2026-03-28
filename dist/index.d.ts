import * as React$1 from 'react';
import React__default from 'react';

type ScrollDirection = "idle" | "left" | "right";
type TriggerType = "hover" | "none";
type ScrollDirectionType = "left" | "right";
type MaskPosition = "inside" | "outside";
interface DefaultMaskConfig {
    color: string;
    enabled: boolean;
    gradient: string | null;
    left: React__default.ReactNode | null;
    position: MaskPosition;
    right: React__default.ReactNode | null;
    size: number;
}
interface MarqueeProps {
    children: React__default.ReactNode;
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
interface UseMarqueeOptions {
    direction?: ScrollDirectionType;
    enabled?: boolean;
    onEnter?: () => void;
    onLeave?: () => void;
    speed?: number;
    speedLeave?: number;
}
interface UseMarqueeReturn$1 {
    enter: () => void;
    leave: () => void;
    marqueeRef: React__default.RefObject<MarqueeRef | null>;
}
interface MarqueeMaskProps {
    children: React__default.ReactNode;
    className?: string;
    mask?: Partial<DefaultMaskConfig> | boolean;
    onDirectionChange?: (direction: ScrollDirection) => void;
    onIdleStateChange?: (showLeft: boolean) => void;
}
interface MarqueeRef {
    enter: () => void;
    leave: () => void;
}

declare const Marquee: React$1.ForwardRefExoticComponent<MarqueeProps & React$1.RefAttributes<MarqueeRef>>;

declare const MarqueeMask: React$1.ForwardRefExoticComponent<MarqueeMaskProps & React$1.RefAttributes<MarqueeRef>>;

interface UseMarqueeReturn {
    enter: () => void;
    leave: () => void;
    marqueeRef: React.RefObject<MarqueeRef | null>;
}
declare function useMarquee(options?: UseMarqueeOptions): UseMarqueeReturn;

export { type DefaultMaskConfig, Marquee, MarqueeMask, type MarqueeMaskProps, type MarqueeProps, type MarqueeRef, type MaskPosition, type ScrollDirection, type ScrollDirectionType, type TriggerType, type UseMarqueeOptions, type UseMarqueeReturn$1 as UseMarqueeReturn, useMarquee };
