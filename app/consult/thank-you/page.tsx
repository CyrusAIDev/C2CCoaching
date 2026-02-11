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
import { Footer } from "@/components/c2c/footer"
import { BOOKING_URL } from "@/lib/constants"
import {
  CheckCircle2,
  CalendarCheck,
  Mail,
  ArrowRight,
  Loader2,
  LinkIcon,
  FileText,
} from "lucide-react"

// ─────────────────────── Inner content (needs Suspense for searchParams) ───────────────────────
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
      // For now, simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSuccess(true)
      setIsSubmitting(false)
    },
    [linkedinUrl, resumeLink]
  )

  return (
    <main className="relative min-h-screen bg-c2c-offwhite">
      {/* ─── Top Bar ─── */}
      <header className="bg-c2c-navy/95 backdrop-blur-md border-b border-white/5">
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
          <Link
            href="/consult"
            className="text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            Back to consult
          </Link>
        </div>
      </header>

      {/* ─── Hero: confirmation + booking ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-c2c-navy via-c2c-navy-light to-c2c-navy-dark noise-overlay">
        <SectionBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-6 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-16 rounded-full bg-c2c-teal/20 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-8 h-8 text-c2c-teal" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 text-balance"
          >
            {name
              ? `You're in, ${name} — check your email.`
              : "You're in — check your email."}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <Mail className="w-5 h-5 text-c2c-teal" />
            <p className="text-white/70 text-base">
              Your scorecard + 14-day checklist are on their way.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg md:text-xl text-white/90 font-medium mb-8">
              Step 2: Book your free 30-minute consult now.
            </p>

            {/* Cal.com embed */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-3xl mx-auto">
              <iframe
                src={BOOKING_URL}
                title="Book your 30-minute consult with C2C"
                className="w-full border-0"
                style={{ height: "680px" }}
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Optional: LinkedIn + Resume ─── */}
      <section className="py-16 md:py-20 bg-c2c-offwhite relative overflow-hidden">
        <SectionBackground />
        <div className="relative z-10 max-w-xl mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                  {/* TODO: Wire actual file upload handling here */}
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

          {/* Quick recap */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 text-center"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-c2c-navy/60">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-c2c-teal" />
                Resources sent to your inbox
              </span>
              <span className="hidden sm:block text-c2c-navy/30">|</span>
              <span className="flex items-center gap-1.5">
                <CalendarCheck className="w-4 h-4 text-c2c-teal" />
                Book your call above
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <Footer />
    </main>
  )
}

// ─────────────────────── Wrapper with Suspense ───────────────────────
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
