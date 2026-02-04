"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

interface CTAButtonProps {
  children: React.ReactNode
  href: string
  size?: "sm" | "default" | "lg"
  className?: string
}

export function CTAButton({ children, href, size = "default", className }: CTAButtonProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  
  const sizeClasses = {
    sm: "px-6 py-3 text-sm",
    default: "px-8 py-6 text-base",
    lg: "px-10 py-6 text-lg",
  }

  return (
    <Link href={href} className="inline-block">
      <motion.div
        whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -2 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(
          "relative overflow-hidden bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-xl shadow-[0_0_25px_rgba(58,166,168,0.3)] text-center group",
          sizeClasses[size],
          className
        )}
      >
        {/* Ripple effect layer */}
        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        <span className="relative z-10">{children}</span>
      </motion.div>
    </Link>
  )
}
