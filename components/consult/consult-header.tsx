"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function ConsultHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToForm = () => {
    const el = document.getElementById("lead-form")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-c2c-offwhite/95 backdrop-blur-md shadow-sm"
          : "bg-c2c-offwhite"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
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

        <div className="flex items-center gap-4">
          {/* FAQ anchor link */}
          <a
            href="#faq"
            className="text-sm font-medium text-c2c-navy hover:text-c2c-teal transition-colors hidden md:inline-block"
          >
            FAQ
          </a>

          {/* Mobile sticky CTA */}
          <Button
            onClick={scrollToForm}
            size="sm"
            className="md:hidden bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-3.5 py-2 text-xs rounded-lg shadow-[0_0_15px_rgba(58,166,168,0.3)] h-8"
          >
            Get the Free Toolkit
          </Button>
        </div>
      </div>
    </header>
  )
}
