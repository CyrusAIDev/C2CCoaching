"use client"

import { useState, useCallback, useMemo, memo, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown, Plus, Sparkles } from "lucide-react"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { useSectionInView } from "@/hooks/use-section-in-view"
import { createStaggerVariants } from "@/lib/animations"
import { SectionHeading } from "@/components/c2c/section-heading"
import { BOOKING_URL } from "@/lib/constants"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Grouped content structure for cleaner hierarchy
const fastTrackGroups = [
  {
    label: "Materials",
    items: ["Resume + LinkedIn audit + rewrite"],
    detail: "So you look hireable fast",
  },
  {
    label: "Strategy", 
    items: ["Target roles + company list + exact next steps"],
  },
  {
    label: "Networking",
    items: ["Scripts that sound like you"],
    detail: "No cringe outreach",
  },
  {
    label: "Interview",
    items: ["Prep for the basics + common questions"],
  },
  {
    label: "Support",
    items: ["A simple tracker so you always know what to do next"],
  },
]

const insiderEdgeExtras = [
  {
    label: "Applications",
    items: ["Tailoring + submissions support"],
    detail: "So you don't miss deadlines",
  },
  {
    label: "Interview",
    items: ["Multiple rounds + case/behavioural confidence"],
  },
  {
    label: "Positioning",
    items: ["Your story + answers that make recruiters remember you"],
  },
  {
    label: "Networking",
    items: ["Who to reach out to, what to say, how to follow up"],
  },
  {
    label: "Offers",
    items: ["Guidance + negotiation basics"],
    detail: "When it gets real",
  },
  {
    label: "Support",
    items: ["Ongoing feedback so you're not guessing"],
  },
]

const plans = [
  {
    name: "FAST TRACK",
    hours: "4 hours",
    price: "$678 CAD",
    priceNote: "(tax incl.)",
    outcome: "Get a fast reset + a clear plan — without dragging this out.",
    groups: fastTrackGroups,
    perfectIf: "You mostly need clarity + sharp materials to start landing interviews.",
    featured: false,
  },
  {
    name: "INSIDER EDGE",
    hours: "8 hours", 
    price: "$1130 CAD",
    priceNote: "(tax incl.)",
    outcome: "End-to-end support through recruiting season (strategy + execution).",
    includesFastTrack: true,
    groups: insiderEdgeExtras,
    perfectIf: "You want the fastest path from \"I'm applying everywhere\" to interviews + callbacks, with someone in your corner the whole way.",
    featured: true,
  },
]

const GroupedBullets = memo(function GroupedBullets({ groups, compact = false }: { groups: typeof fastTrackGroups; compact?: boolean }) {
  return (
    <div className={`space-y-${compact ? '3' : '4'}`}>
      {groups.map((group, idx) => (
        <div key={idx} className="space-y-1">
          <p className="text-c2c-teal text-sm font-semibold uppercase tracking-wider">{group.label}</p>
          {group.items.map((item, itemIdx) => (
            <div key={itemIdx} className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-c2c-teal/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 text-c2c-teal" />
              </div>
              <div>
                <p className="text-white/95 text-base leading-relaxed">{item}</p>
                {group.detail && (
                  <p className="text-white/70 text-sm mt-0.5">{group.detail}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
})

const PricingCard = memo(function PricingCard({ plan, prefersReducedMotion, isMobile }: { plan: typeof plans[0]; prefersReducedMotion: boolean; isMobile: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 300, damping: 30 })

  const shouldAnimate = !prefersReducedMotion && !isMobile

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!shouldAnimate || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }, [prefersReducedMotion, mouseX, mouseY])
  
  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldAnimate ? rotateX : 0,
        rotateY: shouldAnimate ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={shouldAnimate ? { y: -4 } : {}}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`relative bg-c2c-navy-light/30 backdrop-blur-sm border rounded-2xl p-6 md:p-8 h-full transition-all duration-300 ${
          plan.featured
            ? "border-c2c-teal/40 shadow-[0_0_50px_-15px_rgba(58,166,168,0.35)]"
            : "border-white/10 hover:border-white/15"
        }`}
      >
      {plan.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-c2c-teal text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      {/* Header: Name + Hours + Price */}
      <div className="text-center mb-6">
        <h3 className="text-c2c-gold text-sm font-semibold tracking-widest mb-1">
          {plan.name}
        </h3>
        <p className="text-white/70 text-base mb-4">{plan.hours}</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl md:text-5xl font-semibold text-white">
            {plan.price}
          </span>
        </div>
        <span className="text-white/60 text-sm">{plan.priceNote}</span>
      </div>

      {/* Outcome - Highlighted */}
      <div className="bg-c2c-teal/10 border border-c2c-teal/20 rounded-lg px-4 py-3 mb-6">
        <p className="text-white/95 text-base text-center font-medium leading-relaxed">
          {plan.outcome}
        </p>
      </div>

      {/* Includes Fast Track badge for Insider Edge */}
      {plan.includesFastTrack && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/60 text-xs font-medium px-2">Includes Fast Track</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          
          {/* Collapsed Fast Track summary */}
          <div className="bg-white/5 rounded-lg px-4 py-3">
            <p className="text-white/80 text-sm text-center">
              Materials + Strategy + Networking + Interview + Support
            </p>
          </div>
          
          <div className="flex items-center gap-2 mt-4 mb-3">
            <div className="flex-1 h-px bg-c2c-teal/30" />
            <span className="text-c2c-teal text-xs font-semibold px-2">Plus</span>
            <div className="flex-1 h-px bg-c2c-teal/30" />
          </div>
        </div>
      )}

      {/* Main content - Collapsed by default on mobile */}
      <div className="max-w-xs mx-auto">
        {/* Always show first 3 groups */}
        <GroupedBullets groups={plan.groups.slice(0, 3)} compact />
        
        {/* Expandable section for remaining groups */}
        {plan.groups.length > 3 && (
          <>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4"
                >
                  <GroupedBullets groups={plan.groups.slice(3)} compact />
                </motion.div>
              )}
            </AnimatePresence>
            
            <button
              onClick={toggleExpanded}
              className="w-full mt-4 flex items-center justify-center gap-1.5 text-white/60 hover:text-white/80 text-xs font-medium transition-colors"
            >
              <span>{isExpanded ? "Show less" : "See full breakdown"}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </button>
          </>
        )}
      </div>

      {/* Perfect If */}
      <div className="mt-6 pt-5 border-t border-white/10">
        <p className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-1.5">Perfect if</p>
        <p className="text-white/90 text-base leading-relaxed">
          {plan.perfectIf}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6 space-y-2">
        <Button
          asChild
          className={`w-full font-semibold py-5 text-base rounded-lg transition-all duration-200 hover:-translate-y-0.5 ${
            plan.featured
              ? "bg-c2c-teal hover:bg-c2c-teal/90 text-white shadow-[0_0_20px_rgba(58,166,168,0.3)]"
              : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
          }`}
        >
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Get Started
          </a>
        </Button>
        <p className="text-white/60 text-sm text-center">
          Free 30-min consult + perks included
        </p>
      </div>
      </Card>
    </motion.div>
  )
})

// Mobile-only 3-tier plans (desktop uses `plans` array above)
const mobilePlans = [
  {
    name: "FAST TRACK",
    hours: "4 hours",
    price: "$678",
    priceNote: "CAD (tax incl.)",
    tagline: "Get a fast reset + a clear plan",
    bullets: [
      "Resume + LinkedIn audit & rewrite",
      "Target roles + company list",
      "Networking scripts that work",
      "Basic interview prep",
      "Progress tracker",
    ],
    includesFrom: null,
    featured: false,
  },
  {
    name: "MOMENTUM",
    hours: "6 hours",
    price: "$904",
    priceNote: "CAD (tax incl.)",
    tagline: "Build real traction fast",
    bullets: [
      "Application tailoring support",
      "Deeper interview coaching",
      "Positioning & storytelling",
      "Networking follow-up strategy",
      "Ongoing check-ins",
    ],
    includesFrom: "Fast Track",
    featured: true,
  },
  {
    name: "INSIDER EDGE",
    hours: "8 hours",
    price: "$1130",
    priceNote: "CAD (tax incl.)",
    tagline: "End-to-end recruiting support",
    bullets: [
      "Multiple interview rounds prep",
      "Case & behavioural confidence",
      "Offer guidance + negotiation",
      "Full accountability partner",
      "Priority scheduling",
    ],
    includesFrom: "Momentum",
    featured: false,
  },
]

export function ServicePerks() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const { ref, isInView } = useSectionInView()

  const { container: containerVariants, item: itemVariants } = useMemo(
    () => createStaggerVariants(prefersReducedMotion),
    [prefersReducedMotion]
  )

  return (
    <section id="services" ref={ref} className="relative py-20 md:py-32 bg-gradient-to-br from-c2c-navy via-c2c-navy-light to-c2c-navy-dark noise-overlay overflow-hidden">
      {/* Subtle spotlight effect */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-c2c-teal/5 rounded-full blur-3xl" />
      
      {/* ==================== MOBILE VERSION - 3 Tier Pricing Cards ==================== */}
      <div className="md:hidden px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
            Service Perks
          </h2>
          <p className="text-c2c-gold text-base font-semibold mb-2">
            1:1 Coaching Sessions
          </p>
          <p className="text-white/90 text-sm max-w-xs mx-auto leading-relaxed">
            Pick the level that matches where you're at.
          </p>
        </motion.div>

        {/* 3-Tier Pricing Cards */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 mb-5"
        >
          {mobilePlans.map((plan, idx) => (
            <div 
              key={plan.name}
              className={`relative rounded-2xl p-4 transition-all ${
                plan.featured 
                  ? "bg-c2c-teal/15 border-2 border-c2c-teal/40 shadow-[0_0_30px_-10px_rgba(58,166,168,0.4)]" 
                  : "bg-white/[0.04] border border-white/10"
              }`}
            >
              {/* Most Popular badge */}
              {plan.featured && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                  <span className="bg-c2c-teal text-white text-[10px] font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card Header */}
              <div className={`flex items-start justify-between ${plan.featured ? 'pt-2' : ''}`}>
                <div>
                  <p className="text-c2c-gold text-[10px] font-semibold tracking-widest">{plan.name}</p>
                  <p className="text-white text-2xl font-bold">{plan.price}</p>
                  <p className="text-white/50 text-[10px]">{plan.priceNote}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/70 text-xs font-medium">{plan.hours}</p>
                  <p className="text-white/90 text-[11px] mt-0.5 max-w-[120px] leading-snug">{plan.tagline}</p>
                </div>
              </div>

              {/* Includes line (for tiers 2 and 3) */}
              {plan.includesFrom && (
                <div className="mt-3 mb-2 flex items-center gap-2">
                  <div className="flex-1 h-px bg-c2c-teal/30" />
                  <span className="text-c2c-teal text-[9px] font-semibold whitespace-nowrap">
                    ✓ Everything in {plan.includesFrom} +
                  </span>
                  <div className="flex-1 h-px bg-c2c-teal/30" />
                </div>
              )}

              {/* Bullet points */}
              <ul className={`space-y-1.5 ${plan.includesFrom ? 'mt-2' : 'mt-3'}`}>
                {plan.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx} className="flex items-start gap-2">
                    <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${plan.featured ? 'text-c2c-teal' : 'text-c2c-teal/80'}`} />
                    <span className="text-white/90 text-xs leading-snug">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button - meets 44px minimum tap target */}
              <Button
                asChild
                className={`w-full mt-4 font-semibold text-sm rounded-lg h-11 ${
                  plan.featured
                    ? "bg-c2c-teal hover:bg-c2c-teal/90 text-white shadow-[0_0_15px_rgba(58,166,168,0.3)]"
                    : "bg-white/10 hover:bg-white/15 text-white border border-white/20"
                }`}
              >
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Get Started
                </a>
              </Button>
            </div>
          ))}
        </motion.div>

        {/* Coach connection - warm, personal */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="bg-c2c-gold/10 border border-c2c-gold/20 rounded-xl p-4 mb-5"
        >
          <p className="text-white text-sm leading-relaxed text-center">
            <span className="text-c2c-gold font-medium">You'll work directly with Shania</span> — calm, clear guidance the whole way.
          </p>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-white/70 text-xs mb-3">
            Not sure which one fits? We'll figure it out together.
          </p>
          <Button
            asChild
            className="w-full bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold h-12 text-sm rounded-lg shadow-[0_0_20px_rgba(58,166,168,0.25)]"
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book Free Consultation
            </a>
          </Button>
          <p className="text-white/50 text-[10px] mt-2">
            30 minutes • No commitment • All plans start here
          </p>
        </motion.div>
      </div>

      {/* ==================== DESKTOP VERSION (unchanged) ==================== */}
      <div className="hidden md:block max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-white">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              Service Perks
            </h2>
          </div>
          <p className="text-c2c-gold text-xl font-semibold mb-3 drop-shadow-md">
            1:1 Coaching Sessions
          </p>
          <p className="text-white/90 text-lg max-w-lg mx-auto leading-relaxed drop-shadow-md">
            Whether you need a fast reset or full recruiting support, pick the level that matches where you{"'"}re at.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6 md:gap-8 mb-14"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? {} : { y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <PricingCard plan={plan} prefersReducedMotion={prefersReducedMotion} isMobile={isMobile} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-white/95 text-xl mb-1 drop-shadow-md">Not sure which one fits?</p>
          <p className="text-white/80 text-base mb-6 drop-shadow-md">
            Book a FREE consultation, and we{"'"}ll choose the right plan in 30 minutes.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-10 py-6 rounded-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl shadow-[0_0_30px_rgba(58,166,168,0.3)]"
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book Free Consultation
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
