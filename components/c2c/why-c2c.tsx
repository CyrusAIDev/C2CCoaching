"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { useSectionInView } from "@/hooks/use-section-in-view"
import { createStaggerVariants } from "@/lib/animations"
import { SectionHeading } from "@/components/c2c/section-heading"
import { SectionBackground } from "@/components/c2c/section-background"
import { BOOKING_URL } from "@/lib/constants"

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
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? {} : { y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="bg-white border-c2c-navy/10 rounded-2xl overflow-hidden h-full transition-all duration-300 hover:shadow-xl shadow-lg">
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
