"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  isInView: boolean
  className?: string
}

export function SectionHeading({ title, isInView, className = "" }: SectionHeadingProps) {
  return (
    <h2 className={`text-3xl md:text-4xl font-semibold text-c2c-navy relative inline-block ${className}`}>
      {title}
      <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="w-12 h-1 bg-c2c-teal rounded-full origin-right"
        />
        <motion.span
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.7, ease: "easeOut" }}
          className="w-2 h-2 rounded-full bg-c2c-gold"
        />
      </span>
    </h2>
  )
}
