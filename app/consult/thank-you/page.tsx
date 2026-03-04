"use client"

import { Suspense, useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
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
import { CTAButton } from "@/components/c2c/cta-button"
import { Footer } from "@/components/c2c/footer"
import { BOOKING_URL, TRUST_MICROCOPY } from "@/lib/constants"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { track } from "@vercel/analytics"
import {
  CheckCircle2,
  CalendarCheck,
  ArrowDown,
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
  { icon: FileText, text: "Have your latest resume open (even if it's rough)" },
  { icon: LinkIcon, text: "Pull up your LinkedIn profile so we can review it live" },
  { icon: Target, text: "Know 2-3 roles or companies you're interested in" },
  { icon: MessageSquare, text: "Think of your biggest blocker right now (we'll tackle it first)" },
]

/* ─────────────────────── Inner content ─────────────────────── */
function ThankYouContent() {
  const searchParams = useSearchParams()
  const isMobile = useIsMobile()
  const queryName = (searchParams.get("name") || "").trim()
  const [displayName, setDisplayName] = useState(queryName)

  useEffect(() => {
    if (queryName) {
      setDisplayName(queryName)
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("c2c_consult_name", queryName)
      }
      return
    }

    if (typeof window !== "undefined") {
      const savedName = (window.sessionStorage.getItem("c2c_consult_name") || "").trim()
      if (savedName) setDisplayName(savedName)
    }
  }, [queryName])

  const scrollToBook = useCallback(() => {
    const el = document.getElementById("book")
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: offset, behavior: "smooth" })
    }
  }, [])

  const openMobileCalendar = useCallback(() => {
    if (!isMobile) return

    track("thankyou_mobile_calendar_cta_click")
    const newTab = window.open(BOOKING_URL, "_blank", "noopener,noreferrer")

    if (newTab) {
      track("thankyou_mobile_calendar_open_success")
      return
    }

    track("thankyou_mobile_calendar_open_fallback")
    window.location.assign(BOOKING_URL)
  }, [isMobile])

  return (
    <main className="relative min-h-screen bg-c2c-offwhite overflow-x-hidden">
      {/* ─── Top Bar ─── */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-transparent">
        <div className="max-w-6xl mx-auto px-5 md:px-6 flex items-center justify-between h-14 md:h-16">
          <Link href="/" className="flex items-center">
            <span className="hidden lg:flex items-center justify-center bg-white rounded-full w-12 h-12 p-1 shadow-sm mr-2">
              <Image src="/images/c2c-logo.png" alt="C2C" width={56} height={56} sizes="56px" className="h-10 w-10 object-contain" priority />
            </span>
            <span className="lg:hidden inline-flex items-center justify-center bg-white/95 rounded-lg px-2 py-1 shadow-md border border-white/70">
              <Image
                src="/images/c2c-logo.png"
                alt="C2C - From Campus 2 Corporate"
                width={190}
                height={75}
                sizes="120px"
                className="h-9 object-contain"
                style={{ width: "auto" }}
                priority
              />
            </span>
          </Link>
          <Link href="/consult" className="text-white/70 hover:text-white text-sm font-medium transition-colors">
            Back to consult
          </Link>
        </div>
      </header>

      {/* ─── 1) Short Dark Hero Header ─── */}
      <section className="relative overflow-hidden pt-12 pb-7 md:pt-24 md:pb-14 lg:pt-14 lg:pb-4">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.jpg" alt="" fill sizes="100vw" className="hidden md:block object-cover object-top" />
          <Image src="/images/hero-mobile.jpg" alt="" fill sizes="100vw" className="md:hidden object-cover object-[50%_30%]" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-c2c-navy/80 via-c2c-navy/90 to-c2c-navy/98" />
          <div className="md:hidden absolute inset-0 bg-gradient-to-b from-c2c-navy/70 via-c2c-navy/85 to-c2c-navy" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-4 md:mb-5"
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
            className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white mb-1.5 md:mb-4 lg:mb-2 text-balance"
          >
            {displayName
              ? `You're in, ${displayName} now grab a time.`
              : "You're in now grab a time."}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-xl text-white/80 mb-2 md:mb-5 lg:mb-3"
          >
            Book your free 30-minute consult below.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/50 text-xs md:text-sm mb-2 lg:mb-0"
          >
            {TRUST_MICROCOPY}
          </motion.p>

          {isMobile && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="text-white/80 text-sm mb-2"
            >
              Next step: book your call in the full calendar view.
            </motion.p>
          )}

          {/* Mobile: primary conversion CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="lg:hidden"
          >
            {isMobile ? (
              <div className="mt-2">
                <Button
                  onClick={openMobileCalendar}
                  className="w-full bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold py-6 text-base rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl shadow-[0_0_25px_rgba(58,166,168,0.3)] ring-2 ring-c2c-teal/30 ring-offset-2 ring-offset-c2c-navy/80"
                  aria-label="Open your full-screen calendar"
                >
                  Open your full-screen calendar
                </Button>
                <p className="text-white/80 text-xs mt-2">
                  Opens in a new tab so you can see all times clearly
                </p>
                <button
                  type="button"
                  onClick={openMobileCalendar}
                  className="mt-2 text-white/80 hover:text-white underline underline-offset-2 text-sm"
                  aria-label="If nothing opened, tap here"
                >
                  If nothing opened, tap here
                </button>
              </div>
            ) : (
              <Button
                onClick={scrollToBook}
                variant="ghost"
                className="mt-1 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-white shadow-sm hover:text-white hover:bg-white/20 text-sm font-medium"
              >
                Jump to calendar <ArrowDown className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── 2) Calendar + Prep -- overlap technique on mobile ─── */}
      <section id="book" className="relative -mt-8 md:-mt-2 lg:-mt-10 pb-10 md:pb-20 lg:pb-16 bg-c2c-offwhite">
        <SectionBackground />
        <div className="relative z-10 max-w-6xl lg:max-w-[1280px] xl:max-w-[1380px] 2xl:max-w-[1500px] mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Desktop: 2-col grid; Mobile: stacked */}
            <div className="grid lg:grid-cols-1 2xl:grid-cols-[1fr_340px] gap-5 lg:gap-5 items-start">
              {/* Left -- calendar embed */}
              <div>
                {!isMobile && (
                  <>
                    <Card className="bg-white border-c2c-border rounded-2xl overflow-hidden shadow-2xl shadow-c2c-navy/8 lg:p-1">
                      <iframe
                        src={BOOKING_URL}
                        title="Book your 30-minute consult with C2C"
                        className="block w-full border-0 h-[470px] min-h-[390px] md:h-[580px] md:min-h-[480px] lg:h-[620px] lg:min-h-[620px] lg:rounded-[14px]"
                        loading="lazy"
                      />
                    </Card>

                    <div className="mt-4 md:mt-5 text-center">
                      <CTAButton href={BOOKING_URL} size="default">
                        <span className="flex items-center gap-2">
                          <CalendarCheck className="w-4 h-4" />
                          Open calendar in a new tab
                          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                        </span>
                      </CTAButton>
                      {/* TODO: Add booking confirmation tracking (e.g., Cal.com webhook or postMessage listener) */}
                    </div>
                  </>
                )}
              </div>

              {/* Right -- prep checklist (lg sidebar) */}
              <div className="hidden 2xl:block">
                <Card className="bg-white border-c2c-border rounded-2xl p-6 shadow-lg sticky top-20 lg:top-16">
                  <div className="flex items-center gap-2 mb-5">
                    <Sparkles className="w-4 h-4 text-c2c-gold" />
                    <span className="text-c2c-teal text-sm font-semibold uppercase tracking-wider">2 minutes of prep</span>
                  </div>
                  <h3 className="text-lg font-semibold text-c2c-navy mb-4">What to bring to the call</h3>
                  <div className="flex flex-col gap-3">
                    {prepItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-c2c-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <item.icon className="w-4 h-4 text-c2c-teal" />
                        </div>
                        <p className="text-c2c-navy/80 text-sm leading-relaxed pt-1">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 3) What to Prep (mobile/tablet -- collapsible accordion) ─── */}
      <section className="py-7 md:py-14 bg-white relative overflow-hidden lg:hidden">
        <SectionBackground />
        <div className="relative z-10 max-w-2xl mx-auto px-5 md:px-6">
          <Accordion type="single" collapsible defaultValue="prep" className="w-full">
            <AccordionItem value="prep" className="border-c2c-navy/10 border-t-0">
              <AccordionTrigger className="text-c2c-navy font-semibold text-base text-left py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-c2c-gold" />
                  What to bring to the call
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-3 pt-1 pb-2">
                  {prepItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-c2c-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon className="w-4 h-4 text-c2c-teal" />
                      </div>
                      <p className="text-c2c-navy/80 text-sm leading-relaxed pt-1">{item.text}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

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
