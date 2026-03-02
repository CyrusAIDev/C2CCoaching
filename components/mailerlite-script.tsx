"use client"

import { useEffect } from "react"

export function MailerLiteScript() {
  useEffect(() => {
    // Avoid double-injection
    if (document.getElementById("mailerlite-universal-js")) return

    const w = window as Record<string, unknown>
    type MlFn = { (...args: unknown[]): void; q?: unknown[][] }
    w["ml"] =
      w["ml"] ||
      function (...args: unknown[]) {
        ;((w["ml"] as MlFn).q = (w["ml"] as MlFn).q || []).push(args)
      }

    const script = document.createElement("script")
    script.id = "mailerlite-universal-js"
    script.async = true
    script.src = "https://assets.mailerlite.com/js/universal.js"
    document.head.appendChild(script)
    ;(w["ml"] as MlFn)("account", "1640091")
  }, [])

  return null
}
