"use client"

import { useState, useCallback, useMemo } from "react"
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
import { TRUST_MICROCOPY } from "@/lib/constants"
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
  Loader2,
  AlertCircle,
  XCircle,
  Check,
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
} from "lucide-react"

/* ─────────────────────── constants ─────────────────────── */
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

const callSteps = [
  {
    icon: Search,
    title: "Find the leaks",
    desc: "If your apps aren't converting, something's off. We identify the exact \"leak\" in your resume/LinkedIn/strategy that's costing you callbacks.",
  },
  {
    icon: Target,
    title: "Create your next 14 days",
    desc: "You'll walk away with a tailored checklist that tells you what to do each day to increase visibility and land interviews faster.",
  },
  {
    icon: Zap,
    title: "Lock your next step",
    desc: "You'll leave knowing the best move: self-serve resources, a focused coaching package, or a specific action plan you can run immediately.",
  },
]

const benefits = [
  {
    icon: FileText,
    title: "LinkedIn & Resume Scorecard",
    desc: "We score your resume + LinkedIn the way recruiters do, then show you what's blocking callbacks (positioning, keywords, readability, impact).",
  },
  {
    icon: ListChecks,
    title: "14-Day Action Checklist",
    desc: "A day-by-day plan tailored to your target roles, so you know exactly what to fix, what to apply to, and who to reach out to each day.",
  },
  {
    icon: Wrench,
    title: "3 Quick Fixes",
    desc: "Three high-impact edits you can make today to instantly improve how your profile reads and how you show up in searches.",
  },
  {
    icon: CalendarCheck,
    title: "Free 30-Min Consult",
    desc: "We walk through your scorecard, map your fastest path, and leave you with a clear next move (DIY resources or coaching).",
  },
]

const howItWorks = [
  { num: "01", title: "Opt in", desc: "Drop your name and email. Takes 30 seconds." },
  { num: "02", title: "Get your resources", desc: "Your scorecard + checklist will be discussed in the consultation to ensure accuracy and takeaways for your goals." },
  { num: "03", title: "Book your consult", desc: "Pick a time and walk away with a real game plan." },
]

const testimonials = [
  {
    headline: "C2C was my turning point.",
    body: "Coming into first year, I had very little experience. C2C gave me a clear plan, tightened my resume + LinkedIn, and helped me communicate my story.",
    result: "Landed a role at Molson Breweries and became a finalist at IBM.",
    name: "Varun D.",
    title: "Second Year, York University",
    stars: 5,
    avatar: "/images/reviews/varun.jpg",
  },
  {
    headline: "My materials + outreach strategy finally clicked.",
    body: "I was based in England trying to break into fintech in London, and I wasn't getting momentum. After working with C2C, everything finally came together.",
    result: "Started landing interviews at Lazard, Goldman Sachs, and Morgan Stanley.",
    name: "Naina S.",
    title: "Final Year, LSE",
    stars: 5,
    avatar: "/images/reviews/naina.jpg",
  },
  {
    headline: "From no traction to multiple callbacks.",
    body: "Last summer I had nothing lined up. C2C helped me fix my positioning, build a real networking pipeline, and stop wasting time on random applications.",
    result: "Started getting callbacks at Deloitte and multiple consulting firms.",
    name: "Jasmine C.",
    title: "Third Year, Ivey Western",
    stars: 5,
    avatar: "/images/reviews/jasmine.jpg",
  },
  {
    headline: "C2C grew my passions and helped me see my vision.",
    body: "I went from no resume, no direction and no application, to having insider knowledge, confidence and experiences under my belt.",
    result: "Now I'm interviewing with fast-paced startups.",
    name: "Adeena S.",
    title: "Second Year, UBC",
    stars: 5,
    avatar: "/images/reviews/adeena.jpg",
  },
]

const faqs = [
  { q: "How quickly will I get the scorecard and checklist?", a: "To ensure accuracy and discuss the results, you will receive them during our 30-minute consultation. This will ensure your goals are aligned with our scorecard and 14-day checklist. We don't want you to get generic advice, but advice specific to your situation." },
  { q: "I don't have much experience. Is this still for me?", a: "Absolutely. Most of our clients start with little or no experience. The whole point is to help you position what you have and build from there." },
  { q: "I'm an international student. Can I still use this?", a: "Yes -- as long as you have a valid work permit, study permit, or visa that allows you to work. We've helped international students across Canada, the US, and the UK." },
  { q: "What types of roles does C2C focus on?", a: "Internships, co-ops, and new grad roles across industries -- finance, consulting, tech, marketing, and more. We tailor our approach to your target." },
  { q: "Do I need to upload anything before the consult?", a: "Nope. Just your name and email to start. On the thank-you page you can optionally share your LinkedIn or a resume link to help your coach prepare, but it's not required." },
  { q: "How long is the turnaround for the consult?", a: "After you opt in, you book a time directly. Most clients get on a call within 2-5 days depending on availability." },
]

/* ─────────────────────── Lead Form (2-step) ─────────────────────── */
function LeadForm({ id, variant = "dark" }: { id?: string; variant?: "dark" | "light" }) {
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
      // TODO: Wire backend lead capture (Web3Forms / MailerLite / etc.)
      try {
        const params = new URLSearchParams({ name: form.firstName, email: form.email })
        router.push(`/consult/thank-you?${params.toString()}`)
      } catch {
        setError("Something went wrong. Please try again.")
        setIsSubmitting(false)
      }
    },
    [form, router]
  )

  const isDark = variant === "dark"

  const cardCls = isDark
    ? "bg-white/[0.07] backdrop-blur-md border border-white/[0.12] rounded-2xl p-5 lg:p-8 shadow-2xl"
    : "bg-white border border-c2c-border rounded-2xl p-5 lg:p-8 shadow-xl"

  const inputCls = isDark
    ? "bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-lg focus:border-c2c-teal focus:ring-c2c-teal text-base h-12"
    : "bg-c2c-offwhite border-c2c-border text-c2c-navy placeholder:text-c2c-navy/30 rounded-lg focus:border-c2c-teal focus:ring-c2c-teal text-base h-12"

  const selectCls = isDark
    ? "flex h-12 w-full rounded-lg border bg-white/10 border-white/20 px-3 py-2 text-base text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c2c-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
    : "flex h-12 w-full rounded-lg border bg-c2c-offwhite border-c2c-border px-3 py-2 text-base text-c2c-navy ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c2c-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"

  const labelCls = isDark ? "block text-white/80 text-sm font-medium mb-1.5" : "block text-c2c-navy/80 text-sm font-medium mb-1.5"
  const stepActiveCls = "bg-c2c-teal text-white"
  const stepInactiveCls = isDark ? "bg-white/10 text-white/40" : "bg-c2c-navy/10 text-c2c-navy/40"
  const barBg = isDark ? "bg-white/10" : "bg-c2c-navy/10"
  const stepLabel = isDark ? "text-white/60" : "text-c2c-navy/60"
  const errorCls = "text-red-400 text-sm flex items-center gap-1.5"
  const microCls = isDark ? "text-white/50 text-xs text-center" : "text-c2c-navy/50 text-xs text-center"
  const privacyCls = isDark ? "text-white/40 text-[11px] text-center leading-relaxed" : "text-c2c-navy/40 text-[11px] text-center leading-relaxed"
  const optionCls = "text-c2c-navy"

  return (
    <div id={id} className={cardCls}>
      {/* Progress */}
      <div className="flex items-center gap-3 mb-5 lg:mb-6">
        <div className="flex items-center gap-2 flex-1">
          <span className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full text-sm font-semibold flex items-center justify-center ${step >= 1 ? stepActiveCls : stepInactiveCls}`}>
            {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : "1"}
          </span>
          <div className={`flex-1 h-0.5 rounded-full ${barBg}`}>
            <div className="h-full rounded-full bg-c2c-teal transition-all duration-300" style={{ width: step >= 2 ? "100%" : "0%" }} />
          </div>
          <span className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full text-sm font-semibold flex items-center justify-center ${step >= 2 ? stepActiveCls : stepInactiveCls}`}>
            2
          </span>
        </div>
        <span className={`text-xs lg:text-sm font-medium ${stepLabel}`}>Step {step}/2</span>
      </div>

      {step === 1 && (
        <form onSubmit={goStep2} className="flex flex-col gap-3.5 lg:gap-4">
          <div>
            <label htmlFor={`${id}-firstName`} className={labelCls}>
              First name <span className="text-c2c-gold">*</span>
            </label>
            <Input id={`${id}-firstName`} name="firstName" placeholder="e.g. Shania" value={form.firstName} onChange={handleChange} required className={inputCls} />
          </div>
          <div>
            <label htmlFor={`${id}-email`} className={labelCls}>
              Email <span className="text-c2c-gold">*</span>
            </label>
            <Input id={`${id}-email`} name="email" type="email" placeholder="you@university.edu" value={form.email} onChange={handleChange} required className={inputCls} />
          </div>
          {error && <p className={errorCls}><AlertCircle className="w-4 h-4" /> {error}</p>}
          <Button type="submit" className="w-full bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold py-6 text-base rounded-lg mt-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl shadow-[0_0_25px_rgba(58,166,168,0.3)]">
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className={microCls}>Takes 30 seconds. No spam.</p>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 lg:gap-4">
          <div>
            <label htmlFor={`${id}-phone`} className={labelCls}>
              Phone <span className={isDark ? "text-white/40 font-normal" : "text-c2c-navy/40 font-normal"}>(optional)</span>
            </label>
            <Input id={`${id}-phone`} name="phone" type="tel" placeholder="+1 (___) ___-____" value={form.phone} onChange={handleChange} className={inputCls} />
          </div>
          <div>
            <label htmlFor={`${id}-roleTarget`} className={labelCls}>What are you targeting?</label>
            <div className="relative">
              <select id={`${id}-roleTarget`} name="roleTarget" value={form.roleTarget} onChange={handleChange} className={selectCls}>
                <option value="" className={optionCls}>Select role type</option>
                {ROLE_OPTIONS.map((r) => (<option key={r} value={r} className={optionCls}>{r}</option>))}
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-white/40" : "text-c2c-navy/40"}`} />
            </div>
          </div>
          <div>
            <label htmlFor={`${id}-gradDate`} className={labelCls}>
              Expected graduation <span className={isDark ? "text-white/40 font-normal" : "text-c2c-navy/40 font-normal"}>(month / year)</span>
            </label>
            <Input id={`${id}-gradDate`} name="gradDate" type="month" value={form.gradDate} onChange={handleChange} className={inputCls} />
          </div>
          <div>
            <label htmlFor={`${id}-visa`} className={labelCls}>Visa / work status</label>
            <div className="relative">
              <select id={`${id}-visa`} name="visa" value={form.visa} onChange={handleChange} className={selectCls}>
                <option value="" className={optionCls}>Select status</option>
                {VISA_OPTIONS.map((v) => (<option key={v} value={v} className={optionCls}>{v}</option>))}
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-white/40" : "text-c2c-navy/40"}`} />
            </div>
          </div>
          {error && <p className={errorCls}><AlertCircle className="w-4 h-4" /> {error}</p>}
          <div className="flex gap-3 mt-1">
            <Button type="button" variant="ghost" onClick={() => setStep(1)} className={isDark ? "text-white/60 hover:text-white hover:bg-white/10" : "text-c2c-navy/60 hover:text-c2c-navy hover:bg-c2c-navy/5"}>
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold py-6 text-base rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl shadow-[0_0_25px_rgba(58,166,168,0.3)] disabled:opacity-60">
              {isSubmitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>) : "Send it to me"}
            </Button>
          </div>
          <p className={microCls}>
            {"Next: you'll book your free 30-min call."}
          </p>
          <p className={privacyCls}>By submitting you agree to receive emails from C2C. Unsubscribe anytime.</p>
        </form>
      )}
    </div>
  )
}

/* ─────────────────────── Page ─────────────────────── */
export default function ConsultPage() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const painView = useSectionInView()
  const credView = useSectionInView()
  const callView = useSectionInView()
  const benefitsView = useSectionInView()
  const stepsView = useSectionInView()
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
    <>
      <main id="top" className="relative min-h-screen bg-c2c-offwhite pb-16 lg:pb-0">
        {/* ─── A) Sticky Top Bar ─── */}
        <header className="sticky top-0 z-50 bg-c2c-navy/95 backdrop-blur-md border-b border-white/5">
          <div className="max-w-6xl mx-auto px-5 md:px-6 flex items-center justify-between h-14 md:h-16">
            <Link href="/" className="flex items-center">
              <span className="hidden lg:flex items-center justify-center bg-white rounded-full p-1.5 shadow-sm mr-2">
                <Image src="/images/c2c-logo.png" alt="C2C" width={36} height={36} sizes="36px" className="h-7 w-7 object-contain" priority />
              </span>
              <Image src="/images/c2c-logo.png" alt="C2C - From Campus 2 Corporate" width={190} height={75} sizes="120px" className="h-12 md:h-14 -my-2 lg:hidden" style={{ width: "auto" }} priority />
              <span className="hidden lg:inline text-white font-semibold text-sm">C2C Coaching</span>
            </Link>
            <div className="flex items-center gap-4">
              <a href="#faq" className="text-white/70 hover:text-white text-sm font-medium transition-colors">FAQ</a>
              <Button onClick={scrollToForm} size="sm" className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold rounded-lg text-sm px-4">
                Get Started
              </Button>
            </div>
          </div>
        </header>

        {/* ─── B) Cinematic Dark Hero ─── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="/images/hero-bg.jpg" alt="" fill sizes="100vw" className="hidden md:block object-cover object-top" priority />
            <Image src="/images/hero-mobile.jpg" alt="" fill sizes="100vw" className="md:hidden object-cover object-[50%_30%]" priority />
            <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-c2c-navy/80 via-c2c-navy/90 to-c2c-navy/98" />
            <div className="md:hidden absolute inset-0 bg-gradient-to-b from-c2c-navy/70 via-c2c-navy/85 to-c2c-navy" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-6 py-10 md:py-24 lg:py-20">
            <div className="grid md:grid-cols-2 gap-8 md:gap-14 lg:gap-20 items-start">
              {/* Left - copy */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="lg:max-w-lg"
              >
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4 md:mb-5 text-balance">
                  Walk away with a 2-week action plan&nbsp;&mdash; and fix what{"'"}s blocking your callbacks.
                </h1>
                <p className="text-base md:text-xl text-white/80 mb-5 md:mb-6 leading-relaxed font-medium">
                  Get my 14-day checklist + a LinkedIn/Resume scorecard + a free 30-minute consult.
                </p>

                <ul className="flex flex-col gap-2.5 md:gap-3 mb-6 md:mb-8">
                  {[
                    { icon: Ghost, text: "Applying nonstop but still getting ignored" },
                    { icon: HelpCircle, text: "Not sure what to fix first (resume vs LinkedIn vs strategy)" },
                    { icon: Lightbulb, text: "You want a plan that tells you what to do this week" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-2.5">
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-c2c-teal mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm md:text-base lg:text-white/90">{item.text}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-white/50 text-xs md:text-sm mb-4">{TRUST_MICROCOPY}</p>

                {/* Logo proof */}
                <div>
                  <p className="hidden lg:block text-white/40 text-xs font-medium tracking-wider uppercase mb-2">Trusted by students landing roles at</p>
                  <div className="flex items-center gap-3 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide lg:overflow-visible lg:pb-0 lg:bg-white/90 lg:backdrop-blur lg:rounded-xl lg:px-5 lg:py-3.5 lg:shadow-sm lg:inline-flex lg:gap-5">
                    {companies.map((c) => (
                      <div key={c.name} className="bg-white/10 lg:bg-transparent rounded-lg p-1.5 lg:p-0 flex items-center justify-center flex-shrink-0 snap-start">
                        <Image
                          src={c.logo}
                          alt={`${c.name} logo`}
                          width={c.w}
                          height={c.h}
                          priority
                          className="opacity-70 lg:opacity-80 object-contain max-h-[24px] lg:max-h-[30px]"
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
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-none lg:max-w-[440px]"
              >
                <LeadForm id="hero-form" variant="dark" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── B2) Pain → After Band (lg+ only) ─── */}
        <section ref={painView.ref} className="hidden lg:block py-16 bg-white relative overflow-hidden">
          <SectionBackground />
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <motion.div variants={fadeUp} initial="hidden" animate={painView.isInView ? "visible" : "hidden"}>
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Pain card */}
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
                        <span className="text-c2c-navy/70 text-sm leading-relaxed pt-1">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After card */}
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
                        <span className="text-c2c-navy/70 text-sm leading-relaxed pt-1">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── B3) Why Shania Credibility Row (lg+ only) ─── */}
        <section ref={credView.ref} className="hidden lg:block py-12 bg-c2c-offwhite">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div variants={fadeUp} initial="hidden" animate={credView.isInView ? "visible" : "hidden"}>
              <p className="text-c2c-navy/40 text-xs font-medium tracking-widest uppercase text-center mb-6">
                {"Shania's"} track record
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
            </motion.div>
          </div>
        </section>

        {/* ─── C) What Happens on the Call ─── */}
        <section ref={callView.ref} className="py-10 md:py-24 lg:py-16 bg-c2c-offwhite relative overflow-hidden">
          <SectionBackground />
          <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-6">
            <motion.div variants={fadeUp} initial="hidden" animate={callView.isInView ? "visible" : "hidden"} className="text-center mb-6 md:mb-10 lg:mb-12">
              <h2 className="text-2xl md:text-4xl font-semibold text-c2c-navy mb-2 md:mb-3">What happens on the call</h2>
              <p className="text-c2c-navy/70 text-sm md:text-lg max-w-xl mx-auto">{"30 minutes. Zero fluff. You'll leave with a plan you can execute today."}</p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" animate={callView.isInView ? "visible" : "hidden"}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
            >
              {callSteps.map((s) => (
                <motion.div key={s.title} variants={staggerItem} className="min-w-[75vw] snap-start md:min-w-0">
                  <Card className="bg-white border-c2c-border rounded-2xl p-5 md:p-6 h-full shadow-md hover:shadow-xl transition-shadow duration-300 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-c2c-teal/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-c2c-teal/20 transition-colors">
                      <s.icon className="w-5 h-5 md:w-6 md:h-6 text-c2c-teal" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-c2c-navy mb-1.5 md:mb-2">{s.title}</h3>
                    <p className="text-c2c-navy/70 text-sm leading-relaxed">{s.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <p className="hidden lg:block text-c2c-navy/50 text-sm text-center mt-8 max-w-2xl mx-auto italic">
              {"Built from the same system we've used with students pushing into competitive internships + new grad roles."}
            </p>
          </div>
        </section>

        {/* ─── D) What You Get ─── */}
        <section ref={benefitsView.ref} className="py-10 md:py-24 lg:py-16 bg-white relative overflow-hidden">
          <SectionBackground />
          <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-6">
            <motion.div variants={fadeUp} initial="hidden" animate={benefitsView.isInView ? "visible" : "hidden"} className="text-center mb-6 md:mb-10 lg:mb-12">
              <h2 className="text-2xl md:text-4xl font-semibold text-c2c-navy mb-2 md:mb-3">What you get</h2>
              <p className="text-c2c-navy/70 text-sm md:text-lg max-w-2xl mx-auto">A clear audit, a 14-day sprint plan, and the exact next steps to start landing interviews.</p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" animate={benefitsView.isInView ? "visible" : "hidden"}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0"
            >
              {benefits.map((b) => (
                <motion.div key={b.title} variants={staggerItem} className="min-w-[75vw] snap-start sm:min-w-0">
                  <Card className="bg-c2c-offwhite border-c2c-border rounded-2xl p-5 md:p-6 h-full shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-c2c-teal/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-c2c-teal/20 transition-colors">
                      <b.icon className="w-5 h-5 md:w-6 md:h-6 text-c2c-teal" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-c2c-navy mb-1.5 md:mb-2">{b.title}</h3>
                    <p className="text-c2c-navy/70 text-sm leading-relaxed">{b.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate={benefitsView.isInView ? "visible" : "hidden"} className="flex flex-col items-center mt-8 md:mt-10">
              <Button onClick={scrollToForm} className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-8 py-6 text-base rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl shadow-[0_0_25px_rgba(58,166,168,0.3)]">
                Get My Free Resources <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="hidden lg:block text-c2c-navy/40 text-xs mt-3">{"No pressure to buy. You'll still leave with clarity and a plan."}</p>
            </motion.div>
          </div>
        </section>

        {/* ─── E) How It Works Stepper ─── */}
        <section ref={stepsView.ref} className="py-10 md:py-24 lg:py-16 bg-c2c-offwhite relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-6">
            <motion.div variants={fadeUp} initial="hidden" animate={stepsView.isInView ? "visible" : "hidden"} className="text-center mb-6 md:mb-10 lg:mb-12">
              <h2 className="text-2xl md:text-4xl font-semibold text-c2c-navy mb-2 md:mb-3">How it works</h2>
              <p className="text-c2c-navy/70 text-sm md:text-lg">Three steps. No guesswork.</p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" animate={stepsView.isInView ? "visible" : "hidden"} className="grid md:grid-cols-3 gap-4 md:gap-6">
              {howItWorks.map((s, i) => (
                <motion.div key={s.num} variants={staggerItem}>
                  <div className="relative bg-white border border-c2c-border rounded-2xl p-5 md:p-6 text-center h-full shadow-sm">
                    {i < howItWorks.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-c2c-teal/30" />
                    )}
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-c2c-teal/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <span className="text-c2c-teal text-base md:text-lg font-bold">{s.num}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-c2c-navy mb-1.5 md:mb-2">{s.title}</h3>
                    <p className="text-c2c-navy/70 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── F) For You / Not for You Split ─── */}
        <section ref={fitView.ref} className="py-10 md:py-20 lg:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-5 md:px-6">
            <motion.div variants={fadeUp} initial="hidden" animate={fitView.isInView ? "visible" : "hidden"}>
              <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                {/* For you */}
                <div className="bg-c2c-teal/5 border border-c2c-teal/15 rounded-2xl p-5 md:p-6">
                  <div className="flex items-center gap-2.5 mb-3 md:mb-4">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-c2c-teal/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-c2c-teal" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-c2c-navy">This is for you if...</h3>
                  </div>
                  <ul className="flex flex-col gap-2 md:gap-2.5">
                    {[
                      "You're a student or recent grad looking for internships, co-ops, or entry-level roles",
                      "You want a structured plan instead of guessing what to do next",
                      "You're ready to put in the work -- you just need the right direction",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-c2c-teal mt-0.5 flex-shrink-0" />
                        <span className="text-c2c-navy/70 text-sm leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Not for you */}
                <div className="bg-c2c-navy/[0.03] border border-c2c-navy/10 rounded-2xl p-5 md:p-6">
                  <div className="flex items-center gap-2.5 mb-3 md:mb-4">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-c2c-navy/10 flex items-center justify-center flex-shrink-0">
                      <XCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-c2c-navy/50" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-c2c-navy">This might not be for you if...</h3>
                  </div>
                  <ul className="flex flex-col gap-2 md:gap-2.5">
                    {[
                      "You're looking for guaranteed job placement -- we help you become a stronger candidate, but there are no guarantees",
                      "You're not willing to follow through -- this is a partnership, not a shortcut",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-c2c-navy/40 mt-0.5 flex-shrink-0" />
                        <span className="text-c2c-navy/70 text-sm leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── G) Testimonials ─── */}
        <section ref={testimonialsView.ref} className="py-10 md:py-24 lg:py-16 bg-c2c-offwhite relative overflow-hidden">
          <SectionBackground />
          <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-6">
            <motion.div variants={fadeUp} initial="hidden" animate={testimonialsView.isInView ? "visible" : "hidden"} className="text-center mb-6 md:mb-10 lg:mb-12">
              <h2 className="text-2xl md:text-4xl font-semibold text-c2c-navy mb-2 md:mb-3">What our clients say</h2>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" animate={testimonialsView.isInView ? "visible" : "hidden"}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0"
            >
              {testimonials.map((t) => (
                <motion.div key={t.name} variants={staggerItem} className="min-w-[80vw] snap-start sm:min-w-0">
                  <Card className="bg-white border-c2c-border rounded-2xl p-5 h-full shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden bg-c2c-offwhite ring-2 ring-c2c-teal/20 flex-shrink-0">
                        <Image src={t.avatar} alt={t.name} fill sizes="44px" className="object-cover object-top" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-c2c-navy text-sm truncate">{t.name}</p>
                        <p className="text-c2c-navy/60 text-xs truncate">{t.title}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-2 md:mb-3">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-c2c-gold text-c2c-gold" />
                      ))}
                    </div>
                    <h4 className="text-base font-semibold text-c2c-navy mb-1.5 md:mb-2 leading-snug">&ldquo;{t.headline}&rdquo;</h4>
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

            {/* ─── Photo Strip (lg+ only) ─── */}
            <div className="hidden lg:flex items-center justify-center gap-6 mt-12">
              {[
                { src: "/images/consult/consult-1.jpg", caption: "Work-ready" },
                { src: "/images/consult/consult-2.jpg", caption: "Community" },
                { src: "/images/consult/consult-3.jpg", caption: "Behind the scenes" },
              ].map((img) => (
                <div key={img.caption} className="flex flex-col items-center gap-2">
                  <div className="relative w-48 h-32 rounded-xl overflow-hidden shadow-lg ring-1 ring-c2c-border">
                    <Image src={img.src} alt={img.caption} fill sizes="192px" className="object-cover" />
                  </div>
                  <span className="text-c2c-navy/40 text-xs font-medium">{img.caption}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── H) FAQ ─── */}
        <section id="faq" ref={faqView.ref} className="py-10 md:py-24 lg:py-16 bg-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-6">
            <motion.div variants={fadeUp} initial="hidden" animate={faqView.isInView ? "visible" : "hidden"} className="text-center mb-6 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-semibold text-c2c-navy mb-2 md:mb-3">Frequently asked questions</h2>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate={faqView.isInView ? "visible" : "hidden"}>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-c2c-navy/10">
                    <AccordionTrigger className="text-c2c-navy font-semibold text-sm md:text-base text-left py-4 md:py-5 hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-c2c-navy/70 text-sm md:text-base leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-6 md:mt-8 text-center">
                <a href="#top" className="inline-flex items-center gap-1.5 text-c2c-navy/50 hover:text-c2c-teal text-sm font-medium transition-colors">
                  <ArrowUp className="w-3.5 h-3.5" />
                  Back to top
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── I) Final CTA with form (light variant) ─── */}
        <section id="lead" className="py-10 md:py-24 lg:py-16 bg-c2c-offwhite relative overflow-hidden">
          <SectionBackground />
          <div className="relative z-10 max-w-2xl mx-auto px-5 md:px-6">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-semibold text-c2c-navy mb-2 md:mb-3 text-balance">
                Ready to stop guessing and start landing callbacks?
              </h2>
              <p className="text-c2c-navy/70 text-sm md:text-lg">Get your free resources and book a call. No pressure.</p>
            </div>
            <LeadForm id="bottom-form" variant="light" />
          </div>
        </section>

        <Footer />
      </main>

      {/* ─── Sticky Mobile CTA Bar ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-c2c-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 lg:hidden">
        <Button
          onClick={scrollToForm}
          className="w-full bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold py-5 text-sm rounded-lg shadow-[0_0_20px_rgba(58,166,168,0.25)]"
        >
          Get Free Resources <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>
    </>
  )
}
