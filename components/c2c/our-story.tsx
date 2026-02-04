"use client"

import { useState, useRef, useCallback, useMemo, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Briefcase, Target, Users, Play } from "lucide-react"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { useSectionInView } from "@/hooks/use-section-in-view"
import { createStaggerVariants } from "@/lib/animations"
import { BOOKING_URL, TRUST_MICROCOPY } from "@/lib/constants"

export function OurStory() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { ref, isInView } = useSectionInView()
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const phoneRef = useRef(null)
  const isPhoneInView = useInView(phoneRef, { once: true, margin: "-50px" })

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
    () => createStaggerVariants(prefersReducedMotion),
    [prefersReducedMotion]
  )

  const highlights = [
    { icon: Briefcase, text: "Apple's first Canadian intern + return offer" },
    { icon: Target, text: "Scotiabank Family Office (UHNW)" },
    { icon: Users, text: "MLSE Brand Marketing" },
    { icon: Briefcase, text: "Interviews at Microsoft, BlackRock, Morgan Stanley and more" },
  ]

  return (
    <section id="our-story" ref={ref} className="relative py-32 bg-gradient-to-br from-c2c-navy via-c2c-navy-light/90 to-c2c-navy noise-overlay overflow-hidden">
      {/* Subtle radial gradient spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-c2c-teal/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-c2c-gold/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
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
              <a href="#services" className="text-c2c-text-navy hover:text-white font-medium text-sm transition-colors duration-200 underline underline-offset-4">
                View services
              </a>
            </motion.div>

            {/* Trust microcopy */}
            <motion.p variants={itemVariants} className="mt-4 text-c2c-text-navy/80 text-sm drop-shadow-md">
              {TRUST_MICROCOPY}
            </motion.p>
          </div>

          {/* Right - iPhone Video Mock */}
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <div className="relative" ref={phoneRef}>
              {/* iPhone Frame */}
              <div className="relative w-[320px] md:w-[360px] bg-black rounded-[55px] p-3.5 shadow-2xl shadow-black/50">
                {/* Dynamic Island */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-full z-20" />
                
                {/* Screen */}
                <div className="relative bg-c2c-navy rounded-[45px] overflow-hidden aspect-[9/19.5]">
                  {/* Video Player */}
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src="/videos/c2c-intro.mp4" type="video/mp4" />
                  </video>
                  
                  {/* Play button overlay */}
                  {!isPlaying && (
                    <button
                      onClick={handlePlayVideo}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-c2c-navy/60 to-c2c-navy/80 transition-opacity duration-300 hover:bg-c2c-navy/70"
                      aria-label="Play video"
                    >
                      <div className="w-20 h-20 rounded-full bg-c2c-teal/90 flex items-center justify-center mb-4 shadow-lg shadow-c2c-teal/30 transition-transform duration-200 hover:scale-110">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                      <span className="text-white/90 text-base font-medium">Watch intro</span>
                    </button>
                  )}

                  {/* Pause overlay when playing */}
                  {isPlaying && (
                    <button
                      onClick={handlePlayVideo}
                      className="absolute inset-0 opacity-0 hover:opacity-100 flex items-center justify-center bg-black/20 transition-opacity duration-300"
                      aria-label="Pause video"
                    />
                  )}
                </div>
                
                {/* Home Indicator */}
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-36 h-1.5 bg-white/30 rounded-full" />
              </div>
              
              {/* Decorative glow */}
              <div className="absolute -inset-10 bg-c2c-teal/10 rounded-[80px] blur-3xl -z-10" />
            </div>
            
            {/* Caption centered under phone */}
            <p className="text-c2c-text-navy/70 text-sm mt-6 text-center drop-shadow-md">
              Watch: how C2C works (60s)
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
