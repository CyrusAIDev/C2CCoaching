"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  isInView: boolean
  className?: string
}

export function SectionHeading({ title, isInView, className = "" }: SectionHeadingProps) {
  return (
    <div className="relative inline-block">
      <h2 className={`text-4xl md:text-5xl font-semibold text-c2c-navy relative inline-block ${className}`}>
        {title}
        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1">
          <motion.span
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="w-16 h-1 bg-c2c-teal rounded-full origin-center"
          />
          <motion.span
            animate={{ scale: isInView ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
            className="w-2.5 h-2.5 rounded-full bg-c2c-gold"
          />
        </span>
      </h2>
    </div>
  )
}
