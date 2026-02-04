import { Variants } from "framer-motion"

export function createStaggerVariants(prefersReducedMotion: boolean): {
  container: Variants
  item: Variants
} {
  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : 0.15,
          delayChildren: prefersReducedMotion ? 0 : 0.2,
        },
      },
    },
    item: {
      hidden: prefersReducedMotion ? {} : { opacity: 0, y: 25 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      },
    },
  }
}
