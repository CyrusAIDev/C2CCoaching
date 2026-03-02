"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ChevronDown, CheckCircle2, Loader2, AlertCircle, LinkIcon, FileText } from "lucide-react"
import { ROLE_OPTIONS, VISA_OPTIONS } from "./consult-data"

interface LeadFormProps {
  id?: string
  variant?: "dark" | "light"
}

export function LeadForm({ id, variant = "dark" }: LeadFormProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [openMenu, setOpenMenu] = useState<null | "roleTarget" | "visa">(null)
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    phone: "",
    roleTarget: "",
    visa: "",
    linkedinUrl: "",
    resumeLink: "",
  })

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      setError("")
    },
    []
  )

  const setField = useCallback((name: "roleTarget" | "visa", value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    setOpenMenu(null)
    setError("")
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

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
      try {
        const params = new URLSearchParams({ name: form.firstName, email: form.email })
        if (form.linkedinUrl) params.set("linkedin", form.linkedinUrl)
        if (form.resumeLink) params.set("resume", form.resumeLink)
        router.push(`/consult/thank-you?${params.toString()}`)
      } catch {
        setError("Something went wrong. Please try again.")
        setIsSubmitting(false)
      }
    },
    [form.firstName, form.email, form.linkedinUrl, form.resumeLink, router]
  )

  const handleSkipToSubmit = useCallback(() => {
    const params = new URLSearchParams({ name: form.firstName, email: form.email })
    if (form.linkedinUrl) params.set("linkedin", form.linkedinUrl)
    if (form.resumeLink) params.set("resume", form.resumeLink)
    router.push(`/consult/thank-you?${params.toString()}`)
  }, [form.firstName, form.email, form.linkedinUrl, form.resumeLink, router])

  const isDark = variant === "dark"

  const cardCls = isDark
    ? "bg-white/[0.07] backdrop-blur-md border border-white/[0.12] rounded-2xl p-5 lg:p-8 shadow-2xl lg:border-white/[0.18] lg:shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
    : "bg-white border border-c2c-border rounded-2xl p-5 lg:p-8 shadow-xl"

  const inputCls = isDark
    ? "bg-white/10 lg:bg-white/[0.14] border-white/20 text-white placeholder:text-white/40 lg:placeholder:text-white/50 rounded-lg focus:border-c2c-teal focus:ring-c2c-teal text-base h-12"
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
  const inlineTriggerCls = isDark
    ? "flex h-12 w-full items-center justify-between rounded-lg border bg-white/10 border-white/20 px-3 text-base text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c2c-teal"
    : "flex h-12 w-full items-center justify-between rounded-lg border bg-c2c-offwhite border-c2c-border px-3 text-base text-c2c-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c2c-teal"
  const inlineMenuCls = isDark
    ? "absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-white/15 bg-c2c-navy shadow-xl"
    : "absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-c2c-border bg-white shadow-xl"
  const inlineOptionCls = isDark
    ? "w-full text-left px-3 py-2.5 text-sm text-white/90 hover:bg-white/10"
    : "w-full text-left px-3 py-2.5 text-sm text-c2c-navy hover:bg-c2c-offwhite"

  return (
    <div id={id} className={cardCls}>
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
            Get my plan <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className={microCls}>Takes 30 seconds. No spam.</p>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 lg:gap-4">
          <p className={`text-sm mb-1 ${isDark ? "text-white/70" : "text-c2c-navy/70"}`}>
            Help us personalize (optional)
          </p>
          <div>
            <label htmlFor={`${id}-linkedin`} className={`${labelCls} flex items-center gap-1.5`}>
              <LinkIcon className="w-4 h-4 text-c2c-teal" />
              LinkedIn profile URL <span className={isDark ? "text-white/40 font-normal" : "text-c2c-navy/40 font-normal"}>(optional)</span>
            </label>
            <Input id={`${id}-linkedin`} name="linkedinUrl" type="url" placeholder="https://linkedin.com/in/your-profile" value={form.linkedinUrl} onChange={handleChange} className={inputCls} />
          </div>
          <div>
            <label htmlFor={`${id}-resume`} className={`${labelCls} flex items-center gap-1.5`}>
              <FileText className="w-4 h-4 text-c2c-teal" />
              Resume link <span className={isDark ? "text-white/40 font-normal" : "text-c2c-navy/40 font-normal"}>(optional)</span>
            </label>
            <Input id={`${id}-resume`} name="resumeLink" type="url" placeholder="https://drive.google.com/... or Dropbox link" value={form.resumeLink} onChange={handleChange} className={inputCls} />
          </div>
          <div>
            <label htmlFor={`${id}-phone`} className={labelCls}>
              Phone <span className={isDark ? "text-white/40 font-normal" : "text-c2c-navy/40 font-normal"}>(optional)</span>
            </label>
            <Input id={`${id}-phone`} name="phone" type="tel" placeholder="+1 (___) ___-____" value={form.phone} onChange={handleChange} className={inputCls} />
          </div>
          <div>
            <label htmlFor={`${id}-roleTarget`} className={labelCls}>What are you targeting?</label>
            {isMobile ? (
              <div className="relative">
                <button
                  type="button"
                  className={inlineTriggerCls}
                  onClick={() => setOpenMenu((prev) => (prev === "roleTarget" ? null : "roleTarget"))}
                  aria-haspopup="listbox"
                  aria-expanded={openMenu === "roleTarget"}
                >
                  <span>{form.roleTarget || "Select role type"}</span>
                  <ChevronDown className={`w-4 h-4 ${isDark ? "text-white/40" : "text-c2c-navy/40"}`} />
                </button>
                {openMenu === "roleTarget" && (
                  <div className={inlineMenuCls} role="listbox">
                    {ROLE_OPTIONS.map((r) => (
                      <button key={r} type="button" className={inlineOptionCls} onClick={() => setField("roleTarget", r)}>
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <select id={`${id}-roleTarget`} name="roleTarget" value={form.roleTarget} onChange={handleChange} className={selectCls}>
                  <option value="" className={optionCls}>Select role type</option>
                  {ROLE_OPTIONS.map((r) => (<option key={r} value={r} className={optionCls}>{r}</option>))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-white/40" : "text-c2c-navy/40"}`} />
              </div>
            )}
          </div>
          <div>
            <label htmlFor={`${id}-visa`} className={labelCls}>Visa / work status</label>
            {isMobile ? (
              <div className="relative">
                <button
                  type="button"
                  className={inlineTriggerCls}
                  onClick={() => setOpenMenu((prev) => (prev === "visa" ? null : "visa"))}
                  aria-haspopup="listbox"
                  aria-expanded={openMenu === "visa"}
                >
                  <span>{form.visa || "Select status"}</span>
                  <ChevronDown className={`w-4 h-4 ${isDark ? "text-white/40" : "text-c2c-navy/40"}`} />
                </button>
                {openMenu === "visa" && (
                  <div className={inlineMenuCls} role="listbox">
                    {VISA_OPTIONS.map((v) => (
                      <button key={v} type="button" className={inlineOptionCls} onClick={() => setField("visa", v)}>
                        {v}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <select id={`${id}-visa`} name="visa" value={form.visa} onChange={handleChange} className={selectCls}>
                  <option value="" className={optionCls}>Select status</option>
                  {VISA_OPTIONS.map((v) => (<option key={v} value={v} className={optionCls}>{v}</option>))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-white/40" : "text-c2c-navy/40"}`} />
              </div>
            )}
          </div>
          {error && <p className={errorCls}><AlertCircle className="w-4 h-4" /> {error}</p>}
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex gap-3">
              <Button type="button" variant="ghost" onClick={() => setStep(1)} className={isDark ? "text-white/60 hover:text-white hover:bg-white/10" : "text-c2c-navy/60 hover:text-c2c-navy hover:bg-c2c-navy/5"}>
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1 bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold py-6 text-base rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl shadow-[0_0_25px_rgba(58,166,168,0.3)] disabled:opacity-60">
                {isSubmitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>) : "Continue to calendar"}
              </Button>
            </div>
            <Button type="button" variant="ghost" onClick={handleSkipToSubmit} disabled={isSubmitting} className={`text-sm ${isDark ? "text-white/50 hover:text-white/80" : "text-c2c-navy/50 hover:text-c2c-navy/80"}`}>
              I&apos;ll add later — take me to calendar
            </Button>
          </div>
          <p className={microCls}>
            Next: you&apos;ll book your free 30-min call.
          </p>
          <p className={privacyCls}>By submitting you agree to receive emails from C2C. Unsubscribe anytime.</p>
        </form>
      )}
    </div>
  )
}
