"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useMemo } from "react"
import { Header } from "@/components/c2c/header"
import { Footer } from "@/components/c2c/footer"
import { SectionHeading } from "@/components/c2c/section-heading"
import { SectionBackground } from "@/components/c2c/section-background"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { createStaggerVariants } from "@/lib/animations"
import { EMAIL } from "@/lib/constants"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What do you help with?",
    answer: "Resume edits, cover letters, role tailoring, interview prep, and (optionally) full application support."
  },
  {
    question: "How do I book?",
    answer: `Payment confirms your session and secures your spot. Book through the website, or e-transfer to ${EMAIL}.`
  },
  {
    question: "What's your turnaround time?",
    answer: "To protect quality, anything you want supported (resume, cover letter, or full applications) must be sent 48 hours before the deadline."
  },
  {
    question: "Do you offer rush support?",
    answer: "Sometimes. Short-notice requests may be accepted only if capacity allows (rush fees may apply)."
  },
  {
    question: "What happens if I need to reschedule?",
    answer: "No problem, just give 24 hours' notice."
  },
  {
    question: "What if I cancel late or don't show?",
    answer: "Changes within 24 hours, no-shows, or arriving 15+ minutes late may result in the session being deducted."
  },
  {
    question: "When do you respond?",
    answer: "Primarily Monday–Friday. Weekend replies aren't guaranteed unless you flag the deadline in advance."
  },
  {
    question: "How do package hours work?",
    answer: "Package hours include calls + behind-the-scenes work (edits, tailoring, prep, follow-ups)."
  },
  {
    question: "Do packages expire?",
    answer: "Yes, packages must be used within 90 days of purchase (unless stated otherwise)."
  },
  {
    question: "Do you guarantee interviews or offers?",
    answer: "Results depend on many factors (timing, fit, market, competition). Best outcomes come from staying responsive, completing action items, and meeting deadlines. Think of a car—you'll be driving and C2C is the vehicle."
  },
  {
    question: "Do you offer discounts?",
    answer: "Occasionally. Promos must be used within the stated window (typically 24 hours) and aren't retroactive."
  },
  {
    question: "Are refunds available?",
    answer: "All packages are final sale once payment is processed."
  },
  {
    question: "Do you have support options for students with financial hardship?",
    answer: "A limited number of mentorship/advising spots may be available based on proof and availability."
  },
]

export default function FAQPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const prefersReducedMotion = usePrefersReducedMotion()

  const { container: containerVariants, item: itemVariants } = useMemo(
    () => createStaggerVariants(prefersReducedMotion),
    [prefersReducedMotion]
  )

  return (
    <main className="min-h-screen bg-c2c-offwhite">
      <Header />
      
      <section ref={ref} className="pt-32 pb-24 bg-c2c-offwhite relative overflow-hidden">
        <SectionBackground />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div
            variants={prefersReducedMotion ? {} : containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mb-12"
          >
            <motion.span
              variants={itemVariants}
              className="text-c2c-gold font-semibold text-base tracking-wider uppercase mb-4 block"
            >
              Got Questions?
            </motion.span>
            <motion.div variants={itemVariants} className="mb-6">
              <SectionHeading title="Frequently Asked Questions" isInView={isInView} />
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-c2c-navy/80 text-xl mt-8 max-w-xl mx-auto"
            >
              Everything you need to know about working with C2C.
            </motion.p>
          </motion.div>

          <motion.div
            variants={prefersReducedMotion ? {} : containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <AccordionItem 
                    value={`item-${index}`}
                    className="bg-white border border-c2c-border rounded-xl px-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
                  >
                    <AccordionTrigger className="text-left text-c2c-navy font-medium text-lg py-5 hover:no-underline hover:text-c2c-teal transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-c2c-navy/90 text-base pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            variants={prefersReducedMotion ? {} : itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-16 text-center"
          >
            <p className="text-c2c-navy/80 text-lg mb-4">
              Still have questions?
            </p>
            <a 
              href={`mailto:${EMAIL}`}
              className="text-c2c-teal hover:text-c2c-teal/80 font-medium text-lg transition-colors"
            >
              Reach out to {EMAIL}
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
