"use client"

import { Button } from "@/components/ui/button"

import { useCallback, useMemo, memo } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { useSectionInView } from "@/hooks/use-section-in-view"
import { createStaggerVariants } from "@/lib/animations"
import { SectionHeading } from "@/components/c2c/section-heading"
import { SectionBackground } from "@/components/c2c/section-background"
import { BOOKING_URL } from "@/lib/constants"

const testimonials = [
  {
    headline: "C2C was my turning point.",
    body: "I joined in late first year with low confidence. Shania helped sharpen my applications and networking with a clear step-by-step process.",
    result: "Landed my first summer internship (Molson Canadian, IBM finalist).",
    name: "Varun D.",
    title: "Second Year, York University",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    headline: "Finally understood what recruiters want.",
    body: "I was applying to hundreds of jobs with no callbacks. Shania completely transformed my approach.",
    result: "Received multiple offers, accepted at a Big 4 consulting firm.",
    name: "Sarah M.",
    title: "Third Year, University of Toronto",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    headline: "The best investment in my career.",
    body: "The 1:1 coaching was personalized and practical—not generic advice you can find online.",
    result: "Landed my dream internship at a top tech company after 6 weeks.",
    name: "Michael T.",
    title: "Second Year, Western University",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    headline: "Worth every penny.",
    body: "Shania's insider knowledge made all the difference. She knew exactly what companies look for.",
    result: "Secured a summer analyst position in capital markets.",
    name: "Priya K.",
    title: "Third Year, McGill University",
    stars: 4.5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    headline: "Game-changer for networking.",
    body: "C2C taught me how to build genuine connections in a way that felt natural.",
    result: "Built a network that led to three referrals and my Amazon internship.",
    name: "David L.",
    title: "Second Year, Queen's University",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    headline: "Transformed my interview skills.",
    body: "I used to freeze up in interviews. The mock sessions completely changed my confidence.",
    result: "Went from failing interviews to receiving my top-choice offer.",
    name: "Emma R.",
    title: "Third Year, UBC",
    stars: 4.5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  },
]

const StarRating = memo(function StarRating({ count }: { count: number }) {
  const fullStars = Math.floor(count)
  const hasHalfStar = count % 1 !== 0
  
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <Star
              key={i}
              className="w-4 h-4 fill-c2c-gold text-c2c-gold"
            />
          )
        }
        if (i === fullStars && hasHalfStar) {
          return (
            <div key={i} className="relative w-4 h-4">
              <Star className="absolute w-4 h-4 fill-c2c-muted/30 text-c2c-muted/30" />
              <div className="absolute overflow-hidden w-2 h-4">
                <Star className="w-4 h-4 fill-c2c-gold text-c2c-gold" />
              </div>
            </div>
          )
        }
        return (
          <Star
            key={i}
            className="w-4 h-4 fill-c2c-muted/30 text-c2c-muted/30"
          />
        )
      })}
    </div>
  )
})

export function Reviews() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { ref, isInView } = useSectionInView()

  const { container: containerVariants, item: itemVariants } = useMemo(
    () => createStaggerVariants(prefersReducedMotion),
    [prefersReducedMotion]
  )

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <section ref={ref} className="py-32 bg-c2c-offwhite relative overflow-hidden">
      <SectionBackground />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionHeading title="What Our Clients Say" isInView={isInView} />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Card className="bg-white border-c2c-border rounded-2xl p-6 h-full transition-shadow duration-300 hover:shadow-2xl shadow-md group">
                {/* Header with avatar and stars */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-c2c-offwhite ring-2 ring-c2c-teal/20 group-hover:ring-c2c-teal/40 transition-all duration-300">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-c2c-navy text-base">
                        {testimonial.name}
                      </p>
                      <p className="text-c2c-navy/70 text-sm">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                  <StarRating count={testimonial.stars} />
                </div>
                
                {/* Headline */}
                <h3 className="text-lg font-semibold text-c2c-navy mb-3 leading-snug">
                  &ldquo;{testimonial.headline}&rdquo;
                </h3>
                
                {/* Body */}
                <p className="text-c2c-navy/80 text-sm leading-relaxed mb-4">
                  {testimonial.body}
                </p>
                
                {/* Result */}
                <div className="bg-c2c-teal/5 rounded-lg p-3 border-l-2 border-c2c-teal">
                  <p className="text-sm">
                    <span className="font-semibold text-c2c-teal">Result: </span>
                    <span className="text-c2c-navy">{testimonial.result}</span>
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col items-center mt-16 gap-4"
        >
          <p className="text-c2c-muted text-center">Ready to start your journey?</p>
          <Button
            asChild
            className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-8 py-6 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg shadow-[0_0_25px_rgba(58,166,168,0.25)]"
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book Free Consultation
            </a>
          </Button>
        </motion.div>
        
        {/* Back to top */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex justify-center mt-12"
        >
          <button
            onClick={scrollToTop}
            className="flex flex-col items-center gap-2 text-c2c-navy/50 hover:text-c2c-teal transition-colors duration-200 group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span className="text-sm">Back to top</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
