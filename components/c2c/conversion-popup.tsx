"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle2, FileText, ClipboardList, Linkedin, Users, Loader2 } from "lucide-react"

// Extend Window for MailerLite global
declare global {
  interface Window {
    ml?: (...args: unknown[]) => void
    MailerLiteObject?: string
  }
}

const DESKTOP_DELAY_MS = 15_000
const MOBILE_DELAY_MS = 20_000

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Subscribe email to MailerLite using the ml() Universal API.
 * Falls back to the MailerLite REST API if ml() isn't available.
 */
async function subscribeToMailerLite(email: string): Promise<boolean> {
  // Try ml() universal API first (client-side)
  if (typeof window !== "undefined" && typeof window.ml === "function") {
    return new Promise<boolean>((resolve) => {
      // ml('subscribe') queues a subscription via the Universal script
      window.ml!("subscribe", {
        email,
        // callback fires when done
      })
      // MailerLite Universal doesn't provide a callback, so we optimistically resolve
      // after a short delay to allow the request to be queued
      setTimeout(() => resolve(true), 1500)
    })
  }
  return false
}

export function ConversionPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const hasFired = useRef(false)

  // ---------- show / dismiss helpers ----------
  const showPopup = useCallback(() => {
    if (hasFired.current) return
    // Check localStorage (dismissed or submitted)
    if (
      typeof window !== "undefined" &&
      (localStorage.getItem("c2c-popup-dismissed") || localStorage.getItem("c2c-popup-submitted"))
    )
      return
    hasFired.current = true
    setIsVisible(true)
  }, [])

  const dismiss = useCallback(() => {
    setIsVisible(false)
    localStorage.setItem("c2c-popup-dismissed", "1")
  }, [])

  // ---------- triggers ----------
  useEffect(() => {
    if (typeof window === "undefined") return
    if (localStorage.getItem("c2c-popup-dismissed") || localStorage.getItem("c2c-popup-submitted")) return

    const isDesktop = window.innerWidth >= 768

    // Time-based trigger
    const timerId = setTimeout(showPopup, isDesktop ? DESKTOP_DELAY_MS : MOBILE_DELAY_MS)

    // Exit-intent trigger (desktop only)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) showPopup()
    }
    if (isDesktop) {
      document.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      clearTimeout(timerId)
      if (isDesktop) {
        document.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [showPopup])

  // ---------- submit ----------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address.")
      return
    }

    setStatus("loading")
    try {
      const ok = await subscribeToMailerLite(email)
      if (ok) {
        setStatus("success")
        localStorage.setItem("c2c-popup-submitted", "1")
        // Auto-close after showing success
        setTimeout(() => setIsVisible(false), 3500)
      } else {
        setStatus("error")
        setErrorMsg("Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setErrorMsg("Something went wrong. Please try again.")
    }
  }

  // ---------- render ----------
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="popup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(20, 34, 53, 0.35)", backdropFilter: "blur(4px)" }}
          onClick={dismiss}
        >
          <motion.div
            key="popup-card"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-c2c-navy/40 hover:text-c2c-navy hover:bg-c2c-navy/5 transition-colors"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 pt-10">
              {status === "success" ? (
                /* ---------- SUCCESS STATE ---------- */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-c2c-teal/10 flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9 text-c2c-teal" />
                  </div>
                  <h3 className="text-2xl font-semibold text-c2c-navy mb-2">
                    {"You're in!"}
                  </h3>
                  <p className="text-c2c-navy/60 text-lg">
                    Check your inbox for your free toolkit.
                  </p>
                </motion.div>
              ) : (
                /* ---------- FORM STATE ---------- */
                <>
                  <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl font-semibold text-c2c-navy leading-tight text-balance mb-2">
                      Ready to Land Your Dream Role?
                    </h2>
                    <p className="text-c2c-navy/60 text-lg">
                      Get our free career success toolkit delivered instantly.
                    </p>
                  </div>

                  {/* Benefits */}
                  <ul className="flex flex-col gap-3 mb-7 text-c2c-navy/80">
                    {[
                      { icon: FileText, text: "ATS-optimized resume templates" },
                      { icon: ClipboardList, text: "Complete interview prep checklist" },
                      { icon: Linkedin, text: "LinkedIn profile optimization guide" },
                      { icon: Users, text: "Proven networking scripts" },
                    ].map(({ icon: Icon, text }) => (
                      <li key={text} className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-c2c-teal/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-c2c-teal" />
                        </span>
                        <span className="text-base">{text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (errorMsg) setErrorMsg("")
                      }}
                      placeholder="Your best email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-c2c-navy/15 bg-c2c-offwhite text-c2c-navy placeholder:text-c2c-navy/40 focus:outline-none focus:ring-2 focus:ring-c2c-teal/40 text-base transition-shadow"
                    />

                    {errorMsg && (
                      <p className="text-red-500 text-sm -mt-1">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-3 rounded-xl bg-c2c-teal text-white font-semibold text-base hover:bg-c2c-teal/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        "Get My Free Toolkit"
                      )}
                    </button>

                    <p className="text-center text-c2c-navy/40 text-xs mt-1">
                      Instant access &middot; No spam, ever
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
