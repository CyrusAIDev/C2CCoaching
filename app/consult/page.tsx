"use client"

import { useState, useCallback, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { SectionBackground } from "@/components/c2c/section-background"
import { Footer } from "@/components/c2c/footer"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { useSectionInView } from "@/hooks/use-section-in-view"
import { createStaggerVariants } from "@/lib/animations"
import {
  FileText,
  ListChecks,
  Wrench,
  CalendarCheck,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Star,
  ClipboardList,
  MessageSquare,
  PhoneCall,
  Loader2,
  AlertCircle,
  XCircle,
} from "lucide-react"

// ─────────────────────── constants ───────────────────────
const ROLE_OPTIONS = [
  "Internship",
  "New Grad / Entry-Level",
  "Co-op",
  "Career Switch",
  "Other",
]

const VISA_OPTIONS = [
  "Canadian Citizen / PR",
  "Valid Work Permit / Study Permit",
  "OPT / CPT (US)",
  "Other",
  "Prefer not to say",
]

const companies = [
  { name: "IBM", logo: "/images/logos/ibm.png", w: 70, h: 28 },
  { name: "Deloitte", logo: "/images/logos/deloitte.png", w: 85, h: 22 },
  { name: "RBC", logo: "/images/logos/rbc.png", w: 40, h: 44 },
  { name: "Amazon", logo: "/images/logos/amazon.png", w: 80, h: 26 },
  { name: "Amex", logo: "/images/logos/amex.png", w: 44, h: 44 },
  { name: "EA", logo: "/images/logos/ea-sports.png", w: 44, h: 44 },
]

const benefits = [
  {
    icon: FileText,
    title: "LinkedIn & Resume Scorecard",
    desc: "A detailed audit of what recruiters actually see -- and where you're losing them.",
  },
  {
    icon: ListChecks,
    title: "14-Day Action Checklist",
    desc: "A day-by-day plan designed to help sharpen your materials and build momentum fast.",
  },
  {
    icon: Wrench,
    title: "3 Quick Fixes",
    desc: "High-impact changes you can make today to improve how your profile reads.",
  },
  {
    icon: CalendarCheck,
    title: "Free 30-Min Consult",
    desc: "Walk through your plan live with a coach who knows recruiting inside-out.",
  },
]

const steps = [
  {
    icon: ClipboardList,
    num: "01",
    title: "Opt in",
    desc: "Drop your name and email. Takes 30 seconds.",
  },
  {
    icon: MessageSquare,
    num: "02",
    title: "Get your resources",
    desc: "Your scorecard + checklist hit your inbox right away.",
  },
  {
    icon: PhoneCall,
    num: "03",
    title: "Book your consult",
    desc: "Pick a time and walk away with a real game plan.",
  },
]

const testimonials = [
  {
    headline: "C2C was my turning point.",
    body: "Coming into first year, I had very little experience. C2C gave me a clear plan, tightened my resume + LinkedIn, and helped me communicate my story.",
    result: "Landed a role at Molson Breweries and became a finalist at IBM.",
    name: "Varun D.",
    title: "Second Year, York University",
    stars: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    headline: "My materials + outreach strategy finally clicked.",
    body: "I was based in England trying to break into fintech in London, and I wasn't getting momentum. After working with C2C, everything finally came together.",
    result: "Started landing interviews at Lazard, Goldman Sachs, and Morgan Stanley.",
    name: "Naina S.",
    title: "Final Year, LSE",
    stars: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    headline: "From no traction to multiple callbacks.",
    body: "Last summer I had nothing lined up. C2C helped me fix my positioning, build a real networking pipeline, and stop wasting time on random applications.",
    result: "Started getting callbacks at Deloitte and multiple consulting firms.",
    name: "Jasmine C.",
    title: "Third Year, Ivey Western",
    stars: 5,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  },
  {
    headline: "C2C grew my passions and helped me see my vision.",
    body: "I went from no resume, no direction and no application, to having insider knowledge, confidence and experiences under my belt.",
    result: "Now I'm interviewing with fast-paced startups.",
    name: "Adeena S.",
    title: "Second Year, UBC",
    stars: 5,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
]

const faqs = [
  {
    q: "How quickly will I get the scorecard and checklist?",
    a: "Instantly. As soon as you submit the form, your 14-day checklist and LinkedIn/Resume scorecard are sent straight to your inbox.",
  },
  {
    q: "I don't have much experience. Is this still for me?",
    a: "Absolutely. Most of our clients start with little or no experience. The whole point is to help you position what you have and build from there.",
  },
  {
    q: "I'm an international student. Can I still use this?",
    a: "Yes -- as long as you have a valid work permit, study permit, or visa that allows you to work. We've helped international students across Canada, the US, and the UK.",
  },
  {
    q: "What types of roles does C2C focus on?",
    a: "Internships, co-ops, and new grad roles across industries -- finance, consulting, tech, marketing, and more. We tailor our approach to your target.",
  },
  {
    q: "Do I need to upload anything before the consult?",
    a: "Nope. Just your name and email to start. On the thank-you page you can optionally share your LinkedIn or a resume link to help your coach prepare, but it's not required.",
  },
  {
    q: "How long is the turnaround for the consult?",
    a: "After you opt in, you book a time directly. Most clients get on a call within 2-5 days depending on availability.",
  },
]

// ─────────────────────── Lead Form (2-step) ───────────────────────
function LeadForm({ id }: { id?: string }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    phone: "",
    roleTarget: "",
    gradDate: "",
    visa: "",
  })

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      setError("")
    },
    []
  )

  const goStep2 = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!form.firstName.trim() || !emailValid) {
        setError("Please enter your name and a valid email.")
        return
      }
      setStep(2)
    },
    [form.firstName, emailValid]
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      setError("")

      // TODO: Wire Meta Pixel Lead event here
      // if (typeof window !== "undefined" && window.fbq) window.fbq("track", "Lead")

      // TODO: Wire backend lead capture (Web3Forms / MailerLite / etc.)
      // For now, redirect to thank-you with query params
      try {
        const params = new URLSearchParams({
          name: form.firstName,
          email: form.email,
        })
        router.push(`/consult/thank-you?${params.toString()}`)
      } catch {
        setError("Something went wrong. Please try again.")
        setIsSubmitting(false)
      }
    },
    [form, router]
  )

  const inputCls =
    "bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-lg focus:border-c2c-teal focus:ring-c2c-teal text-base h-12"
  const selectCls =
    "flex h-12 w-full rounded-lg border bg-white/10 border-white/20 px-3 py-2 text-base text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c2c-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"

  return (
    <div id={id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 flex-1">
          <span
            className={`w-8 h-8 rounded-full text-sm font-semibold flex items-center justify-center ${
              step >= 1
                ? "bg-c2c-teal text-white"
                : "bg-white/10 text-white/40"
            }`}
          >
            {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : "1"}
          </span>
          <div className="flex-1 h-0.5 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-c2c-teal transition-all duration-300"
              style={{ width: step >= 2 ? "100%" : "0%" }}
            />
          </div>
          <span
            className={`w-8 h-8 rounded-full text-sm font-semibold flex items-center justify-center ${
              step >= 2
                ? "bg-c2c-teal text-white"
                : "bg-white/10 text-white/40"
            }`}
          >
            2
          </span>
        </div>
        <span className="text-white/60 text-sm font-medium">
          Step {step} of 2
        </span>
      </div>

      {step === 1 && (
        <form onSubmit={goStep2} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-white/80 text-sm font-medium mb-1.5"
            >
              First name <span className="text-c2c-gold">*</span>
            </label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="e.g. Shania"
              value={form.firstName}
              onChange={handleChange}
              required
              className={inputCls}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-white/80 text-sm font-medium mb-1.5"
            >
              Email <span className="text-c2c-gold">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@university.edu"
              value={form.email}
              onChange={handleChange}
              required
              className={inputCls}
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> {error}
            </p>
          )}
          <Button
            type="submit"
            className="w-full bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold py-6 text-base rounded-lg mt-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl shadow-[0_0_25px_rgba(58,166,168,0.3)]"
          >
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-white/50 text-xs text-center">
            Takes 30 seconds. No spam.
          </p>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-white/80 text-sm font-medium mb-1.5"
            >
              Phone{" "}
              <span className="text-white/40 font-normal">(optional)</span>
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (___) ___-____"
              value={form.phone}
              onChange={handleChange}
              className={inputCls}
            />
          </div>
          <div>
            <label
              htmlFor="roleTarget"
              className="block text-white/80 text-sm font-medium mb-1.5"
            >
              What are you targeting?
            </label>
            <div className="relative">
              <select
                id="roleTarget"
                name="roleTarget"
                value={form.roleTarget}
                onChange={handleChange}
                className={selectCls}
              >
                <option value="" className="text-c2c-navy">Select role type</option>
                {ROLE_OPTIONS.map((r) => (
                  <option key={r} value={r} className="text-c2c-navy">
                    {r}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            </div>
          </div>
          <div>
            <label
              htmlFor="gradDate"
              className="block text-white/80 text-sm font-medium mb-1.5"
            >
              Expected graduation{" "}
              <span className="text-white/40 font-normal">(month / year)</span>
            </label>
            <Input
              id="gradDate"
              name="gradDate"
              type="month"
              value={form.gradDate}
              onChange={handleChange}
              className={inputCls}
            />
          </div>
          <div>
            <label
              htmlFor="visa"
              className="block text-white/80 text-sm font-medium mb-1.5"
            >
              Visa / work status
            </label>
            <div className="relative">
              <select
                id="visa"
                name="visa"
                value={form.visa}
                onChange={handleChange}
                className={selectCls}
              >
                <option value="" className="text-c2c-navy">Select status</option>
                {VISA_OPTIONS.map((v) => (
                  <option key={v} value={v} className="text-c2c-navy">
                    {v}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            </div>
          </div>
          {error && (
            <p className="text-red-400 text-sm flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> {error}
            </p>
          )}
          <div className="flex gap-3 mt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep(1)}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold py-6 text-base rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl shadow-[0_0_25px_rgba(58,166,168,0.3)] disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                </>
              ) : (
                "Send it to me"
              )}
            </Button>
          </div>
          <p className="text-white/40 text-[11px] text-center leading-relaxed">
            By submitting you agree to receive emails from C2C. Unsubscribe
            anytime. We respect your privacy.
          </p>
        </form>
      )}
    </div>
  )
}

// ─────────────────────── Page ───────────────────────
export default function ConsultPage() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const benefitsView = useSectionInView()
  const stepsView = useSectionInView()
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
    <main className="relative min-h-screen bg-c2c-offwhite">
      {/* ─── A) Sticky Top Bar ─── */}
      <header className="sticky top-0 z-50 bg-c2c-navy/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 md:px-6 flex items-center justify-between h-14 md:h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/c2c-logo.png"
              alt="C2C - From Campus 2 Corporate"
              width={190}
              height={75}
              sizes="120px"
              className="h-12 md:h-14 -my-2"
              style={{ width: "auto" }}
              priority
            />
          </Link>
          <div className="flex items-center gap-4">
            <a
              href="#faq"
              className="text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              FAQ
            </a>
            <Button
              onClick={scrollToForm}
              size="sm"
              className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold rounded-lg text-sm px-4"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* ─── B) Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-c2c-navy via-c2c-navy-light to-c2c-navy-dark noise-overlay">
        <SectionBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left - copy */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-white leading-tight mb-5 text-balance">
                Walk away with a 2-week action plan&nbsp;&mdash; and fix
                what{"'"}s blocking your callbacks.
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed font-medium">
                Get my 14-day checklist + a LinkedIn/Resume scorecard + a free
                30-minute consult.
              </p>

              {/* Bullets */}
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  "Designed to help you identify what's costing you callbacks",
                  "Designed to give you a clear, week-by-week action plan",
                  "Designed to prep you before your free 30-min strategy call",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-c2c-teal mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-base">{text}</span>
                  </li>
                ))}
              </ul>

              {/* Compact logo proof */}
              <div className="pt-2">
                <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-3">
                  Companies our clients have landed
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  {companies.map((c) => (
                    <div
                      key={c.name}
                      className="bg-white/10 rounded-lg p-2 flex items-center justify-center"
                    >
                      <Image
                        src={c.logo}
                        alt={`${c.name} logo`}
                        width={c.w}
                        height={c.h}
                        priority
                        className="opacity-80 object-contain max-h-[28px]"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right - form */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <LeadForm id="hero-form" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── C) What You Get ─── */}
      <section
        ref={benefitsView.ref}
        className="py-20 md:py-28 bg-c2c-offwhite relative overflow-hidden"
      >
        <SectionBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={benefitsView.isInView ? "visible" : "hidden"}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-c2c-navy mb-3">
              What you get
            </h2>
            <p className="text-c2c-navy/70 text-lg max-w-xl mx-auto">
              Everything you need to go from stalled to strategic.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={benefitsView.isInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {benefits.map((b) => (
              <motion.div key={b.title} variants={staggerItem}>
                <Card className="bg-white border-c2c-border rounded-2xl p-6 h-full shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-c2c-teal/10 flex items-center justify-center mb-4 group-hover:bg-c2c-teal/20 transition-colors">
                    <b.icon className="w-6 h-6 text-c2c-teal" />
                  </div>
                  <h3 className="text-lg font-semibold text-c2c-navy mb-2">
                    {b.title}
                  </h3>
                  <p className="text-c2c-navy/70 text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={benefitsView.isInView ? "visible" : "hidden"}
            className="flex justify-center mt-12"
          >
            <Button
              onClick={scrollToForm}
              className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-8 py-6 text-base rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl shadow-[0_0_25px_rgba(58,166,168,0.3)]"
            >
              Get My Free Resources <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── D) How It Works ─── */}
      <section
        ref={stepsView.ref}
        className="py-20 md:py-28 bg-gradient-to-b from-c2c-navy-light to-c2c-navy noise-overlay relative overflow-hidden"
      >
        <SectionBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={stepsView.isInView ? "visible" : "hidden"}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
              How it works
            </h2>
            <p className="text-white/70 text-lg">
              Three steps. No guesswork.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={stepsView.isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-6"
          >
            {steps.map((s, i) => (
              <motion.div key={s.num} variants={staggerItem}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center h-full">
                  <div className="w-14 h-14 rounded-full bg-c2c-teal/15 flex items-center justify-center mx-auto mb-4">
                    <s.icon className="w-6 h-6 text-c2c-teal" />
                  </div>
                  <span className="text-c2c-gold text-sm font-bold tracking-widest uppercase">
                    Step {s.num}
                  </span>
                  <h3 className="text-xl font-semibold text-white mt-2 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── E) Not For You ─── */}
      <section className="py-12 md:py-16 bg-c2c-offwhite">
        <div className="max-w-2xl mx-auto px-5 md:px-6">
          <div className="bg-c2c-navy/5 border border-c2c-navy/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-3 mb-3">
              <XCircle className="w-5 h-5 text-c2c-navy/50 mt-0.5 flex-shrink-0" />
              <h3 className="text-lg font-semibold text-c2c-navy">
                This might not be for you if...
              </h3>
            </div>
            <ul className="flex flex-col gap-2.5 pl-8">
              <li className="text-c2c-navy/70 text-sm leading-relaxed">
                You{"'"}re looking for guaranteed job placement -- we help you become a stronger candidate, but recruiting always involves some uncertainty.
              </li>
              <li className="text-c2c-navy/70 text-sm leading-relaxed">
                You{"'"}re not willing to put in the work -- this is a partnership, not a shortcut. The plan only works if you follow through.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── F) Testimonials ─── */}
      <section
        ref={testimonialsView.ref}
        className="py-20 md:py-28 bg-c2c-offwhite relative overflow-hidden"
      >
        <SectionBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={testimonialsView.isInView ? "visible" : "hidden"}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-c2c-navy mb-3">
              What our clients say
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={testimonialsView.isInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={staggerItem}>
                <Card className="bg-white border-c2c-border rounded-2xl p-5 h-full shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-c2c-offwhite ring-2 ring-c2c-teal/20 flex-shrink-0">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-c2c-navy text-sm truncate">
                        {t.name}
                      </p>
                      <p className="text-c2c-navy/60 text-xs truncate">
                        {t.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-c2c-gold text-c2c-gold"
                      />
                    ))}
                  </div>
                  <h4 className="text-base font-semibold text-c2c-navy mb-2 leading-snug">
                    &ldquo;{t.headline}&rdquo;
                  </h4>
                  <p className="text-c2c-navy/70 text-sm leading-relaxed mb-3">
                    {t.body}
                  </p>
                  <div className="bg-c2c-teal/5 rounded-lg p-2.5 border-l-2 border-c2c-teal">
                    <p className="text-sm">
                      <span className="font-semibold text-c2c-teal">
                        Result:{" "}
                      </span>
                      <span className="text-c2c-navy/80">{t.result}</span>
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── G) FAQ ─── */}
      <section
        id="faq"
        ref={faqView.ref}
        className="py-20 md:py-28 bg-gradient-to-b from-c2c-offwhite to-white relative overflow-hidden"
      >
        <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={faqView.isInView ? "visible" : "hidden"}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-c2c-navy mb-3">
              Frequently asked questions
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={faqView.isInView ? "visible" : "hidden"}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-c2c-navy/10"
                >
                  <AccordionTrigger className="text-c2c-navy font-semibold text-base text-left py-5 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-c2c-navy/70 text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ─── H) Final CTA ─── */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-c2c-navy via-c2c-navy-light to-c2c-navy-dark noise-overlay relative overflow-hidden">
        <SectionBackground />
        <div className="relative z-10 max-w-2xl mx-auto px-5 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3 text-balance">
              Ready to stop guessing and start landing callbacks?
            </h2>
            <p className="text-white/70 text-lg">
              Get your free resources and book a call. No pressure.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* ─── Footer ─── */}
      <Footer />
    </main>
  )
}
