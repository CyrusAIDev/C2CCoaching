"use client"

import React, { useState, useEffect, useCallback, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { BOOKING_URL } from "@/lib/constants"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About C2C", href: "/#our-story" },
  { label: "Services", href: "/#services" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
]

// Mobile nav includes Reviews (not in desktop nav)
const mobileExploreLinks = [
  { label: "Home", href: "/" },
  { label: "About C2C", href: "/#our-story" },
  { label: "Services", href: "/#services" },
  { label: "Reviews", href: "/#reviews" },
]

const mobileSupportLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
]

function HeaderComponent() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Determine active section based on scroll position
      const sections = [
        { id: "", element: document.querySelector("section:first-of-type") }, // Hero/Home
        { id: "our-story", element: document.getElementById("our-story") },
        { id: "services", element: document.getElementById("services") },
        { id: "reviews", element: document.getElementById("reviews") },
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

  // Lock body scroll when mobile menu is open + prefetch pages
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
      // Prefetch FAQ and Contact pages for faster navigation (mobile only)
      router.prefetch("/faq")
      router.prefetch("/contact")
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen, router])

  // ESC key closes menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu()
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isMobileMenuOpen, closeMobileMenu])

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

  return (
    <motion.header
      initial={prefersReducedMotion ? {} : { y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-c2c-offwhite/95 backdrop-blur-md shadow-sm py-1 md:py-1"
          : "bg-c2c-offwhite py-1 md:py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-14 md:h-auto">
        {/* Logo */}
        <a 
          href="/" 
          onClick={handleLogoClick}
          className="flex items-center cursor-pointer flex-shrink-0"
        >
          {/* Mobile logo - larger, uses negative margin to exceed container without increasing header height */}
          <Image
            src="/images/c2c-logo.png"
            alt="C2C - From Campus 2 Corporate"
            width={180}
            height={72}
            sizes="180px"
            className="md:hidden h-[4.5rem] -my-2.5"
            style={{ width: "auto" }}
            priority
          />
          {/* Desktop logo - unchanged */}
          <Image
            src="/images/c2c-logo.png"
            alt="C2C - From Campus 2 Corporate"
            width={260}
            height={105}
            sizes="260px"
            className="hidden md:block h-24 -my-6 max-h-24"
            style={{ width: "auto" }}
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-8">
            {navLinks.slice(0, 4).map((link) => {
              const isActive = 
                (link.href === "/" && activeSection === "" && pathname === "/") ||
                (link.href === "/#our-story" && activeSection === "our-story" && pathname === "/") ||
                (link.href === "/#services" && activeSection === "services" && pathname === "/") ||
                (link.href === "/#reviews" && activeSection === "reviews" && pathname === "/")
              
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
            {navLinks.slice(4).map((link) => {
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

        {/* Mobile: Book button + Menu Toggle - vertically centered */}
        <div className="md:hidden flex items-center gap-2 flex-shrink-0">
          <motion.div
            initial={prefersReducedMotion ? {} : { scale: 1 }}
            animate={prefersReducedMotion ? {} : { 
              scale: [1, 1.03, 1],
            }}
            transition={{ 
              duration: 2,
              delay: 1,
              times: [0, 0.5, 1],
              repeat: 0
            }}
            className="flex items-center"
          >
            <Button
              asChild
              size="sm"
              className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-3.5 py-2 text-xs rounded-lg shadow-[0_0_15px_rgba(58,166,168,0.3)] ring-1 ring-c2c-teal/30 ring-offset-1 ring-offset-c2c-offwhite h-8"
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Free Consult
              </a>
            </Button>
          </motion.div>
          <button
            onClick={toggleMobileMenu}
            className="text-c2c-navy p-2.5 -mr-1 rounded-lg hover:bg-c2c-navy/5 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Full Menu (hamburger) - Apple-like animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 top-14 bg-black/30 backdrop-blur-[2px] z-40"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            
            {/* Menu panel - slide down from top */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
              transition={prefersReducedMotion ? { duration: 0.15 } : { 
                type: "spring", 
                stiffness: 400, 
                damping: 30,
                mass: 0.8
              }}
              className="md:hidden absolute top-full left-0 right-0 bg-c2c-offwhite border-t border-c2c-navy/10 shadow-xl z-50 max-h-[calc(100vh-3.5rem)] overflow-y-auto"
            >
              <nav className="flex flex-col px-6 py-5">
                {/* Section: Explore */}
                <motion.p 
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className="text-xs font-semibold text-c2c-navy/50 uppercase tracking-wider mb-3"
                >
                  Explore
                </motion.p>
                <div className="flex flex-col gap-1 mb-5">
                  {mobileExploreLinks.map((link, index) => {
                    const isActive = 
                      (link.href === "/" && activeSection === "" && pathname === "/") ||
                      (link.href === "/#our-story" && activeSection === "our-story" && pathname === "/") ||
                      (link.href === "/#services" && activeSection === "services" && pathname === "/") ||
                      (link.href === "/#reviews" && activeSection === "reviews" && pathname === "/")
                    
                    return (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => {
                          handleNavClick(e, link.href)
                          closeMobileMenu()
                        }}
                        initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + index * 0.04 }}
                        className={`py-2.5 px-3 rounded-lg text-base font-medium transition-all duration-200 ${
                          isActive 
                            ? "text-c2c-teal bg-c2c-teal/10" 
                            : "text-c2c-navy hover:bg-c2c-navy/5"
                        }`}
                      >
                        {link.label}
                      </motion.a>
                    )
                  })}
                </div>

                {/* Section: Support */}
                <motion.p 
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.22 }}
                  className="text-xs font-semibold text-c2c-navy/50 uppercase tracking-wider mb-3"
                >
                  Support
                </motion.p>
                <div className="flex flex-col gap-1 mb-6">
                  {mobileSupportLinks.map((link, index) => {
                    const isActive = 
                      (link.href === "/contact" && pathname === "/contact") ||
                      (link.href === "/faq" && pathname === "/faq")
                    
                    return (
                      <motion.div
                        key={link.label}
                        initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.26 + index * 0.04 }}
                      >
                        <Link
                          href={link.href}
                          prefetch
                          onClick={closeMobileMenu}
                          className={`block py-2.5 px-3 rounded-lg text-base font-medium transition-all duration-200 ${
                            isActive 
                              ? "text-c2c-teal bg-c2c-teal/10" 
                              : "text-c2c-navy hover:bg-c2c-navy/5"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {/* CTA */}
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 }}
                >
                  <Button
                    asChild
                    className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold py-4 text-base rounded-lg w-full shadow-[0_0_20px_rgba(58,166,168,0.25)]"
                  >
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                      Book Free Consultation
                    </a>
                  </Button>
                  <p className="text-center text-c2c-navy/60 text-xs mt-2">
                    30 minutes • No commitment
                  </p>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export const Header = memo(HeaderComponent)
