"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

/**
 * MailerLite popup integration.
 *
 * – Loads the MailerLite Universal JS once.
 * – On **desktop** (>768 px) it also fires the popup when:
 *     1. The visitor's mouse leaves the viewport (exit-intent), OR
 *     2. After 15 seconds of being on the page.
 *   Both triggers fire only once per session (tracked via sessionStorage).
 * – On **mobile** the popup is governed entirely by MailerLite's own
 *   settings (configure triggers inside the MailerLite dashboard).
 */

// Extend Window for MailerLite global
declare global {
  interface Window {
    ml?: (...args: unknown[]) => void
  }
}

const ML_ACCOUNT_ID = "1640091"
const DESKTOP_DELAY_MS = 15_000
const SESSION_KEY = "c2c-ml-popup-shown"

export function ConversionPopup() {
  const hasFired = useRef(false)

  /* ------------------------------------------------------------------ */
  /*  Desktop-only exit-intent & timed trigger                          */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    // Only run on desktop-width screens
    if (typeof window === "undefined" || window.innerWidth < 768) return

    // Don't re-trigger if already shown this session
    if (sessionStorage.getItem(SESSION_KEY)) return

    const fire = () => {
      if (hasFired.current) return
      hasFired.current = true
      sessionStorage.setItem(SESSION_KEY, "1")

      // Tell MailerLite to open the popup (showForm targets the
      // currently-active form on the account; configure which form
      // inside the MailerLite dashboard).
      window.ml?.("show")
    }

    // Trigger 1 – exit intent (mouse leaves top of viewport)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire()
    }
    document.addEventListener("mouseleave", handleMouseLeave)

    // Trigger 2 – timed delay
    const timerId = setTimeout(fire, DESKTOP_DELAY_MS)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearTimeout(timerId)
    }
  }, [])

  return (
    <Script
      id="mailerlite-universal"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,e,u,f,l,n){
            w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);};
            l=d.createElement(e);l.async=1;l.src=u;
            n=d.getElementsByTagName(e)[0];n.parentNode.insertBefore(l,n);
          })(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
          ml('account', '${ML_ACCOUNT_ID}');
        `,
      }}
    />
  )
}
