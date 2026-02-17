"use client"

import { Suspense, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { SectionBackground } from "@/components/c2c/section-background"
import { CTAButton } from "@/components/c2c/cta-button"
import { Footer } from "@/components/c2c/footer"
import { BOOKING_URL, TRUST_MICROCOPY } from "@/lib/constants"
import {
  CheckCircle2,
  CalendarCheck,
  ArrowRight,
  Loader2,
  LinkIcon,
  FileText,
  MessageSquare,
  Target,
  Sparkles,
  ExternalLink,
} from "lucide-react"

/* ─────────────────────── Prep checklist ─────────────────────── */
const prepItems = [
  {
    icon: FileText,
    text: "Have your latest resume open (even if it's rough)",
  },
  {
    icon: LinkIcon,
    text: "Pull up your LinkedIn profile so we can review it live",
  },
  {
    icon: Target,
    text: "Know 2-3 roles or companies you're interested in",
  },
  {
    icon: MessageSquare,
    text: "Think of your biggest blocker right now (we'll tackle it first)",
  },
]

/* ─────────────────────── Inner content ─────────────────────── */
function ThankYouContent() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || ""
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [resumeLink, setResumeLink] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleOptionalSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!linkedinUrl && !resumeLink) return
      setIsSubmitting(true)

      // TODO: Wire backend submission (Web3Forms, MailerLite, etc.)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSuccess(true)
      setIsSubmitting(false)
    },
    [linkedinUrl, resumeLink]
  )

  return (
    <main className="relative min-h-screen bg-c2c-offwhite">
      {/* ─── Top Bar ─── */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-transparent">
        <div className="max-w-6xl mx-auto px-5 md:px-6 flex items-center justify-between h-14 md:h-16">
          <Link href="/" className="flex items-center">
            {/* White badge behind logo on lg+ */}
            <span className="hidden lg:flex items-center justify-center bg-white rounded-full p-1.5 shadow-sm mr-2">
              <Image
                src="/images/c2c-logo.png"
                alt="C2C"
                width={36}
                height={36}
                sizes="36px"
                className="h-7 w-7 object-contain"
                priority
              />
            </span>
            <Image
              src="/images/c2c-logo.png"
              alt="C2C - From Campus 2 Corporate"
              width={190}
              height={75}
              sizes="120px"
              className="h-12 md:h-14 -my-2 lg:hidden"
              style={{ width: "auto" }}
              priority
            />
            <span className="hidden lg:inline text-white font-semibold text-sm">C2C Coaching</span>
          </Link>
          <Link
            href="/consult"
            className="text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            Back to consult
          </Link>
        </div>
      </header>

      {/* ─── 1) Short Dark Hero Header ─── */}
      <section className="relative overflow-hidden pt-20 pb-12 md:pt-24 md:pb-14 lg:pt-20 lg:pb-10">
        {/* Background image (same as homepage hero) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="hidden md:block object-cover object-top"
            priority
          />
          <Image
            src="/images/hero-mobile.jpg"
            alt=""
            fill
            sizes="100vw"
            className="md:hidden object-cover object-[50%_30%]"
            priority
          />
          {/* Navy scrim */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-c2c-navy/80 via-c2c-navy/90 to-c2c-navy/98" />
          <div className="md:hidden absolute inset-0 bg-gradient-to-b from-c2c-navy/70 via-c2c-navy/85 to-c2c-navy" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-6 text-center">
          {/* Step indicator */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-5"
          >
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-c2c-teal/20 border border-c2c-teal/30 text-c2c-teal text-xs font-semibold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Step 2 of 2
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 text-balance"
          >
            {name
              ? `You're in, ${name} \u2014 now grab a time.`
              : "You're in \u2014 now grab a time."}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/80 mb-5"
          >
            Book your free 30-minute consult below.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/50 text-sm"
          >
            {TRUST_MICROCOPY}
          </motion.p>
        </div>
      </section>

      {/* ─── 2) Calendar + Prep -- 2-col on lg ─── */}
      <section className="relative -mt-2 pb-16 md:pb-20 lg:pb-16 bg-c2c-offwhite">
        <SectionBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Desktop: 2-col grid; Mobile: stacked */}
            <div className="grid lg:grid-cols-[1fr_340px] gap-6 lg:gap-8 items-start">
              {/* Left -- calendar embed */}
              <div>
                <Card className="bg-white border-c2c-border rounded-2xl overflow-hidden shadow-2xl shadow-c2c-navy/8">
                  {/* Cal.com embed */}
                  <iframe
                    src={BOOKING_URL}
                    title="Book your 30-minute consult with C2C"
                    className="w-full border-0"
                    style={{ height: "660px", minHeight: "560px" }}
                    loading="eager"
                  />
                </Card>

                {/* Fallback link */}
                <div className="mt-5 text-center">
                  <CTAButton href={BOOKING_URL} size="default">
                    <span className="flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4" />
                      Open calendar in a new tab
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </span>
                  </CTAButton>
                  {/* TODO: Add booking confirmation tracking (e.g., Cal.com webhook or postMessage listener) */}
                </div>
              </div>

              {/* Right -- prep checklist (visible alongside calendar on lg) */}
              <div className="hidden lg:block">
                <Card className="bg-white border-c2c-border rounded-2xl p-6 shadow-lg sticky top-20">
                  <div className="flex items-center gap-2 mb-5">
                    <Sparkles className="w-4 h-4 text-c2c-gold" />
                    <span className="text-c2c-teal text-sm font-semibold uppercase tracking-wider">
                      2 minutes of prep
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-c2c-navy mb-4">
                    What to bring to the call
                  </h3>
                  <div className="flex flex-col gap-3">
                    {prepItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-c2c-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <item.icon className="w-4 h-4 text-c2c-teal" />
                        </div>
                        <p className="text-c2c-navy/80 text-sm leading-relaxed pt-1">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 3) What to Prep (mobile / tablet only -- hidden on lg since it's in the sidebar) ─── */}
      <section className="py-14 md:py-18 bg-white relative overflow-hidden lg:hidden">
        <SectionBackground />
        <div className="relative z-10 max-w-2xl mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-c2c-gold" />
              <span className="text-c2c-teal text-sm font-semibold uppercase tracking-wider">
                2 minutes of prep
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-c2c-navy">
              What to bring to the call
            </h2>
          </motion.div>

          <div className="flex flex-col gap-3">
            {prepItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Card className="bg-c2c-offwhite/60 border-c2c-border rounded-xl p-4 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-c2c-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-4.5 h-4.5 text-c2c-teal" />
                  </div>
                  <p className="text-c2c-navy text-sm md:text-base leading-relaxed pt-1.5">
                    {item.text}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4) Optional: LinkedIn + Resume ─── */}
      <section className="py-14 md:py-18 lg:py-14 bg-c2c-offwhite lg:bg-white relative overflow-hidden">
        <SectionBackground />
        <div className="relative z-10 max-w-xl mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="bg-white border-c2c-border rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-c2c-navy mb-2">
                  Help your coach prepare
                </h2>
                <p className="text-c2c-navy/60 text-sm">
                  Optional -- share these so your coach can review before the
                  call.
                </p>
              </div>

              {isSuccess ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-10 h-10 text-c2c-teal mx-auto mb-3" />
                  <p className="text-c2c-navy font-semibold text-lg">
                    Got it -- thanks!
                  </p>
                  <p className="text-c2c-navy/60 text-sm mt-1">
                    Your coach will review before the call.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleOptionalSubmit}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label
                      htmlFor="linkedin"
                      className="flex items-center gap-1.5 text-c2c-navy text-sm font-medium mb-1.5"
                    >
                      <LinkIcon className="w-4 h-4 text-c2c-teal" />
                      LinkedIn profile URL
                    </label>
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/your-profile"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="bg-c2c-offwhite border-c2c-border text-c2c-navy placeholder:text-c2c-navy/30 rounded-lg focus:border-c2c-teal focus:ring-c2c-teal h-12 text-base"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="resume"
                      className="flex items-center gap-1.5 text-c2c-navy text-sm font-medium mb-1.5"
                    >
                      <FileText className="w-4 h-4 text-c2c-teal" />
                      Resume link{" "}
                      <span className="text-c2c-navy/40 font-normal">
                        (Google Drive, Dropbox, etc.)
                      </span>
                    </label>
                    <Input
                      id="resume"
                      type="url"
                      placeholder="https://drive.google.com/file/..."
                      value={resumeLink}
                      onChange={(e) => setResumeLink(e.target.value)}
                      className="bg-c2c-offwhite border-c2c-border text-c2c-navy placeholder:text-c2c-navy/30 rounded-lg focus:border-c2c-teal focus:ring-c2c-teal h-12 text-base"
                    />
                  </div>
                  {/* TODO: Wire actual backend handler for LinkedIn/resume submission */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || (!linkedinUrl && !resumeLink)}
                    className="w-full bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold py-5 text-base rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 mt-1"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Sending...
                      </>
                    ) : (
                      <>
                        Send to my coach{" "}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <Footer />
    </main>
  )
}

/* ─────────────────────── Wrapper with Suspense ─────────────────────── */
export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-c2c-offwhite flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-c2c-teal animate-spin" />
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  )
}
