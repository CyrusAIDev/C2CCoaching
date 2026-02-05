import { Variants } from "framer-motion"

// Standard easing curve for all animations
export const EASE_OUT = [0.16, 1, 0.3, 1] as const // cubic-bezier for smooth deceleration

// Standardized animation durations
export const DURATION = {
  fast: 0.35,
  normal: 0.5,
  slow: 0.6,
} as const

export function createStaggerVariants(prefersReducedMotion: boolean, isMobile = false): {
  container: Variants
  item: Variants
} {
  // Mobile: faster, less dramatic movements
  const yOffset = isMobile ? 15 : 25
  const duration = isMobile ? DURATION.fast : DURATION.slow
  const staggerDelay = isMobile ? 0.1 : 0.15
  const childDelay = isMobile ? 0.1 : 0.2

  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
          delayChildren: prefersReducedMotion ? 0 : childDelay,
        },
      },
    },
    item: {
      hidden: prefersReducedMotion ? {} : { opacity: 0, y: yOffset },
      visible: {
        opacity: 1,
        y: 0,
        transition: { 
          duration, 
          ease: EASE_OUT as unknown as string,
        },
      },
    },
  }
}

// Mobile-optimized fade-in variant (no Y movement, just opacity)
export function createFadeVariants(prefersReducedMotion: boolean): Variants {
  return {
    hidden: prefersReducedMotion ? {} : { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: DURATION.fast, ease: EASE_OUT as unknown as string },
    },
  }
}
