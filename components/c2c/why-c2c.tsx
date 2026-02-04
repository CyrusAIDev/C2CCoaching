"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const features = [
  {
    title: "Access That Moves the Needle",
    description: "Build real connections that open doors—no cold begging required.",
    bullets: [
      "Outreach scripts that sound like you",
      "Community events that create opportunities",
    ],
    image: "/images/c2c-workshop.jpg",
  },
  {
    title: "Affordable Co-op Alternative",
    description: "Real results without the hefty co-op price tag.",
    bullets: [
      "Save thousands vs. expensive programs",
      "High-impact, cost-effective coaching",
    ],
    image: "/images/team-collaboration.jpg",
  },
  {
    title: "Led by an Industry Insider",
    description: "Work with someone who's done it at Apple, Scotiabank, and MLSE.",
    bullets: [
      "Stronger story, sharper positioning",
      "Recruiter-level resume standards",
    ],
    image: "/images/shania-apple-hq.jpg",
  },
]

export function WhyC2C() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section ref={ref} className="py-32 bg-c2c-offwhite relative overflow-hidden">
      {/* Subtle background blobs */}
      <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-c2c-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-[350px] h-[350px] bg-c2c-gold/5 rounded-full blur-3xl" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-c2c-navy mb-4 relative inline-block">
            Why C2C?
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
          <p className="text-c2c-muted text-lg max-w-xl mx-auto mt-8">
            <span className="font-semibold text-c2c-navy">Personalized support.</span> Insider-led strategy. <span className="font-semibold text-c2c-navy">Real results.</span>
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? {} : { y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="bg-white border-c2c-navy/10 rounded-2xl overflow-hidden h-full transition-all duration-300 hover:shadow-xl shadow-md">
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <h3 className="text-lg font-semibold text-c2c-navy mb-3 whitespace-nowrap">
                    {feature.title}
                  </h3>
                  <p className="text-c2c-navy/80 text-base mb-5 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.bullets.map((bullet, idx) => (
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
          ))}
        </motion.div>
      </div>
    </section>
  )
}
