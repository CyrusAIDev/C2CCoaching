"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { BOOKING_URL } from "@/lib/constants"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About C2C", href: "/#our-story" },
  { label: "Services", href: "/#services" },
  { label: "FAQ", href: "/faq" },
  { label: "Book Now", href: "/#services" },
  { label: "Contact", href: "/#footer" },
]

function HeaderComponent() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <motion.header
      initial={prefersReducedMotion ? {} : { y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-c2c-offwhite/95 backdrop-blur-md shadow-sm py-1"
          : "bg-c2c-offwhite py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/images/c2c-logo.png"
            alt="C2C - From Campus 2 Corporate"
            width={220}
            height={90}
            sizes="220px"
            className="w-auto h-20 -my-4"
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-c2c-navy hover:text-c2c-teal text-sm font-medium transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-c2c-teal transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA Button with glow highlight */}
        <div className="hidden md:block">
          <Button
            asChild
            className="relative bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg shadow-[0_0_15px_rgba(58,166,168,0.3)] ring-2 ring-c2c-teal/20 ring-offset-2 ring-offset-c2c-offwhite"
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Free Consultation
            </a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-c2c-navy p-2"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-c2c-offwhite border-t border-c2c-navy/10 mt-2"
        >
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="text-c2c-navy hover:text-c2c-teal text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-6 py-2 rounded-lg w-full mt-2"
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Free Consultation
              </a>
            </Button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}

export const Header = memo(HeaderComponent)
