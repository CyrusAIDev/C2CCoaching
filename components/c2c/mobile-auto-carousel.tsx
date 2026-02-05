"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

interface MobileAutoCarouselProps {
  children: React.ReactNode
  intervalMs?: number
  showDots?: boolean
  showArrows?: boolean
  className?: string
  slideClassName?: string
  /** How much of the slide is visible (e.g., "85%" for peek effect) */
  slideSize?: string
  /** Starting slide index (default 0) */
  startIndex?: number
  /** When this key changes, carousel resets to startIndex */
  resetKey?: string | number
  /** Delay in ms before starting auto-advance after reset (default 0) */
  autoplayDelayMs?: number
}

export function MobileAutoCarousel({
  children,
  intervalMs = 4500,
  showDots = true,
  showArrows = false,
  className,
  slideClassName,
  slideSize = "85%",
  startIndex = 0,
  resetKey,
  autoplayDelayMs = 0,
}: MobileAutoCarouselProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(startIndex)
  const [count, setCount] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const [isAutoplayDelayed, setIsAutoplayDelayed] = React.useState(autoplayDelayMs > 0)
  const prevResetKeyRef = React.useRef(resetKey)

  // Track slide count and current index
  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Handle resetKey changes - scroll to startIndex
  React.useEffect(() => {
    if (!api || resetKey === undefined) return
    
    // Only trigger on actual changes (not initial mount)
    if (prevResetKeyRef.current !== resetKey && prevResetKeyRef.current !== undefined) {
      api.scrollTo(startIndex)
      setCurrent(startIndex)
      
      // Delay autoplay after reset
      if (autoplayDelayMs > 0) {
        setIsAutoplayDelayed(true)
        const delayTimeout = setTimeout(() => {
          setIsAutoplayDelayed(false)
        }, autoplayDelayMs)
        return () => clearTimeout(delayTimeout)
      }
    }
    
    prevResetKeyRef.current = resetKey
  }, [api, resetKey, startIndex, autoplayDelayMs])

  // Auto-advance logic
  React.useEffect(() => {
    if (!api || prefersReducedMotion || isPaused || isAutoplayDelayed || count === 0) return

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        // Loop back to first slide
        api.scrollTo(0)
      }
    }, intervalMs)

    return () => clearInterval(interval)
  }, [api, intervalMs, isPaused, prefersReducedMotion, count, isAutoplayDelayed])

  // Pause handlers
  const handleInteractionStart = React.useCallback(() => {
    setIsPaused(true)
  }, [])

  const handleInteractionEnd = React.useCallback(() => {
    // Resume after a short delay to avoid immediate auto-advance
    const timeout = setTimeout(() => {
      setIsPaused(false)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [])

  // Arrow navigation handlers
  const handlePrev = React.useCallback(() => {
    if (!api) return
    api.scrollPrev()
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 2000)
  }, [api])

  const handleNext = React.useCallback(() => {
    if (!api) return
    api.scrollNext()
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 2000)
  }, [api])

  // Convert children to array for mapping
  const slides = React.Children.toArray(children)

  return (
    <div className={cn("relative w-full", className)}>
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
          skipSnaps: false,
          containScroll: false,
        }}
        className="w-full"
      >
        <div
          onMouseEnter={handleInteractionStart}
          onMouseLeave={handleInteractionEnd}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          onPointerDown={handleInteractionStart}
          onPointerUp={handleInteractionEnd}
        >
          <CarouselContent className="-ml-2">
            {slides.map((child, index) => (
              <CarouselItem
                key={index}
                className={cn("pl-2", slideClassName)}
                style={{ flexBasis: slideSize }}
              >
                {child}
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>

      {/* Faint arrow buttons */}
      {showArrows && count > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-c2c-navy/50 hover:bg-white/20 hover:text-c2c-navy/80 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-c2c-navy/50 hover:bg-white/20 hover:text-c2c-navy/80 transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && count > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                current === index
                  ? "bg-c2c-teal w-4"
                  : "bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
