/**
 * Background asset configuration with static Tailwind classes.
 * 
 * IMPORTANT: Classes must be static strings (no template literals) so Tailwind
 * can detect them at build time and include them in the final CSS.
 */

export const BACKGROUND_CLASSES = {
  hero: "bg-[url('/images/hero-mobile.jpg')] md:bg-[url('/images/hero-desktop.jpg')] bg-center md:bg-center bg-cover",
} as const

export type BackgroundKey = keyof typeof BACKGROUND_CLASSES

/**
 * Returns pre-defined background class strings.
 * Uses static map to ensure Tailwind includes all classes at build time.
 */
export function getBackgroundClasses(key: BackgroundKey): string {
  return BACKGROUND_CLASSES[key]
}
