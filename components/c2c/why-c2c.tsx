"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { useSectionInView } from "@/hooks/use-section-in-view"
import { createStaggerVariants } from "@/lib/animations"
import { SectionHeading } from "@/components/c2c/section-heading"
import { SectionBackground } from "@/components/c2c/section-background"
import { BOOKING_URL } from "@/lib/constants"
import { MobileAutoCarousel } from "@/components/c2c/mobile-auto-carousel"

const features = [
  {
    title: "THE PLAN",
    description: "Stop applying blindly.",
    subdescription: "A clear weekly game plan that turns \"I'm trying\" into interviews booked.",
    bullets: [
      "Target roles + exact next steps (no spiral)",
      "Resume + LinkedIn that actually reads \"hire me\"",
      "A tracker that keeps you accountable",
    ],
    image: "/images/c2c-workshop-new.jpg",
  },
  {
    title: "THE ACCESS",
    description: "Alternative to Co-op Results. Minus Co-op Pricing",
    subdescription: "You'll build real connections, without cold begging or awkward DMs.",
    bullets: [
      "Scripts that sound like you (and get replies)",
      "Who to reach out to + what to say + when to follow up",
      "Coffee chats that turn into referrals",
    ],
    image: "/images/team-collaboration-new.jpg",
  },
  {
    title: "THE EDGE",
    description: "Insider-Led. Recruiter-Level Coaching",
    subdescription: "This is the difference between \"maybe\" and offer.",
    bullets: [
      "Stronger story + sharper positioning (your \"why you\")",
      "Interview prep that makes you calm, not shaky",
      "Application support so deadlines don't beat you",
    ],
    image: "/images/shania-apple-hq-new.jpg",
  },
]

function FeatureCard({ feature, itemVariants, prefersReducedMotion, isMobile }: any) {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })
  
  const shouldAnimate = !prefersReducedMotion && !isMobile
  
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!shouldAnimate) return
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }
  
  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }
  
  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldAnimate ? rotateX : 0,
        rotateY: shouldAnimate ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={shouldAnimate ? { y: -8 } : {}}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white border-c2c-navy/10 rounded-2xl overflow-hidden h-full transition-all duration-300 hover:shadow-2xl shadow-lg">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={feature.image || "/placeholder.svg"}
            alt={feature.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
            className="object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        </div>
        <div className="p-7">
          <h3 className="text-xl font-semibold text-c2c-navy mb-3">
            {feature.title}
          </h3>
          <p className="text-c2c-navy font-semibold text-lg mb-2 leading-relaxed">
            {feature.description}
          </p>
          <p className="text-c2c-navy/90 text-lg mb-5 leading-relaxed">
            {feature.subdescription}
          </p>
          <ul className="space-y-3">
            {feature.bullets.map((bullet: string, idx: number) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-base text-c2c-navy"
              >
                <span className="w-2 h-2 rounded-full bg-c2c-teal mt-2 flex-shrink-0" />
                <span className="leading-relaxed font-medium">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  )
}

export function WhyC2C() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const { ref, isInView } = useSectionInView()
  
  // Track when section comes into view to reset carousel
  const [carouselResetKey, setCarouselResetKey] = useState(0)
  const wasInViewRef = useRef(false)
  
  useEffect(() => {
    // When isInView transitions from false to true, increment reset key
    if (isInView && !wasInViewRef.current) {
      setCarouselResetKey(prev => prev + 1)
    }
    wasInViewRef.current = isInView
  }, [isInView])

  const { container: containerVariants, item: itemVariants } = useMemo(
    () => createStaggerVariants(prefersReducedMotion),
    [prefersReducedMotion]
  )

  return (
    <section ref={ref} className="py-20 md:py-32 bg-c2c-offwhite relative overflow-hidden">
      <SectionBackground />
      
      {/* ==================== MOBILE VERSION ==================== */}
      <div className="md:hidden px-4">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <SectionHeading title="This is how you get the interview." isInView={isInView} className="mb-3 text-2xl" />
          <p className="text-c2c-navy/90 text-base max-w-xs mx-auto mt-4 font-medium">
            No guesswork. No spray-and-pray.
          </p>
        </motion.div>

        {/* Mobile Carousel */}
        <MobileAutoCarousel 
          intervalMs={5000} 
          showDots={true}
          showArrows={true}
          slideSize="88%"
          startIndex={0}
          resetKey={carouselResetKey}
          autoplayDelayMs={2500}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white border border-c2c-navy/10 rounded-2xl overflow-hidden shadow-lg mx-1">
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 33vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-c2c-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-c2c-navy font-semibold text-base mb-1.5 leading-relaxed">
                    {feature.description}
                  </p>
                  <p className="text-c2c-navy/90 text-sm mb-4 leading-relaxed">
                    {feature.subdescription}
                  </p>
                  <ul className="space-y-2">
                    {feature.bullets.map((bullet: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-c2c-navy"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-c2c-teal mt-1.5 flex-shrink-0" />
                        <span className="leading-relaxed font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </MobileAutoCarousel>

        {/* CTA Section - Mobile */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-10"
        >
          <Button
            asChild
            className="w-full max-w-xs bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-6 py-5 rounded-lg shadow-[0_0_25px_rgba(58,166,168,0.3)]"
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a free consult
            </a>
          </Button>
          <p className="mt-3 text-c2c-navy/70 text-sm">
            We'll map your next 2 weeks in 10 minutes.
          </p>
        </motion.div>
      </div>

      {/* ==================== DESKTOP VERSION (unchanged) ==================== */}
      <div className="hidden md:block max-w-6xl mx-auto px-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <SectionHeading title="This is how you get the interview." isInView={isInView} className="mb-4" />
          <p className="text-c2c-navy/80 text-xl max-w-xl mx-auto mt-8 font-medium">
            No guesswork. No spray-and-pray.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <FeatureCard 
              key={feature.title}
              feature={feature}
              itemVariants={itemVariants}
              prefersReducedMotion={prefersReducedMotion}
              isMobile={isMobile}
            />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button
            asChild
            className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-8 py-6 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg shadow-[0_0_25px_rgba(58,166,168,0.3)]"
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a free consult
            </a>
          </Button>
          <p className="mt-4 text-c2c-navy/70 text-base">
            We'll map your next 2 weeks in 10 minutes.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
