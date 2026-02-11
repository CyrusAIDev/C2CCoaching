"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Loader2, ArrowRight, ArrowLeft } from "lucide-react"
import { trackMetaEvent } from "@/components/consult/meta-pixel"

const ROLE_OPTIONS = [
  "Finance / Accounting",
  "Consulting",
  "Marketing / Brand",
  "Operations / Supply Chain",
  "Project / Product Management",
  "Human Resources",
  "Sales / Business Development",
  "Data / Analytics",
  "Other",
]

const VISA_OPTIONS = [
  "Canadian Citizen / PR",
  "Work Permit",
  "Study Permit",
  "Other / Unsure",
]

interface LeadFormProps {
  /** Unique ID for scroll targeting */
  id?: string
}

export function LeadForm({ id = "lead-form" }: LeadFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Step 1 fields
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")

  // Step 2 fields
  const [phone, setPhone] = useState("")
  const [roleTarget, setRoleTarget] = useState("")
  const [gradMonth, setGradMonth] = useState("")
  const [gradYear, setGradYear] = useState("")
  const [visaStatus, setVisaStatus] = useState("")

  // UTM capture
  const [utms, setUtms] = useState<Record<string, string>>({})

  useEffect(() => {
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"]
    const captured: Record<string, string> = {}
    keys.forEach((k) => {
      const v = searchParams.get(k)
      if (v) captured[k] = v
    })
    // Also persist in sessionStorage for thank-you page
    if (Object.keys(captured).length > 0) {
      sessionStorage.setItem("c2c_utms", JSON.stringify(captured))
      setUtms(captured)
    } else {
      // Try loading from session
      try {
        const stored = sessionStorage.getItem("c2c_utms")
        if (stored) setUtms(JSON.parse(stored))
      } catch { /* ignore */ }
    }
  }, [searchParams])

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

  const goToStep2 = useCallback(() => {
    setError("")
    if (!firstName.trim()) { setError("Please enter your first name."); return }
    if (!validateEmail(email)) { setError("Please enter a valid email."); return }
    setStep(2)
  }, [firstName, email])

  const handleSubmit = useCallback(async () => {
    setError("")
    setIsSubmitting(true)

    const graduation = gradMonth && gradYear ? `${gradMonth}/${gradYear}` : ""

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "42733697-286f-4113-b18a-d7e6f3cba777",
          subject: "New Lead from C2C Consult Landing Page",
          from_name: "C2C Consult Funnel",
          name: firstName,
          email,
          phone: phone || "Not provided",
          role_target: roleTarget || "Not specified",
          graduation: graduation || "Not specified",
          visa_status: visaStatus || "Not specified",
          ...utms,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Fire Meta Pixel Lead event
        trackMetaEvent("Lead", { content_name: "consult_toolkit" })

        // Build thank-you URL with params
        const params = new URLSearchParams({
          name: firstName,
          email,
          ...utms,
        })
        router.push(`/consult/thank-you?${params.toString()}`)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }, [firstName, email, phone, roleTarget, gradMonth, gradYear, visaStatus, utms, router])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && step === 1) {
      e.preventDefault()
      goToStep2()
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 6 }, (_, i) => String(currentYear + i))

  return (
    <div id={id} className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-c2c-border">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-1.5 rounded-full bg-c2c-teal" />
          <div className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${step === 2 ? "bg-c2c-teal" : "bg-c2c-navy/10"}`} />
          <span className="text-xs font-medium text-c2c-navy/60 ml-1">
            Step {step} of 2
          </span>
        </div>

        {step === 1 && (
          <div className="space-y-4" onKeyDown={handleKeyDown}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-c2c-navy mb-1.5">
                First name
              </label>
              <Input
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Priya"
                className="w-full"
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-c2c-navy mb-1.5">
                Email
              </label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="priya@university.ca"
                className="w-full"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <Button
              type="button"
              onClick={goToStep2}
              className="w-full bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold py-5 text-base rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg shadow-[0_0_15px_rgba(58,166,168,0.3)]"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 text-sm text-c2c-navy/60 hover:text-c2c-navy transition-colors mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-c2c-navy mb-1.5">
                Phone <span className="text-c2c-navy/40 font-normal">(optional)</span>
              </label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (416) 555-0123"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="roleTarget" className="block text-sm font-medium text-c2c-navy mb-1.5">
                What roles are you targeting?
              </label>
              <select
                id="roleTarget"
                value={roleTarget}
                onChange={(e) => setRoleTarget(e.target.value)}
                className="w-full rounded-lg border border-c2c-border bg-white px-3 py-2.5 text-sm text-c2c-navy focus:border-c2c-teal focus:ring-1 focus:ring-c2c-teal outline-none"
              >
                <option value="">Select a category</option>
                {ROLE_OPTIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-c2c-navy mb-1.5">
                Expected graduation
              </label>
              <div className="flex gap-2">
                <select
                  value={gradMonth}
                  onChange={(e) => setGradMonth(e.target.value)}
                  className="flex-1 rounded-lg border border-c2c-border bg-white px-3 py-2.5 text-sm text-c2c-navy focus:border-c2c-teal focus:ring-1 focus:ring-c2c-teal outline-none"
                >
                  <option value="">Month</option>
                  {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <select
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  className="flex-1 rounded-lg border border-c2c-border bg-white px-3 py-2.5 text-sm text-c2c-navy focus:border-c2c-teal focus:ring-1 focus:ring-c2c-teal outline-none"
                >
                  <option value="">Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="visaStatus" className="block text-sm font-medium text-c2c-navy mb-1.5">
                Work authorization
              </label>
              <select
                id="visaStatus"
                value={visaStatus}
                onChange={(e) => setVisaStatus(e.target.value)}
                className="w-full rounded-lg border border-c2c-border bg-white px-3 py-2.5 text-sm text-c2c-navy focus:border-c2c-teal focus:ring-1 focus:ring-c2c-teal outline-none"
              >
                <option value="">Select status</option>
                {VISA_OPTIONS.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold py-5 text-base rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg shadow-[0_0_15px_rgba(58,166,168,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send it to me"
              )}
            </Button>
          </div>
        )}

        {/* Microcopy */}
        <p className="text-xs text-c2c-navy/50 text-center mt-4 leading-relaxed">
          Takes 30 seconds. No spam.
        </p>
        <p className="text-[11px] text-c2c-navy/40 text-center mt-2 leading-relaxed">
          By submitting, you agree to receive emails + optional texts from C2C Careers. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}
