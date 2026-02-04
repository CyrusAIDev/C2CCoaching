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
    <section ref={ref} className="py-16 bg-c2c-offwhite relative overflow-hidden">
      {/* Subtle background blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-c2c-teal/5 rounded-full blur-3xl" />
      <div className="max-w-5xl mx-auto px-6">
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-c2c-navy text-sm font-semibold tracking-wide uppercase mb-10"
        >
          Companies Our Clients Have Landed
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          {companies.map((company) => (
            <motion.div
              key={company.name}
              variants={itemVariants}
              className="bg-white border border-c2c-border rounded-xl w-[140px] h-[75px] shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center"
            >
              <Image
                src={company.logo || "/placeholder.svg"}
                alt={`${company.name} logo`}
                width={company.width}
                height={company.height}
                sizes="95px"
                className="opacity-90 hover:opacity-100 transition-opacity duration-200 object-contain max-w-[95px] max-h-[48px]"
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* And many more + trust line */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-c2c-navy font-medium text-base">
            and many more...
          </p>
          <p className="text-c2c-navy/80 text-sm mt-1">
            Real results from students at top schools.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export const LogoStrip = memo(LogoStripComponent)
