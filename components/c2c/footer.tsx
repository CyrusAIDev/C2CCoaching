"use client"

import React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Linkedin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail("")
  }

  return (
    <footer id="footer" className="relative py-20 bg-gradient-to-b from-c2c-navy-light via-c2c-navy to-c2c-navy-dark noise-overlay">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          {/* Logo & Tagline */}
          <div className="md:col-span-1">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-md">
              <Image
                src="/images/c2c-logo.png"
                alt="C2C - From Campus 2 Corporate"
                width={140}
                height={50}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-c2c-text-navy/70 text-sm">
              From Campus to Corporate
            </p>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-c2c-text-navy font-semibold text-base mb-3">
              Newsletter
            </h3>
            <p className="text-c2c-text-navy/70 text-sm mb-4">
              Don{"'"}t miss out on tips!
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-c2c-navy-light/50 border-c2c-text-navy/10 text-c2c-text-navy placeholder:text-c2c-text-navy/30 rounded-lg focus:border-c2c-teal focus:ring-c2c-teal text-sm"
              />
              <Button
                type="submit"
                className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                Join
              </Button>
            </form>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-c2c-text-navy font-semibold text-base mb-3">
              Questions?
            </h3>
            <a
              href="mailto:shania@fromcampus2corporate.ca"
              className="text-c2c-teal hover:text-c2c-teal/80 text-sm transition-colors break-all"
            >
              shania@fromcampus2corporate.ca
            </a>
          </div>

          {/* Social */}
          <div className="md:col-span-1">
            <h3 className="text-c2c-text-navy font-semibold text-base mb-3">
              Follow C2C
            </h3>
            <p className="text-c2c-text-navy/70 text-sm mb-4">
              Free content & tips
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-c2c-text-navy/10 border border-c2c-text-navy/20 flex items-center justify-center text-c2c-text-navy/70 hover:bg-c2c-teal hover:border-c2c-teal hover:text-white transition-all duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-c2c-text-navy/10 border border-c2c-text-navy/20 flex items-center justify-center text-c2c-text-navy/70 hover:bg-c2c-teal hover:border-c2c-teal hover:text-white transition-all duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-c2c-text-navy/10 text-center">
          <p className="text-c2c-text-navy/50 text-sm">
            © {new Date().getFullYear()} From Campus 2 Corporate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
