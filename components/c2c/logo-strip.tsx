"use client"

import { useMemo, memo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { useSectionInView } from "@/hooks/use-section-in-view"
import { createStaggerVariants } from "@/lib/animations"

const companies = [
  { 
    name: "IBM", 
    logo: "/images/logos/ibm.png",
    width: 90,
    height: 36
  },
  { 
    name: "Deloitte", 
    logo: "/images/logos/deloitte.png",
    width: 110,
    height: 28
  },
  { 
    name: "RBC", 
    logo: "/images/logos/rbc.png",
    width: 55,
    height: 60
  },
  { 
    name: "American Express", 
    logo: "/images/logos/amex.png",
    width: 60,
    height: 60
  },
  { 
    name: "Amazon", 
    logo: "/images/logos/amazon.png",
    width: 100,
    height: 32
  },
  { 
    name: "EA Sports", 
    logo: "/images/logos/ea-sports.png",
    width: 60,
    height: 60
  },
]

function LogoStripComponent() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { ref, isInView } = useSectionInView()

  const { container: containerVariants, item: itemVariants } = useMemo(
    () => createStaggerVariants(prefersReducedMotion),
    [prefersReducedMotion]
  )

  return (
    <section ref={ref} className="py-12 md:py-16 bg-c2c-offwhite relative overflow-hidden">
      {/* Subtle background blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-c2c-teal/5 rounded-full blur-3xl" />
      
      {/* ==================== MOBILE VERSION ==================== */}
      <div className="md:hidden">
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-c2c-navy text-sm font-semibold tracking-wide uppercase mb-6 px-4"
        >
          Companies Our Clients Have Landed
        </motion.p>

        {/* Seamless CSS Marquee with fade edges */}
        <div className="relative overflow-hidden">
          {/* Left fade edge */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-c2c-offwhite to-transparent z-10 pointer-events-none" />
          {/* Right fade edge */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-c2c-offwhite to-transparent z-10 pointer-events-none" />
          
          {/* Marquee track */}
          <div 
            className="flex gap-3"
            style={{
              animation: prefersReducedMotion ? 'none' : 'marquee 25s linear infinite',
              width: 'max-content',
            }}
          >
            {/* First set of logos */}
            {companies.map((company) => (
              <div
                key={`first-${company.name}`}
                className="bg-white border border-c2c-border rounded-xl h-[70px] w-[120px] shadow-sm flex items-center justify-center flex-shrink-0"
              >
                <Image
                  src={company.logo || "/placeholder.svg"}
                  alt={`${company.name} logo`}
                  width={company.width}
                  height={company.height}
                  sizes="80px"
                  className="opacity-90 object-contain max-w-[80px] max-h-[44px]"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {companies.map((company) => (
              <div
                key={`second-${company.name}`}
                className="bg-white border border-c2c-border rounded-xl h-[70px] w-[120px] shadow-sm flex items-center justify-center flex-shrink-0"
              >
                <Image
                  src={company.logo || "/placeholder.svg"}
                  alt={`${company.name} logo`}
                  width={company.width}
                  height={company.height}
                  sizes="80px"
                  className="opacity-90 object-contain max-w-[80px] max-h-[44px]"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Trust line - mobile */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.35, delay: 0.25 }}
          className="text-center mt-5 px-4"
        >
          <p className="text-c2c-navy font-medium text-base">
            and many more...
          </p>
          <p className="text-c2c-navy/70 text-sm mt-0.5">
            Real results from students at top schools.
          </p>
        </motion.div>
      </div>

      {/* ==================== DESKTOP VERSION ==================== */}
      <div className="hidden md:block max-w-5xl mx-auto px-6">
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-c2c-navy text-base font-semibold tracking-wide uppercase mb-10"
        >
          Companies Our Clients Have Landed
        </motion.p>

        {/* No stagger/pop animation - simple fade-in for the whole grid; single row on desktop */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-6 items-center gap-4 lg:gap-6"
        >
          {companies.map((company) => (
            <div
              key={company.name}
              className="bg-white border border-c2c-border rounded-xl w-full max-w-[140px] h-16 lg:h-20 mx-auto shadow-sm flex items-center justify-center transition-all duration-300 hover:border-c2c-teal/30 hover:shadow-[0_0_12px_rgba(58,166,168,0.15)]"
            >
              <Image
                src={company.logo || "/placeholder.svg"}
                alt={`${company.name} logo`}
                width={company.width}
                height={company.height}
                sizes="110px"
                className="opacity-80 hover:opacity-100 transition-opacity duration-200 object-contain w-auto h-8 lg:h-10 max-h-[52px] lg:max-h-[56px]"
              />
            </div>
          ))}
        </motion.div>
        
        {/* And many more + trust line */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-c2c-navy font-medium text-lg">
            and many more...
          </p>
          <p className="text-c2c-navy/90 text-base mt-1">
            Real results from students at top schools.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export const LogoStrip = memo(LogoStripComponent)
