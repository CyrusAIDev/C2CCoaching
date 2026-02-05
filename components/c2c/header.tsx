"use client"

import React, { useState, useEffect, useCallback, memo } from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
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
  { label: "Contact", href: "/contact" },
]

function HeaderComponent() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const pathname = usePathname()
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Determine active section based on scroll position
      const sections = [
        { id: "", element: document.querySelector("section:first-of-type") }, // Hero/Home
        { id: "our-story", element: document.getElementById("our-story") },
        { id: "services", element: document.getElementById("services") },
      ]
      
      const scrollPosition = window.scrollY + 200 // Offset for header height
      
      // Check if at very top
      if (window.scrollY < 100) {
        setActiveSection("")
        return
      }
      
      // Find current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          const elementTop = window.scrollY + rect.top
          
          if (scrollPosition >= elementTop) {
            setActiveSection(section.id)
            return
          }
        }
      }
    }
    
    handleScroll() // Initial check
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // If already on home page, scroll to top instead of refreshing
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [pathname])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Handle smooth scrolling for hash links on same page
    if (href.startsWith("/#")) {
      // If we're on the home page, smooth scroll
      if (pathname === "/") {
        e.preventDefault()
        const id = href.substring(2) // Remove "/#"
        const element = document.getElementById(id)
        if (element) {
          const headerOffset = 80 // Account for fixed header
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - headerOffset
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          })
        }
      }
      // Otherwise, let it navigate normally to home page with hash
    } else if (href === "/" && pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [pathname])

  // Mobile quick nav links (subset for the visible row)
  const mobileQuickLinks = navLinks.slice(0, 4) // Home, About, Services, FAQ

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
        <a 
          href="/" 
          onClick={handleLogoClick}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image
            src="/images/c2c-logo.png"
            alt="C2C - From Campus 2 Corporate"
            width={260}
            height={105}
            sizes="260px"
            className="w-auto h-24 md:h-24 -my-6 max-h-20 md:max-h-24"
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-8">
            {navLinks.slice(0, 3).map((link) => {
              const isActive = 
                (link.href === "/" && activeSection === "" && pathname === "/") ||
                (link.href === "/#our-story" && activeSection === "our-story" && pathname === "/") ||
                (link.href === "/#services" && activeSection === "services" && pathname === "/")
              
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-base font-medium transition-colors duration-200 relative group ${
                    isActive ? "text-c2c-teal" : "text-c2c-navy hover:text-c2c-teal"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-c2c-teal transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </a>
              )
            })}
          </div>
          
          {/* Vertical separator */}
          <div className="h-6 w-px bg-c2c-navy/20 mx-6" />
          
          <div className="flex items-center gap-8">
            {navLinks.slice(3).map((link) => {
              const isActive = 
                (link.href === "/contact" && pathname === "/contact") ||
                (link.href === "/faq" && pathname === "/faq")
              
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-base font-medium transition-colors duration-200 relative group ${
                    isActive ? "text-c2c-teal" : "text-c2c-navy hover:text-c2c-teal"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-c2c-teal transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </a>
              )
            })}
          </div>
        </nav>

        {/* CTA Button with glow highlight */}
        <div className="hidden md:block">
          <Button
            asChild
            className="relative bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-8 py-3 text-base rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg shadow-[0_0_15px_rgba(58,166,168,0.3)] ring-2 ring-c2c-teal/20 ring-offset-2 ring-offset-c2c-offwhite"
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book Now
            </a>
          </Button>
        </div>

        {/* Mobile: Book button + Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-4 py-2 text-sm rounded-lg"
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book
            </a>
          </Button>
          <button
            onClick={toggleMobileMenu}
            className="text-c2c-navy p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Quick Nav Row - Always visible */}
      <div className="md:hidden border-t border-c2c-navy/10 bg-c2c-offwhite/80 backdrop-blur-sm">
        <div className="overflow-x-auto scrollbar-hide">
          <nav className="flex items-center gap-1.5 px-4 py-2 min-w-max">
            {mobileQuickLinks.map((link) => {
              const isActive = 
                (link.href === "/" && activeSection === "" && pathname === "/") ||
                (link.href === "/#our-story" && activeSection === "our-story" && pathname === "/") ||
                (link.href === "/#services" && activeSection === "services" && pathname === "/") ||
                (link.href === "/faq" && pathname === "/faq")
              
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href)
                    closeMobileMenu()
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive 
                      ? "bg-c2c-teal text-white" 
                      : "bg-c2c-navy/5 text-c2c-navy hover:bg-c2c-navy/10"
                  }`}
                >
                  {link.label === "About C2C" ? "About" : link.label}
                </a>
              )
            })}
            {/* Contact as a special pill */}
            <a
              href="/contact"
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                pathname === "/contact"
                  ? "bg-c2c-teal text-white"
                  : "bg-c2c-gold/10 text-c2c-navy border border-c2c-gold/30 hover:bg-c2c-gold/20"
              }`}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>

      {/* Mobile Full Menu (hamburger) */}
      {isMobileMenuOpen && (
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-c2c-offwhite border-t border-c2c-navy/10"
        >
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link, index) => {
              const isActive = 
                (link.href === "/" && activeSection === "" && pathname === "/") ||
                (link.href === "/#our-story" && activeSection === "our-story" && pathname === "/") ||
                (link.href === "/#services" && activeSection === "services" && pathname === "/") ||
                (link.href === "/contact" && pathname === "/contact") ||
                (link.href === "/faq" && pathname === "/faq")
              
              // Add separator after "Services" (index 2)
              const showSeparator = index === 2
              
              return (
                <React.Fragment key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      handleNavClick(e, link.href)
                      closeMobileMenu()
                    }}
                    className={`text-base font-medium transition-colors duration-200 ${
                      isActive ? "text-c2c-teal" : "text-c2c-navy hover:text-c2c-teal"
                    }`}
                  >
                    {link.label}
                  </a>
                  {showSeparator && (
                    <div className="h-px w-full bg-c2c-navy/20 my-2" />
                  )}
                </React.Fragment>
              )
            })}
            <Button
              asChild
              className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-8 py-3 text-base rounded-lg w-full mt-2"
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}

export const Header = memo(HeaderComponent)
