"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Gift, Sparkles, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function ConversionPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  // Check if popup was already shown/dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem("c2c-popup-dismissed")
    const submitted = localStorage.getItem("c2c-popup-submitted")
    
    if (dismissed || submitted) {
      setHasShown(true)
      return
    }

    // Time-based trigger: Show after 15 seconds
    const timeoutId = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true)
        setHasShown(true)
      }
    }, 15000)

    // Exit intent: Detect mouse leaving viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [hasShown])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    localStorage.setItem("c2c-popup-dismissed", "true")
  }, [])

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
          phone: phone || "Not provided",
          subject: "🎁 Free Career Resources Request - C2C",
          from_name: "C2C Popup Lead",
          message: `New lead wants free resources!\n\nEmail: ${email}\nPhone: ${phone || "Not provided"}`,
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        setIsSuccess(true)
        localStorage.setItem("c2c-popup-submitted", "true")
        
        // Close popup after showing success
        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
      }
    } catch (error) {
      console.error("Popup submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [email, phone])

  if (hasShown && !isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-c2c-navy/20 backdrop-blur-md z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4"
          >
            <Card className="relative bg-white border-c2c-navy/10 shadow-2xl rounded-3xl overflow-hidden">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 text-c2c-navy/50 hover:text-c2c-navy transition-colors z-10"
                aria-label="Close popup"
              >
                <X className="w-7 h-7" />
              </button>

              {/* Content */}
              <div className="p-8 md:p-10">
                {!isSuccess ? (
                  <>
                    {/* Icon & Badge */}
                    <div className="flex items-center justify-center mb-5">
                      <div className="relative">
                        <div className="absolute inset-0 bg-c2c-teal/10 blur-2xl rounded-full" />
                        <div className="relative bg-gradient-to-br from-c2c-teal to-c2c-teal/80 p-4 rounded-2xl shadow-md">
                          <Gift className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Headline */}
                    <h3 className="text-3xl md:text-4xl font-bold text-c2c-navy text-center mb-3 leading-tight">
                      Ready to Land Your Dream Role?
                    </h3>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-c2c-navy/70 text-center mb-6 leading-relaxed">
                      Get our <span className="font-semibold text-c2c-teal">free career success toolkit</span> delivered instantly
                    </p>

                    {/* Benefits List */}
                    <div className="space-y-3 mb-6 bg-c2c-offwhite/50 p-5 rounded-2xl">
                      {[
                        "ATS-optimized resume templates",
                        "Complete interview prep checklist",
                        "LinkedIn profile optimization guide",
                        "Proven networking scripts",
                      ].map((benefit, index) => (
                        <motion.div
                          key={benefit}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="bg-c2c-teal/10 p-1.5 rounded-full flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-c2c-teal" />
                          </div>
                          <span className="text-base text-c2c-navy font-medium">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isSubmitting}
                          className="h-12 text-base border-c2c-navy/15 focus:border-c2c-teal focus:ring-c2c-teal rounded-xl bg-white"
                        />
                      </div>
                      
                      <div>
                        <Input
                          type="tel"
                          placeholder="Phone number (optional)"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={isSubmitting}
                          className="h-12 text-base border-c2c-navy/15 focus:border-c2c-teal focus:ring-c2c-teal rounded-xl bg-white"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 text-lg font-semibold bg-c2c-teal hover:bg-c2c-teal/90 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 group"
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Get My Free Toolkit
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>

                      {/* Trust Elements */}
                      <div className="flex items-center justify-center gap-5 pt-1">
                        <div className="flex items-center gap-1.5 text-sm text-c2c-navy/60">
                          <Sparkles className="w-4 h-4 text-c2c-teal" />
                          <span>Instant access</span>
                        </div>
                        <div className="w-px h-4 bg-c2c-navy/20" />
                        <div className="flex items-center gap-1.5 text-sm text-c2c-navy/60">
                          <CheckCircle2 className="w-4 h-4 text-c2c-teal" />
                          <span>No spam</span>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  // Success State
                  <div className="text-center py-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-c2c-teal/10 rounded-full mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-c2c-teal" />
                    </motion.div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-c2c-navy mb-3">
                      Check Your Email!
                    </h3>
                    
                    <p className="text-lg text-c2c-navy/70 mb-2">
                      Your free career toolkit is on its way
                    </p>
                    
                    <p className="text-sm text-c2c-navy/50">
                      (Check your spam folder just in case)
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
