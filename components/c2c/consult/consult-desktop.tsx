"use client"

import { useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { SectionBackground } from "@/components/c2c/section-background"
import { Footer } from "@/components/c2c/footer"
import { LeadForm } from "./lead-form"
import {
  companies,
  callSteps,
  benefits,
  howItWorks,
  testimonials,
  faqs,
} from "./consult-data"
import { TRUST_MICROCOPY } from "@/lib/constants"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { useSectionInView } from "@/hooks/use-section-in-view"
import { createStaggerVariants } from "@/lib/animations"
import {
  FileText,
  ListChecks,
  Wrench,
  CalendarCheck,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  CheckCircle2,
  Star,
  Search,
  Target,
  Zap,
  Ghost,
  HelpCircle,
  Flame,
  Sparkles,
  CalendarDays,
  Lightbulb,
  Building2,
  Award,
  Briefcase,
  TrendingUp,
  XCircle,
  Check,
} from "lucide-react"

const benefitIcons = { FileText, ListChecks, Wrench, CalendarCheck }
const callStepIcons = { Search, Target, Zap }

export function ConsultDesktop() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const painView = useSectionInView()
  const credView = useSectionInView()
  const stepsView = useSectionInView()
  const callView = useSectionInView()
  const fitView = useSectionInView()
  const testimonialsView = useSectionInView()
  const faqView = useSectionInView()

  const { container: staggerContainer, item: staggerItem } = useMemo(
    () => createStaggerVariants(prefersReducedMotion),
    [prefersReducedMotion]
  )

  const fadeUp = useMemo(
    () => ({
      hidden: prefersReducedMotion ? {} : { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    }),
    [prefersReducedMotion]
  )

  const scrollToForm = useCallback(() => {
    const el = document.getElementById("hero-form")
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: offset, behavior: "smooth" })
    }
  }, [])

  return (
    <main id="top" className="relative min-h-screen bg-c2c-offwhite">
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-50 bg-c2c-navy/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="flex items-center justify-center bg-white rounded-full p-1.5 shadow-md mr-2.5 min-w-[44px] min-h-[44px]">
              <Image src="/images/c2c-logo.png" alt="C2C" width={44} height={44} sizes="44px" className="h-10 w-10 object-contain" priority />
            </span>
            <span className="text-white font-semibold text-sm">C2C Coaching</span>
          </Link>
          <div className="flex items-center gap-4">
            <a href="#faq" className="text-white/70 hover:text-white text-sm font-medium transition-colors">FAQ</a>
            <Button onClick={scrollToForm} size="sm" className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold rounded-lg text-sm px-4">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Cinematic Dark Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.jpg" alt="" fill sizes="100vw" className="object-cover object-top" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-c2c-navy/80 via-c2c-navy/90 to-c2c-navy/98" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:max-w-xl"
            >
              <h1 className="text-4xl lg:text-[2.75rem] xl:text-5xl font-semibold text-white leading-[1.15] mb-5 text-balance lg:max-w-[38rem]">
                Walk away with a <span className="text-c2c-teal whitespace-nowrap">2 week action plan</span> and fix what&apos;s blocking your callbacks.
              </h1>
              <p className="text-xl text-white/90 mb-6 leading-relaxed font-medium">
                Get my <strong>14-day checklist</strong> + a LinkedIn/Resume scorecard + a free <strong>30-minute consult</strong>.
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                {[
                  { icon: Ghost, text: "Applying nonstop but still getting ignored" },
                  { icon: HelpCircle, text: "Not sure what to fix first (resume vs LinkedIn vs strategy)" },
                  { icon: Lightbulb, text: "You want a plan that tells you what to do this week" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-2.5">
                    <item.icon className="w-5 h-5 text-c2c-teal mt-0.5 flex-shrink-0" />
                    <span className="text-white/95 text-base">{item.text}</span>
                  </li>
                ))}
              </ul>

              <p className="text-white/85 text-sm font-medium mb-4">{TRUST_MICROCOPY}</p>

              <div>
                <p className="inline-flex items-center bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-c2c-teal text-sm font-semibold tracking-wide uppercase mb-3">
                  Trusted by students landing roles at
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 bg-white rounded-xl px-6 py-5 shadow-md border border-black/10">
                  {companies.map((c) => (
                    <div key={c.name} className="flex items-center justify-center h-10 min-w-[64px]">
                      <Image
                        src={c.logo}
                        alt={`${c.name} logo`}
                        width={c.w}
                        height={c.h}
                        priority
                        className={`object-contain w-auto h-auto ${
                          c.name === "Amex" || c.name === "EA"
                            ? "max-h-[38px]"
                            : "max-h-[34px]"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:max-w-[440px]"
            >
              <LeadForm id="hero-form" variant="dark" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain → After Band */}
      <section ref={painView.ref} className="py-16 bg-white relative overflow-hidden">
        <SectionBackground />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate={painView.isInView ? "visible" : "hidden"}>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-c2c-navy/[0.03] border border-c2c-navy/10 rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-c2c-navy mb-5 flex items-center gap-2.5">
                  <Flame className="w-5 h-5 text-c2c-gold" />
                  If this is you...
                </h3>
                <ul className="flex flex-col gap-4">
                  {[
                    { icon: Ghost, text: "You're applying everywhere and hearing nothing back" },
                    { icon: HelpCircle, text: "You don't know whether to fix your resume, LinkedIn, or strategy first" },
                    { icon: Flame, text: "You're burning out from the cycle of apply-wait-repeat" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-c2c-navy/[0.06] flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-c2c-navy/50" />
                      </div>
                      <span className="text-c2c-navy/70 text-base leading-relaxed pt-1">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-c2c-teal/[0.04] border border-c2c-teal/15 rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-c2c-navy mb-5 flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-c2c-teal" />
                  After a call with Shania...
                </h3>
                <ul className="flex flex-col gap-4">
                  {[
                    { icon: Target, text: "You'll know exactly what's costing you callbacks and how to fix it" },
                    { icon: CalendarDays, text: "You'll have a 14-day sprint plan tailored to your target roles" },
                    { icon: Zap, text: "You'll leave with your single best next move, ready to execute" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-c2c-teal/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-c2c-teal" />
                      </div>
                      <span className="text-c2c-navy/70 text-base leading-relaxed pt-1">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meet Shania - Full block */}
      <section ref={credView.ref} className="py-16 bg-c2c-offwhite">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate={credView.isInView ? "visible" : "hidden"}>
            <h2 className="text-3xl font-semibold text-c2c-navy mb-8 text-center">Meet Shania</h2>
            <div className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-2xl p-10 border border-c2c-border shadow-lg">
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-xl ring-2 ring-c2c-teal/20 flex-shrink-0">
                <Image
                  src="/images/meet Shania.jpg"
                  alt="Shania - C2C Founder"
                  fill
                  sizes="192px"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex-1">
                <p className="text-c2c-navy/80 text-lg leading-relaxed mb-6">
                  Shania has been Apple&apos;s first Canadian intern, received her return offer there and her other internships. She&apos;s also helped students land at IBM, Deloitte, Goldman Sachs, Morgan Stanley, and more. She&apos;s built C2C to help students become competitive in today&apos;s job market.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                    { icon: Building2, label: "Apple", detail: "First Canadian intern + return offer" },
                    { icon: Award, label: "Scotiabank", detail: "Family Office (UHNW)" },
                    { icon: Briefcase, label: "MLSE", detail: "Brand Marketing" },
                    { icon: TrendingUp, label: "Interviews", detail: "Microsoft, BlackRock, Morgan Stanley & more" },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="w-10 h-10 rounded-full bg-c2c-teal/10 flex items-center justify-center mx-auto mb-2.5">
                        <item.icon className="w-5 h-5 text-c2c-teal" />
                      </div>
                      <p className="text-c2c-navy font-semibold text-sm">{item.label}</p>
                      <p className="text-c2c-navy/50 text-xs leading-relaxed mt-0.5">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Stepper - moved up */}
      <section ref={stepsView.ref} className="py-24 lg:py-16 bg-white relative overflow-hidden">
        <SectionBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate={stepsView.isInView ? "visible" : "hidden"} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-c2c-navy mb-3">How it works</h2>
            <p className="text-c2c-navy/70 text-lg">Three steps. No guesswork.</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate={stepsView.isInView ? "visible" : "hidden"} className="grid md:grid-cols-3 gap-6">
            {howItWorks.map((s, i) => (
              <motion.div key={s.num} variants={staggerItem}>
                <div className="relative bg-white border border-c2c-border rounded-2xl p-6 text-center h-full shadow-sm">
                  {i < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-c2c-teal/30" />
                  )}
                  <div className="w-14 h-14 rounded-full bg-c2c-teal/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-c2c-teal text-lg font-bold">{s.num}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-c2c-navy mb-2">{s.title}</h3>
                  <p className="text-c2c-navy/70 text-base leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What Happens on the Call & What You Get - integrated */}
      <section ref={callView.ref} className="py-24 lg:py-16 bg-c2c-offwhite relative overflow-hidden">
        <SectionBackground />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate={callView.isInView ? "visible" : "hidden"} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-c2c-navy mb-3">What happens on the call and what you get</h2>
            <p className="text-c2c-navy/70 text-lg max-w-2xl mx-auto">30 minutes. Zero fluff. You&apos;ll leave with a plan you can execute today.</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate={callView.isInView ? "visible" : "hidden"} className="grid md:grid-cols-3 gap-6 mb-12">
            {callSteps.map((s) => {
              const Icon = callStepIcons[s.icon as keyof typeof callStepIcons]
              return (
                <motion.div key={s.title} variants={staggerItem}>
                  <Card className="bg-white border-c2c-border rounded-2xl p-6 h-full shadow-md hover:shadow-xl transition-shadow duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-c2c-teal/10 flex items-center justify-center mb-4 group-hover:bg-c2c-teal/20 transition-colors">
                      {Icon && <Icon className="w-6 h-6 text-c2c-teal" />}
                    </div>
                    <h3 className="text-lg font-semibold text-c2c-navy mb-2">{s.title}</h3>
                    <p className="text-c2c-navy/70 text-base leading-relaxed">{s.desc}</p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate={callView.isInView ? "visible" : "hidden"} className="mb-8">
            <p className="text-c2c-navy/60 text-sm font-medium text-center mb-6">You&apos;ll walk away with:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b) => {
                const Icon = benefitIcons[b.icon as keyof typeof benefitIcons]
                return (
                  <div key={b.title} className="flex items-start gap-4 bg-white/80 rounded-xl p-4 border border-c2c-border">
                    <div className="w-10 h-10 rounded-lg bg-c2c-teal/10 flex items-center justify-center flex-shrink-0">
                      {Icon && <Icon className="w-5 h-5 text-c2c-teal" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-c2c-navy text-sm">{b.title}</h4>
                      <p className="text-c2c-navy/70 text-sm leading-relaxed">{b.shortDesc || b.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate={callView.isInView ? "visible" : "hidden"} className="flex flex-col items-center">
            <Button onClick={scrollToForm} className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-8 py-6 text-base rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl shadow-[0_0_25px_rgba(58,166,168,0.3)]">
              Get My Free Resources <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <p className="text-c2c-navy/40 text-sm mt-3">No pressure to buy. You&apos;ll still leave with clarity and a plan.</p>
          </motion.div>

          <p className="text-c2c-navy/50 text-sm text-center mt-8 max-w-2xl mx-auto italic">
            Built from the same system we&apos;ve used with students pushing into competitive internships + new grad roles.
          </p>
        </div>
      </section>

      {/* For You / Not for You Split */}
      <section ref={fitView.ref} className="py-20 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate={fitView.isInView ? "visible" : "hidden"}>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-c2c-teal/5 border border-c2c-teal/15 rounded-2xl p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-full bg-c2c-teal/15 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-c2c-teal" />
                  </div>
                  <h3 className="text-lg font-semibold text-c2c-navy">This is for you if...</h3>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {[
                    "You're a student or recent grad looking for internships, co-ops, or entry-level roles",
                    "You want a structured plan instead of guessing what to do next",
                    "You're ready to put in the work, and you just need the right direction",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-c2c-teal mt-0.5 flex-shrink-0" />
                      <span className="text-c2c-navy/70 text-base leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-c2c-navy/[0.03] border border-c2c-navy/10 rounded-2xl p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-full bg-c2c-navy/10 flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-4 h-4 text-c2c-navy/50" />
                  </div>
                  <h3 className="text-lg font-semibold text-c2c-navy">This might not be for you if...</h3>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {[
                    "You're looking for guaranteed job placement. We help you become a stronger candidate, but there are no guarantees.",
                    "You're not willing to follow through. This is a partnership, not a shortcut.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-c2c-navy/40 mt-0.5 flex-shrink-0" />
                      <span className="text-c2c-navy/70 text-base leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsView.ref} className="py-24 lg:py-16 bg-c2c-offwhite relative overflow-hidden">
        <SectionBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate={testimonialsView.isInView ? "visible" : "hidden"} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-c2c-navy mb-3">What our clients say</h2>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate={testimonialsView.isInView ? "visible" : "hidden"} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={staggerItem}>
                <Card className="bg-white border-c2c-border rounded-2xl p-5 h-full shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden bg-c2c-offwhite ring-2 ring-c2c-teal/20 flex-shrink-0">
                      <Image src={t.avatar} alt={t.name} fill sizes="44px" className={`object-cover ${t.name === "Varun D." ? "object-center" : "object-top"}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-c2c-navy text-sm truncate">{t.name}</p>
                      <p className="text-c2c-navy/60 text-xs truncate">{t.title}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-c2c-gold text-c2c-gold" />
                    ))}
                  </div>
                  <h4 className="text-base font-semibold text-c2c-navy mb-2 leading-snug">&ldquo;{t.headline}&rdquo;</h4>
                  <p className="text-c2c-navy/70 text-sm leading-relaxed mb-3">{t.body}</p>
                  <div className="bg-c2c-teal/[0.08] rounded-lg p-3 border-l-[3px] border-c2c-teal">
                    <p className="text-sm">
                      <span className="font-bold text-c2c-teal">Result: </span>
                      <span className="text-c2c-navy/80 font-medium">{t.result}</span>
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex items-center justify-center gap-6 mt-12">
            {[
              { src: "/images/consult/work-ready-f683.png", caption: "Work ready" },
              { src: "/images/consult/consult-2.jpg", caption: "Community" },
              { src: "/images/consult/behind-scenes-somewhere.png", caption: "Behind the scenes", zoom: true },
            ].map((img) => (
              <div key={img.caption} className="flex flex-col items-center gap-2">
                <div className="relative w-48 h-32 rounded-xl overflow-hidden shadow-lg ring-1 ring-c2c-border">
                  <Image src={img.src} alt={img.caption} fill sizes="192px" className={`object-cover object-center ${img.zoom ? "scale-125" : ""}`} />
                </div>
                <span className="text-c2c-navy/40 text-xs font-medium">{img.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" ref={faqView.ref} className="py-24 lg:py-16 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate={faqView.isInView ? "visible" : "hidden"} className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-semibold text-c2c-navy mb-3">Frequently asked questions</h2>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate={faqView.isInView ? "visible" : "hidden"}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-c2c-navy/10">
                  <AccordionTrigger className="text-c2c-navy font-semibold text-base text-left py-5 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-c2c-navy/70 text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 text-center">
              <a href="#top" className="inline-flex items-center gap-1.5 text-c2c-navy/50 hover:text-c2c-teal text-sm font-medium transition-colors">
                <ArrowUp className="w-3.5 h-3.5" />
                Back to top
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA with form */}
      <section id="lead" className="py-24 lg:py-16 bg-c2c-offwhite relative overflow-hidden">
        <SectionBackground />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-semibold text-c2c-navy mb-3 text-balance">
              Ready to stop guessing and start landing callbacks?
            </h2>
            <p className="text-c2c-navy/70 text-lg">Get your free resources and book a call. No pressure.</p>
          </div>
          <LeadForm id="bottom-form" variant="light" />
        </div>
      </section>

      <Footer />
    </main>
  )
}
