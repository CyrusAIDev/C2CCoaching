"use client"

import React, { useState, useCallback, memo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Linkedin, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { EMAIL } from "@/lib/constants"

function FooterComponent() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "42733697-286f-4113-b18a-d7e6f3cba777",
          email: email,
          subject: "New Newsletter Subscription from C2C Website",
          from_name: "C2C Newsletter Signup",
          message: `New newsletter subscription from: ${email}`,
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        setIsSuccess(true)
        setEmail("")
        setTimeout(() => setIsSuccess(false), 4000)
      }
    } catch (error) {
      console.error("Newsletter signup error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [email])

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [])

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <footer id="footer" className="relative py-20 bg-gradient-to-b from-c2c-navy-light via-c2c-navy to-c2c-navy-dark noise-overlay">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          {/* Logo & Tagline */}
          <div className="md:col-span-1">
            <button
              onClick={handleLogoClick}
              className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              aria-label="Scroll to top"
            >
              <Image
                src="/images/c2c-logo.png"
                alt="C2C - From Campus 2 Corporate"
                width={190}
                height={75}
                sizes="190px"
                className="h-[4.5rem]"
                style={{ width: "auto" }}
              />
            </button>
            <p className="text-c2c-text-navy/80 text-lg font-medium">
              From Campus to Corporate
            </p>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-c2c-text-navy font-semibold text-xl mb-3">
              Newsletter
            </h3>
            <p className="text-c2c-text-navy/80 text-lg mb-4">
              Don{"'"}t miss out on tips!
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  disabled={isSubmitting}
                  className="bg-c2c-navy-light/50 border-c2c-text-navy/10 text-c2c-text-navy placeholder:text-c2c-text-navy/30 rounded-lg focus:border-c2c-teal focus:ring-c2c-teal text-base disabled:opacity-50"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-5 text-base rounded-lg transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {isSubmitting ? "..." : "Join"}
                </Button>
              </div>
              {isSuccess && (
                <div className="flex items-center gap-1.5 text-c2c-teal text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed!</span>
                </div>
              )}
            </form>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-c2c-text-navy font-semibold text-xl mb-3">
              Questions?
            </h3>
            <a
              href={`mailto:${EMAIL}`}
              className="text-c2c-teal hover:text-c2c-teal/80 text-sm leading-tight transition-colors inline-block"
              style={{ fontSize: '13.5px' }}
            >
              {EMAIL}
            </a>
          </div>

          {/* Social */}
          <div className="md:col-span-1">
            <h3 className="text-c2c-text-navy font-semibold text-xl mb-3">
              Follow C2C
            </h3>
            <p className="text-c2c-text-navy/80 text-base mb-4 leading-relaxed">
              Free content & tips
            </p>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.instagram.com/c2ccareers/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-c2c-text-navy/10 border border-c2c-text-navy/20 flex items-center justify-center text-c2c-text-navy/70 hover:bg-c2c-teal hover:border-c2c-teal hover:text-white transition-all duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/fromcampus2corporate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-c2c-text-navy/10 border border-c2c-text-navy/20 flex items-center justify-center text-c2c-text-navy/70 hover:bg-c2c-teal hover:border-c2c-teal hover:text-white transition-all duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
            <a
              href="/policies"
              className="text-c2c-teal hover:text-c2c-teal/80 text-lg font-medium transition-colors inline-block"
            >
              Policies
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-c2c-text-navy/10 text-center">
          <p className="text-c2c-text-navy/70 text-lg">
            © {new Date().getFullYear()} From Campus 2 Corporate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export const Footer = memo(FooterComponent)
