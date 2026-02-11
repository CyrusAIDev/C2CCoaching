"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BOOKING_URL } from "@/lib/constants"
import {
  CheckCircle2,
  ExternalLink,
  Loader2,
  Upload,
  Linkedin,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Cal.com embed — reads name/email/UTMs from URL                    */
/* ------------------------------------------------------------------ */
function CalEmbed() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || ""
  const email = searchParams.get("email") || ""

  // Build cal.com URL with prefilled fields
  const calUrl = new URL(BOOKING_URL)
  if (name) calUrl.searchParams.set("name", name)
  if (email) calUrl.searchParams.set("email", email)

  // Forward UTMs into the cal embed
  ;["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => {
    const v = searchParams.get(k)
    if (v) calUrl.searchParams.set(k, v)
  })

  return (
    <div className="w-full">
      <iframe
        src={calUrl.toString()}
        className="w-full border-0 rounded-xl"
        style={{ minHeight: "700px" }}
        title="Book your free 30-minute consultation"
        loading="eager"
      />
      {/*
        TODO: Cal.com booking confirmation tracking.
        Cal.com does not send postMessage events by default for completed bookings.
        Options to fire a Meta "Schedule" event:
        1. Cal.com webhook → server endpoint that fires a server-side conversion API call.
        2. Cal.com redirect URL → redirect to a /consult/booked route that fires fbq("track","Schedule").
        3. Cal.com embed API (cal.ns.on("bookingSuccessful",...)) if you load their embed script.
        For now, the "Schedule" event is NOT fired automatically.
      */}
      <div className="text-center mt-4">
        <a
          href={calUrl.toString()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-c2c-teal hover:text-c2c-teal/80 text-sm font-medium transition-colors"
        >
          Open calendar in a new tab
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Optional mini form: LinkedIn + Resume link                        */
/* ------------------------------------------------------------------ */
function ScorecardForm() {
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [resumeLink, setResumeLink] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const name = searchParams.get("name") || ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!linkedinUrl && !resumeLink) return
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "42733697-286f-4113-b18a-d7e6f3cba777",
          subject: "Scorecard Materials from C2C Consult Thank-You Page",
          from_name: "C2C Scorecard Submission",
          name,
          email,
          linkedin_url: linkedinUrl || "Not provided",
          resume_link: resumeLink || "Not provided",
        }),
      })

      const result = await response.json()
      if (result.success) {
        setIsSuccess(true)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-c2c-teal/5 border border-c2c-teal/20 rounded-xl p-6 text-center">
        <CheckCircle2 className="w-8 h-8 text-c2c-teal mx-auto mb-3" />
        <p className="text-c2c-navy font-semibold text-lg">Received!</p>
        <p className="text-c2c-navy/70 text-sm mt-1">
          We{"'"}ll include these in your scorecard review.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="linkedinUrl" className="flex items-center gap-2 text-sm font-medium text-c2c-navy mb-1.5">
          <Linkedin className="w-4 h-4 text-c2c-navy/50" />
          LinkedIn Profile URL
        </label>
        <Input
          id="linkedinUrl"
          type="url"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          placeholder="https://linkedin.com/in/yourprofile"
          className="w-full"
        />
      </div>
      <div>
        <label htmlFor="resumeLink" className="flex items-center gap-2 text-sm font-medium text-c2c-navy mb-1.5">
          <Upload className="w-4 h-4 text-c2c-navy/50" />
          Resume link (Google Drive, Dropbox, etc.)
        </label>
        <Input
          id="resumeLink"
          type="url"
          value={resumeLink}
          onChange={(e) => setResumeLink(e.target.value)}
          placeholder="https://drive.google.com/file/d/..."
          className="w-full"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || (!linkedinUrl && !resumeLink)}
        className="w-full bg-c2c-navy hover:bg-c2c-navy-light text-white font-semibold py-4 text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          "Submit for faster scorecard"
        )}
      </Button>
    </form>
  )
}

/* ================================================================== */
/*  Page                                                              */
/* ================================================================== */
function ThankYouContent() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || ""

  return (
    <>
      {/* Header */}
      <header className="bg-c2c-offwhite border-b border-c2c-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center h-14 md:h-16">
          <a href="/consult" className="flex items-center flex-shrink-0">
            <Image
              src="/images/c2c-logo.png"
              alt="C2C - From Campus 2 Corporate"
              width={180}
              height={72}
              sizes="180px"
              className="h-[4rem] md:h-[4.5rem] -my-2"
              style={{ width: "auto" }}
              priority
            />
          </a>
        </div>
      </header>

      <main className="min-h-screen bg-c2c-offwhite">
        {/* Confirmation + Calendar */}
        <section className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-6">
            {/* Confirmation message */}
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-full bg-c2c-teal/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-c2c-teal" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-c2c-navy mb-3">
                {name ? `You're in, ${name}` : "You're in"} — check your email.
              </h1>
              <p className="text-lg text-c2c-navy/70 max-w-lg mx-auto">
                Your toolkit is on the way. <strong className="text-c2c-navy">Step 2:</strong> Book your free 30-minute consult now.
              </p>
            </div>

            {/* Cal.com embed */}
            <div className="bg-white rounded-2xl border border-c2c-border shadow-lg p-4 md:p-6">
              <CalEmbed />
            </div>
          </div>
        </section>

        {/* Optional scorecard materials */}
        <section className="py-12 md:py-16 bg-white border-t border-c2c-border">
          <div className="max-w-lg mx-auto px-6">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-c2c-navy mb-2">
                Want your scorecard faster?
              </h2>
              <p className="text-c2c-navy/60 text-sm">
                Share your LinkedIn and resume link now so we can start before the call. Completely optional.
              </p>
            </div>
            <ScorecardForm />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-c2c-navy-dark">
          <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} From Campus 2 Corporate. All rights reserved.
            </p>
            <a
              href="/policies"
              className="text-c2c-teal hover:text-c2c-teal/80 text-sm font-medium transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </footer>
      </main>
    </>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-c2c-offwhite flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-c2c-teal animate-spin" />
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
