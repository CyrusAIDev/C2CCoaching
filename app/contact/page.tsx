"use client"

import { useState } from "react"
import { Header } from "@/components/c2c/header"
import { Footer } from "@/components/c2c/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, CheckCircle2 } from "lucide-react"
import { EMAIL, BOOKING_URL } from "@/lib/constants"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Using Web3Forms - free form backend service
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "42733697-286f-4113-b18a-d7e6f3cba777",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "New Contact Form Submission from C2C Website",
          from_name: "C2C Website Contact Form",
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        setIsSuccess(true)
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        // Fallback to mailto if service fails
        const subject = encodeURIComponent("Contact from C2C Website")
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
      }
    } catch (error) {
      // Fallback to mailto on error
      const subject = encodeURIComponent("Contact from C2C Website")
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-c2c-offwhite">
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-c2c-navy via-c2c-navy-light/90 to-c2c-navy noise-overlay">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Have questions? We're here to help you land your dream internship or new grad role.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-semibold text-c2c-navy mb-6">
                  Let's Connect
                </h2>
                <p className="text-c2c-navy/80 text-lg mb-8 leading-relaxed">
                  Whether you have questions about our services, want to discuss your career goals, or just want to say hi — we'd love to hear from you.
                </p>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-c2c-teal/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-c2c-teal" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-c2c-navy mb-1">Email Us</h3>
                      <a 
                        href={`mailto:${EMAIL}`}
                        className="text-c2c-teal hover:text-c2c-teal/80 transition-colors text-base"
                      >
                        {EMAIL}
                      </a>
                    </div>
                  </div>

                  {/* Book Consultation */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-c2c-gold/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-c2c-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-c2c-navy mb-1">Book a Free Consultation</h3>
                      <p className="text-c2c-navy/70 text-base mb-3">
                        30-min call • Free game plan • No pressure
                      </p>
                      <Button
                        asChild
                        className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold"
                      >
                        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                          Book Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="mt-12 pt-8 border-t border-c2c-navy/10">
                  <h3 className="text-lg font-semibold text-c2c-navy mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <a href="/faq" className="block text-c2c-teal hover:text-c2c-teal/80 transition-colors">
                      → Frequently Asked Questions
                    </a>
                    <a href="/policies" className="block text-c2c-teal hover:text-c2c-teal/80 transition-colors">
                      → Policies
                    </a>
                    <a href="/#services" className="block text-c2c-teal hover:text-c2c-teal/80 transition-colors">
                      → Our Services
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-c2c-navy/10">
                  <h2 className="text-2xl font-semibold text-c2c-navy mb-6">
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-c2c-navy mb-2">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-c2c-navy mb-2">
                        Your Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-c2c-navy mb-2">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        className="w-full resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>

                    {isSuccess && (
                      <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 py-3 px-4 rounded-lg">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">Message sent successfully!</span>
                      </div>
                    )}

                    <p className="text-sm text-c2c-navy/60 text-center">
                      We typically respond within 24 hours
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
