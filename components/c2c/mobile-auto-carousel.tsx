"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
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
  className?: string
  slideClassName?: string
  /** How much of the slide is visible (e.g., "85%" for peek effect) */
  slideSize?: string
}

export function MobileAutoCarousel({
  children,
  intervalMs = 4500,
  showDots = true,
  className,
  slideClassName,
  slideSize = "85%",
}: MobileAutoCarouselProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)

  // Track slide count and current index
  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Auto-advance logic
  React.useEffect(() => {
    if (!api || prefersReducedMotion || isPaused || count === 0) return

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        // Loop back to first slide
        api.scrollTo(0)
      }
    }, intervalMs)

    return () => clearInterval(interval)
  }, [api, intervalMs, isPaused, prefersReducedMotion, count])

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
