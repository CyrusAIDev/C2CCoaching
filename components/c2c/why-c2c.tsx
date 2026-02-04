"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { useSectionInView } from "@/hooks/use-section-in-view"
import { createStaggerVariants } from "@/lib/animations"
import { SectionHeading } from "@/components/c2c/section-heading"
import { SectionBackground } from "@/components/c2c/section-background"

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
  const prefersReducedMotion = usePrefersReducedMotion()
  const { ref, isInView } = useSectionInView()

  const { container: containerVariants, item: itemVariants } = useMemo(
    () => createStaggerVariants(prefersReducedMotion),
    [prefersReducedMotion]
  )

  return (
    <section ref={ref} className="py-32 bg-c2c-offwhite relative overflow-hidden">
      <SectionBackground />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <SectionHeading title="Why C2C?" isInView={isInView} className="mb-4" />
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
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
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
