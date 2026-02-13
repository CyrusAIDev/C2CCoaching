"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect } from "react"

interface SectionHeadingProps {
  title: string
  isInView: boolean
  className?: string
}

export function SectionHeading({ title, isInView, className = "" }: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const scrollContainerRef = useRef<HTMLElement | null>(null)
  useEffect(() => {
    scrollContainerRef.current = document.documentElement
  }, [])
  
  // Track scroll progress relative to this element
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainerRef,
    offset: ["start end", "end start"]
  })
  
  // Transform scroll progress to scale values
  const lineScaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.8])
  const dotScale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.9])
  
  return (
    <div ref={ref} className="relative inline-block">
      <h2 className={`text-4xl md:text-5xl font-semibold text-c2c-navy relative inline-block ${className}`}>
        {title}
        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1">
          <motion.span
            style={{ scaleX: isInView ? lineScaleX : 0 }}
            className="w-16 h-1 bg-c2c-teal rounded-full origin-center"
          />
          <motion.span
            style={{ scale: isInView ? dotScale : 0 }}
            className="w-2.5 h-2.5 rounded-full bg-c2c-gold"
          />
        </span>
      </h2>
    </div>
  )
}
