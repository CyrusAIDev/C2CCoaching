"use client"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { BOOKING_URL, TRUST_MICROCOPY } from "@/lib/constants"

const rotatingWords = [
  "your resume.",
  "your LinkedIn.",
  "networking.",
  "interviews.",
  "your career.",
]

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  // Typewriter effect
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(rotatingWords[currentWordIndex])
      return
    }

    const currentWord = rotatingWords[currentWordIndex]
    
    if (isTyping) {
      if (displayedText.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1))
        }, 80)
        return () => clearTimeout(timeout)
      } else {
        // Word fully typed, wait then start deleting
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 40)
        return () => clearTimeout(timeout)
      } else {
        // Word fully deleted, move to next word
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length)
        setIsTyping(true)
      }
    }
  }, [displayedText, isTyping, currentWordIndex, prefersReducedMotion])

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : 0.2,
          delayChildren: prefersReducedMotion ? 0 : 0.3,
        },
      },
    }),
    [prefersReducedMotion]
  )

  const itemVariants = useMemo(
    () => ({
      hidden: prefersReducedMotion ? {} : { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      },
    }),
    [prefersReducedMotion]
  )

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image - newspaper job seekers */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Young professionals searching for internships and new grad roles"
          fill
          sizes="100vw"
          className="object-cover object-top"
          priority
        />
        {/* Gradient overlay - darker at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-c2c-navy/20 via-c2c-navy/40 to-c2c-navy/95" />
      </div>

      {/* Content - positioned at bottom center */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-[45vh] pb-32 flex flex-col items-center text-center"
      >
        <div className="w-full">
            {/* Main headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-6"
            >
              <span className="block">Recruiting sucks.</span>
              <span className="block mt-2">We simplify it.</span>
            </motion.h1>

            {/* Typing animation on its own line */}
            <motion.div
              variants={itemVariants}
              className="text-2xl md:text-3xl font-semibold mb-6 h-12 flex items-center justify-center"
            >
              <span className="text-white/90 mr-2">{"We help with"}</span>
              <span className="inline-block text-left min-w-[200px] text-c2c-teal">
                {displayedText}
                <span className="inline-block w-0.5 h-6 md:h-7 bg-c2c-teal ml-0.5 animate-pulse align-middle" />
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl text-white/95 mb-8 leading-relaxed font-medium"
            >
              Land internships and new grad roles without the guesswork.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl shadow-[0_0_25px_rgba(58,166,168,0.4)] ring-2 ring-c2c-teal/30 ring-offset-2 ring-offset-c2c-navy/80"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    Book Free Consultation
                  </a>
                </Button>
                <a href="#services" className="text-white/70 hover:text-white font-medium text-sm transition-colors duration-200 underline underline-offset-4">
                  See services
                </a>
              </div>
              <p className="text-white/70 text-sm font-medium">
                {TRUST_MICROCOPY}
              </p>
            </motion.div>
        </div>
      </motion.div>

      {/* Scroll down indicator */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-sm font-medium">Scroll down</span>
        <motion.svg
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-5 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
