"use client"

import { useState, useRef, useCallback, useMemo, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Briefcase, Target, Users, Play, Sparkles, Volume2 } from "lucide-react"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { useSectionInView } from "@/hooks/use-section-in-view"
import { createStaggerVariants } from "@/lib/animations"
import { BOOKING_URL, TRUST_MICROCOPY } from "@/lib/constants"

// ==================== AutoPlayYouTubeEmbed Component ====================
// Robust implementation: always renders visible iframe, never blanks out
const VIDEO_ID = "ahPtdmaFG7k"
const BASE_PARAMS = "playsinline=1&rel=0&modestbranding=1&controls=1"
const BASE_SRC = `https://www.youtube.com/embed/${VIDEO_ID}?${BASE_PARAMS}`
const AUTOPLAY_MUTED_SRC = `https://www.youtube.com/embed/${VIDEO_ID}?${BASE_PARAMS}&autoplay=1&mute=1`
const AUTOPLAY_SOUND_SRC = `https://www.youtube.com/embed/${VIDEO_ID}?${BASE_PARAMS}&autoplay=1&mute=0`

interface AutoPlayYouTubeEmbedProps {
  className?: string
  aspect?: "16:9" | "9:16"
  frameless?: boolean // When true, removes border/shadow/rounding (for use inside device frames)
}

// ==================== IPhoneFrame Component (Desktop only) ====================
// iPhone 15 Pro: 71.6mm x 146.6mm = ~1:2.048 device ratio
// Screen: 1179x2556px = ~1:2.17
function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        relative mx-auto w-[280px]
        rounded-[2.8rem]
        bg-gradient-to-b from-zinc-950 via-black to-zinc-950
        p-[10px]
        shadow-[0_40px_120px_rgba(0,0,0,0.55)]
        ring-1 ring-white/15
      "
      style={{ aspectRatio: "71.6 / 146.6" }}
    >
      {/* Glass highlight (top-left sheen) */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.8rem] bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      {/* Edge vignette (subtle side shading) */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.8rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_-14px_30px_rgba(0,0,0,0.35),inset_14px_0_30px_rgba(0,0,0,0.25),inset_-14px_0_30px_rgba(0,0,0,0.25)]" />

      {/* Screen area */}
      <div
        className="
          relative z-10 h-full w-full overflow-hidden
          rounded-[2.2rem]
          bg-black
          ring-1 ring-white/10
          shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]
        "
      >
        {/* Dynamic Island */}
        <div className="pointer-events-none absolute left-1/2 top-2.5 z-30 -translate-x-1/2">
          <div className="h-[22px] w-[120px] rounded-full bg-black shadow-[0_4px_12px_rgba(0,0,0,0.5)] ring-1 ring-white/10" />
          <div className="absolute left-1/2 top-1/2 h-[3px] w-[40px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />
          <div className="absolute right-[16px] top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-white/12" />
        </div>
        <div className="absolute inset-0">
          {children}
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-[10px] left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-white/20 blur-[0.2px]" />
    </div>
  )
}


function AutoPlayYouTubeEmbed({ className = "", aspect = "16:9", frameless = false }: AutoPlayYouTubeEmbedProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const hasStartedRef = useRef(false)
  const [inView, setInView] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  // IntersectionObserver - only sets inView=true ONCE
  useEffect(() => {
    if (prefersReducedMotion || hasStartedRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStartedRef.current) {
            hasStartedRef.current = true
            setInView(true)
          }
        })
      },
      { threshold: 0.35, rootMargin: "0px 0px -20% 0px" }
    )

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current)
    }

    return () => observer.disconnect()
  }, [prefersReducedMotion])

  // Determine iframe src - ALWAYS has a valid URL, never empty
  const iframeSrc = useMemo(() => {
    // If reduced motion, always use base (no autoplay)
    if (prefersReducedMotion) return BASE_SRC
    // If user tapped for sound, use sound version
    if (soundOn) return AUTOPLAY_SOUND_SRC
    // If in view, use muted autoplay
    if (inView) return AUTOPLAY_MUTED_SRC
    // Default: base src (visible but not autoplaying)
    return BASE_SRC
  }, [prefersReducedMotion, soundOn, inView])

  // Handle "Tap for sound"
  const handleTapForSound = useCallback(() => {
    setSoundOn(true)
  }, [])

  // Show overlay only when: autoplaying (inView), not yet unmuted, not reduced motion
  const showSoundOverlay = inView && !soundOn && !prefersReducedMotion

  // Aspect ratio padding: 16:9 = 56.25%, 9:16 = 177.777%
  const aspectPadding = aspect === "9:16" ? "177.777%" : "56.25%"

  // Frameless mode: fills parent (aspect ratio controlled by parent)
  // Normal mode: creates own aspect ratio container with decorative styling
  if (frameless) {
    return (
      <div 
        ref={wrapperRef}
        className={`relative z-10 h-full w-full bg-black ${className}`}
      >
        <iframe
          key={soundOn ? "sound" : inView ? "autoplay" : "base"}
          src={iframeSrc}
          title="C2C Video"
          className="absolute inset-0 z-10 h-full w-full bg-black"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {/* "Tap for sound" overlay */}
        {showSoundOverlay && (
          <button
            onClick={handleTapForSound}
            className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/80 hover:bg-black/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-2 rounded-full border border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg z-10"
            aria-label="Tap to enable sound"
          >
            <Volume2 className="w-4 h-4" />
            <span>Tap for sound</span>
          </button>
        )}
      </div>
    )
  }

  return (
    <div 
      ref={wrapperRef}
      className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-xl shadow-black/30 ${className}`}
    >
      {/* Aspect Ratio Container - guaranteed non-zero size */}
      <div className="relative w-full" style={{ paddingTop: aspectPadding }}>
        <iframe
          key={soundOn ? "sound" : inView ? "autoplay" : "base"}
          src={iframeSrc}
          title="C2C Video"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* "Tap for sound" overlay */}
      {showSoundOverlay && (
        <button
          onClick={handleTapForSound}
          className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/80 hover:bg-black/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-2 rounded-full border border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg z-10"
          aria-label="Tap to enable sound"
        >
          <Volume2 className="w-4 h-4" />
          <span>Tap for sound</span>
        </button>
      )}
    </div>
  )
}

export function OurStory() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const { ref, isInView } = useSectionInView()
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const phoneRef = useRef(null)
  const isPhoneInView = useInView(phoneRef, { once: true, margin: "-50px" })
  
  // Cinematic zoom effect for iPhone mockup - reduced on mobile
  const { scrollYProgress } = useScroll({
    target: phoneRef,
    offset: ["start end", "center center"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.95, 1] : [0.8, 1])
  const glowIntensity = useTransform(scrollYProgress, [0, 1], [0.05, 0.15])
  
  const shouldAnimate = !prefersReducedMotion && !isMobile

  // Autoplay video when phone comes into view
  useEffect(() => {
    if (isPhoneInView && videoRef.current && !isPlaying) {
      const playVideo = async () => {
        try {
          await videoRef.current?.play()
          setIsPlaying(true)
        } catch (error) {
          // Silently handle autoplay restrictions
          if (error instanceof Error && error.name !== 'AbortError') {
            console.error('Autoplay failed:', error)
          }
        }
      }
      playVideo()
    }
  }, [isPhoneInView, isPlaying])

  const handlePlayVideo = useCallback(async () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        try {
          await videoRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          // Ignore AbortError when play is interrupted
          if (error instanceof Error && error.name !== 'AbortError') {
            console.error('Video playback error:', error)
          }
        }
      }
    }
  }, [isPlaying])

  const { container: containerVariants, item: itemVariants } = useMemo(
    () => createStaggerVariants(prefersReducedMotion, isMobile),
    [prefersReducedMotion, isMobile]
  )

  const highlights = [
    { icon: Briefcase, text: "Apple's first Canadian intern + return offer" },
    { icon: Target, text: "Scotiabank Family Office (UHNW)" },
    { icon: Users, text: "MLSE Brand Marketing" },
    { icon: Briefcase, text: "Interviews at Microsoft, BlackRock, Morgan Stanley and more" },
  ]

  return (
    <section id="our-story" ref={ref} className="relative py-20 md:py-32 bg-gradient-to-br from-c2c-navy via-c2c-navy-light/90 to-c2c-navy noise-overlay overflow-hidden">
      {/* Subtle radial gradient spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-c2c-teal/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-c2c-gold/5 rounded-full blur-3xl" />
      
      {/* ==================== MOBILE VERSION (sandwich layout) ==================== */}
      <div className="md:hidden px-5 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center"
        >
          {/* 1. Headline first */}
          <motion.div variants={itemVariants} className="text-center mb-2">
            <span className="text-c2c-gold text-xs font-semibold tracking-wide uppercase relative inline-block">
              Unlock Your Dream Role
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-c2c-gold origin-left"
              />
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl font-semibold text-white text-center mb-1 drop-shadow-lg"
          >
            More callbacks.
          </motion.h2>
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-semibold text-white text-center mb-6 drop-shadow-lg"
          >
            Less chaos.
          </motion.h2>

          {/* 2. YouTube Video Embed in the middle - vertical 9:16 for mobile */}
          <motion.div variants={itemVariants} className="w-full max-w-[260px] mx-auto mb-8">
            <div className="relative">
              {/* Decorative glow behind video */}
              <div className="absolute -inset-4 bg-c2c-teal/10 rounded-3xl blur-2xl -z-10" />
              
              <AutoPlayYouTubeEmbed aspect="9:16" />
            </div>
            
            {/* Caption */}
            <p className="text-white/60 text-xs mt-3 text-center">
              Watch: how C2C works
            </p>
          </motion.div>

          {/* 3. Text content - hero quote style */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-sm mb-6 w-full"
          >
            {/* Top accent line - gold dominant gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-c2c-gold/60 via-c2c-gold to-c2c-gold/60 rounded-full shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
            
            <div className="bg-white/[0.05] backdrop-blur-sm rounded-2xl px-5 pt-6 pb-5 border border-white/[0.1] shadow-lg shadow-black/10">
              {/* Why C2C? badge - brand gold, larger, premium feel */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-c2c-gold/25 to-c2c-gold/10 border border-c2c-gold/40 flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.15)]">
                  <Sparkles className="w-4.5 h-4.5 text-c2c-gold" />
                </div>
                <span className="bg-c2c-gold/15 border border-c2c-gold/30 text-c2c-gold text-sm font-bold tracking-wide px-3 py-1.5 rounded-lg">
                  Why C2C?
                </span>
              </div>
              
              <div className="space-y-2.5">
                <p className="text-[19px] text-white font-semibold leading-snug">
                  Your materials should open doors, not get ignored.
                </p>
                <p className="text-white/80 text-[15px] leading-relaxed">
                  We sharpen your applications and get you where you want to be with less pressure and more support.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bullet highlights - premium list items with left accent */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2.5 mb-8 w-full max-w-sm">
            {highlights.map((item, idx) => (
              <div 
                key={idx} 
                className="relative flex items-center gap-3 bg-white/[0.04] backdrop-blur-sm rounded-xl pl-4 pr-4 py-3.5 border border-white/[0.08] overflow-hidden group"
              >
                {/* Left accent bar - teal fading to gold at bottom */}
                <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-c2c-teal via-c2c-teal/70 to-c2c-gold/60" />
                
                {/* Icon chip */}
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-c2c-teal/25 to-c2c-teal/10 border border-c2c-teal/20 flex items-center justify-center flex-shrink-0 ml-2">
                  <item.icon className="w-4 h-4 text-c2c-teal" />
                </div>
                
                <span className="text-white text-sm font-medium leading-snug">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 w-full max-w-xs">
            <Button
              asChild
              className="w-full bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-6 py-5 rounded-lg shadow-[0_0_25px_rgba(58,166,168,0.3)]"
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Free Consultation
              </a>
            </Button>
            <a 
              href="#services" 
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById("services")
                if (element) {
                  const headerOffset = 80
                  const elementPosition = element.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.scrollY - headerOffset
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" })
                }
              }}
              className="text-white/80 hover:text-white font-medium text-sm transition-colors duration-200 underline underline-offset-4"
            >
              View services
            </a>
          </motion.div>

          {/* Trust microcopy */}
          <motion.p variants={itemVariants} className="mt-4 text-white/70 text-xs text-center">
            {TRUST_MICROCOPY}
          </motion.p>
        </motion.div>
      </div>

      {/* ==================== DESKTOP VERSION (unchanged) ==================== */}
      <div className="hidden md:block max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center"
        >
          {/* Left Content */}
          <div>
            <motion.div variants={itemVariants} className="inline-block mb-4">
              <span className="text-c2c-gold text-sm font-semibold tracking-wide uppercase relative">
                Unlock Your Dream Role
                <motion.span 
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-c2c-gold origin-left"
                />
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-semibold text-white mb-2 drop-shadow-lg"
            >
              More callbacks.
            </motion.h2>
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-semibold text-white mb-8 drop-shadow-lg"
            >
              Less chaos.
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="space-y-4 text-c2c-text-navy max-w-xl leading-relaxed"
            >
              <p className="text-xl italic text-white/95 drop-shadow-md">
                Your materials should open doors, not get ignored.
              </p>
              <p className="text-white/95 text-lg drop-shadow-md">
                We sharpen your applications and get you where you want to be with less pressure and more support.
              </p>
            </motion.div>

            {/* Bullet highlights */}
            <motion.div variants={itemVariants} className="mt-8 space-y-3">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-c2c-teal/15 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-c2c-teal" />
                  </div>
                  <span className="text-c2c-text-navy text-base drop-shadow-md">{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Row */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-8 py-6 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg shadow-[0_0_25px_rgba(58,166,168,0.3)]"
              >
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Free Consultation
                </a>
              </Button>
              <a 
                href="#services" 
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById("services")
                  if (element) {
                    const headerOffset = 80
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.scrollY - headerOffset
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" })
                  }
                }}
                className="text-c2c-text-navy hover:text-white font-medium text-sm transition-colors duration-200 underline underline-offset-4"
              >
                View services
              </a>
            </motion.div>

            {/* Trust microcopy */}
            <motion.p variants={itemVariants} className="mt-4 text-c2c-text-navy/80 text-sm drop-shadow-md">
              {TRUST_MICROCOPY}
            </motion.p>
          </div>

          {/* Right - iPhone Frame with YouTube Embed */}
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <motion.div 
              ref={phoneRef}
              className="relative isolate"
              style={{ 
                scale: shouldAnimate ? scale : 1
              }}
            >
              <IPhoneFrame>
                <AutoPlayYouTubeEmbed aspect="9:16" frameless />
              </IPhoneFrame>
              
              {/* Decorative glow with dynamic intensity */}
              <motion.div 
                className="absolute -inset-10 bg-c2c-teal rounded-[80px] blur-3xl -z-10"
                style={{
                  opacity: shouldAnimate ? glowIntensity : 0.1
                }}
              />
            </motion.div>
            
            {/* Caption centered under phone */}
            <p className="text-c2c-text-navy/70 text-sm mt-6 text-center drop-shadow-md">
              Watch: how C2C works
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
