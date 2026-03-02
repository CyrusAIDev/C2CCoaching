"use client"

import { useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { SectionBackground } from "@/components/c2c/section-background"
import { Footer } from "@/components/c2c/footer"
import { LeadForm } from "./lead-form"
import {
  benefits,
  testimonials,
  mobileFaqs,
  howItWorks,
} from "./consult-data"
import { TRUST_MICROCOPY } from "@/lib/constants"
import {
  FileText,
  ListChecks,
  Wrench,
  CalendarCheck,
  Star,
  Building2,
  Award,
  Briefcase,
  TrendingUp,
} from "lucide-react"

const benefitIcons = { FileText, ListChecks, Wrench, CalendarCheck }

export function ConsultMobile() {
  const scrollToForm = useCallback(() => {
    const el = document.getElementById("hero-form")
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: offset, behavior: "smooth" })
    }
  }, [])

  return (
    <>
      <main id="top" className="relative min-h-screen bg-c2c-offwhite pb-20">
        {/* Sticky Top Bar */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-c2c-border shadow-sm">
          <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-14">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/c2c-logo.png"
                alt="C2C - From Campus 2 Corporate"
                width={180}
                height={72}
                sizes="180px"
                className="h-[4.5rem] -my-2.5 object-contain"
                style={{ width: "auto" }}
                priority
              />
            </Link>
            <div className="flex items-center gap-3">
              <a href="#faq" className="text-c2c-navy/80 hover:text-c2c-navy text-sm font-semibold transition-colors">FAQ</a>
              <Button onClick={scrollToForm} size="sm" className="bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold rounded-lg text-sm px-4">
                Get Started
              </Button>
            </div>
          </div>
        </header>

        {/* Hero - Form First */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="/images/hero-mobile.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_30%]" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-c2c-navy/70 via-c2c-navy/85 to-c2c-navy" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-5 py-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              <h1 className="text-center leading-[1.15]">
                <span className="block text-[clamp(1.2rem,5.3vw,1.65rem)] font-extrabold text-white">
                  Get your free 14-day plan
                </span>
                <span className="block text-white text-[2rem] font-black leading-none my-1">+</span>
                <span className="block text-[clamp(1.2rem,5.3vw,1.65rem)] font-extrabold text-white">
                  Free 30-minute call
                </span>
              </h1>

              <LeadForm id="hero-form" variant="dark" />

              <div className="space-y-2">
                <p className="text-white text-sm font-semibold text-center">
                  30-min call • Free game plan • No pressure
                </p>
                <p className="text-white/80 text-xs text-center font-medium">{TRUST_MICROCOPY}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-12 bg-white relative overflow-hidden">
          <SectionBackground />
          <div className="relative z-10 max-w-5xl mx-auto px-5">
            <div className="rounded-2xl border border-c2c-border bg-c2c-offwhite/70 p-4 shadow-sm">
              <div className="flex justify-center mb-2">
                <span className="inline-flex items-center rounded-full bg-c2c-teal/12 text-c2c-teal px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  What you get
                </span>
              </div>
              <p className="text-c2c-navy/85 text-sm font-medium text-center mb-4">Clear deliverables you can use immediately.</p>
              <div className="grid grid-cols-2 gap-3">
              {benefits.map((b) => {
                const Icon = benefitIcons[b.icon as keyof typeof benefitIcons]
                return (
                  <Card key={b.title} className="bg-c2c-offwhite border-c2c-border rounded-xl p-4 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-c2c-teal/10 flex items-center justify-center mb-2">
                      {Icon && <Icon className="w-5 h-5 text-c2c-teal" />}
                    </div>
                    <h3 className="text-base font-semibold text-c2c-navy mb-0.5">{b.title}</h3>
                    <p className="text-c2c-navy/70 text-sm leading-relaxed">{b.shortDesc}</p>
                  </Card>
                )
              })}
              </div>
            </div>
          </div>
        </section>

        {/* Meet Shania */}
        <section className="py-12 bg-c2c-offwhite relative overflow-hidden">
          <div className="relative z-10 max-w-5xl mx-auto px-5">
            <div className="rounded-2xl border border-c2c-border bg-white p-4 shadow-sm">
              <h2 className="text-xl font-semibold text-c2c-navy mb-4 text-center">Meet Shania</h2>
              <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.35 }}
                className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-lg ring-2 ring-c2c-teal/20 mb-4"
              >
                <Image
                  src="/images/meet Shania.jpg"
                  alt="Shania - C2C Founder"
                  fill
                  sizes="128px"
                  className="object-cover object-top"
                />
              </motion.div>
              <p className="text-c2c-navy text-[15px] font-medium leading-relaxed text-left mb-5 w-full bg-c2c-offwhite rounded-xl border border-c2c-border p-4">
                Shania has been Apple&apos;s first Canadian intern, received her return offer there and her other internships. She&apos;s also helped students land at IBM, Deloitte, Goldman Sachs, Morgan Stanley, and more. She&apos;s built C2C to help students become competitive in today&apos;s job market.
              </p>
              <div className="grid grid-cols-2 gap-2.5 w-full">
                {[
                  { icon: Building2, label: "Apple", detail: "First Canadian intern" },
                  { icon: Award, label: "Scotiabank", detail: "Family Office" },
                  { icon: Briefcase, label: "MLSE", detail: "Brand Marketing" },
                  { icon: TrendingUp, label: "Interviews", detail: "Microsoft, BlackRock & more" },
                ].map((item) => (
                  <div key={item.label} className="text-center bg-c2c-offwhite rounded-xl px-2.5 py-2.5 border border-c2c-border">
                    <div className="w-7 h-7 rounded-full bg-c2c-teal/10 flex items-center justify-center mx-auto mb-1">
                      <item.icon className="w-3.5 h-3.5 text-c2c-teal" />
                    </div>
                    <p className="text-c2c-navy font-semibold text-sm">{item.label}</p>
                    <p className="text-c2c-navy/85 text-xs font-medium leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 bg-white relative overflow-hidden">
          <SectionBackground />
          <div className="relative z-10 max-w-5xl mx-auto px-5">
            <div className="rounded-2xl border border-c2c-border bg-c2c-offwhite/70 p-4 shadow-sm">
              <h2 className="text-xl font-semibold text-c2c-navy mb-2 text-center">How it works</h2>
              <p className="text-c2c-navy text-sm font-medium text-center mb-5">Three steps. No guesswork.</p>
              <div className="flex flex-col gap-4">
              {howItWorks.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.28, delay: i * 0.06 }}
                  className="flex items-start gap-4 bg-c2c-offwhite rounded-xl p-4 border border-c2c-border min-h-[108px]"
                >
                  <div className="w-10 h-10 rounded-full bg-c2c-teal/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-c2c-teal text-sm font-bold">{s.num}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-c2c-navy text-sm">{s.title}</h3>
                    <p className="text-c2c-navy/85 text-xs leading-relaxed mt-0.5">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 bg-c2c-offwhite relative overflow-hidden">
          <SectionBackground />
          <div className="relative z-10 max-w-5xl mx-auto px-5">
            <h2 className="text-xl font-semibold text-c2c-navy mb-6 text-center">What our clients say</h2>
            <div className="flex flex-col gap-4">
              {testimonials.map((t) => (
                <Card key={t.name} className="bg-c2c-offwhite border-c2c-border rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-c2c-offwhite ring-2 ring-c2c-teal/20 flex-shrink-0">
                      <Image src={t.avatar} alt={t.name} fill sizes="48px" className={`object-cover ${t.name === "Varun D." ? "object-center" : "object-top"}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-c2c-navy text-base">{t.name}</p>
                      <p className="text-c2c-navy/60 text-sm">{t.title}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-c2c-gold text-c2c-gold" />
                    ))}
                  </div>
                  <h4 className="text-base font-semibold text-c2c-navy mb-1 leading-snug">&ldquo;{t.headline}&rdquo;</h4>
                  <Accordion type="single" collapsible className="mb-2">
                    <AccordionItem value={`body-${t.name}`} className="border-0">
                      <AccordionTrigger className="text-c2c-teal text-sm font-medium py-1 hover:no-underline">
                        Read full story
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-c2c-navy/70 text-sm leading-relaxed">{t.body}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div className="bg-c2c-teal/[0.08] rounded-lg p-2.5 border-l-[3px] border-c2c-teal">
                    <p className="text-sm">
                      <span className="font-bold text-c2c-teal">Result: </span>
                      <span className="text-c2c-navy/80 font-medium">{t.result}</span>
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ - 2-3 questions */}
        <section id="faq" className="py-12 bg-c2c-offwhite relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto px-5">
            <h2 className="text-xl font-semibold text-c2c-navy mb-6 text-center">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {mobileFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-c2c-navy/10">
                  <AccordionTrigger className="text-c2c-navy font-semibold text-sm text-left py-4 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-c2c-navy/70 text-sm leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Photo strip - Work ready, Community, Behind the scenes */}
        <section className="py-12 bg-white relative overflow-hidden">
          <SectionBackground />
          <div className="relative z-10 max-w-5xl mx-auto px-5">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide">
                {[
                  { src: "/images/consult/work-ready-f683.png", caption: "Work-ready" },
                { src: "/images/consult/consult-2.jpg", caption: "Community" },
                  { src: "/images/consult/behind-scenes-somewhere.png", caption: "Behind the scenes", zoom: true },
              ].map((img) => (
                <div key={img.caption} className="flex flex-col items-center gap-2 flex-shrink-0 snap-start">
                  <div className="relative w-40 h-28 rounded-xl overflow-hidden shadow-lg ring-1 ring-c2c-border">
                    <Image src={img.src} alt={img.caption} fill sizes="160px" className={`object-cover object-center ${img.zoom ? "scale-125" : ""}`} />
                  </div>
                  <span className="text-c2c-navy/40 text-xs font-medium">{img.caption}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Form again */}
        <section id="lead" className="py-12 bg-c2c-offwhite relative overflow-hidden">
          <SectionBackground />
          <div className="relative z-10 max-w-2xl mx-auto px-5">
            <h2 className="text-xl font-semibold text-c2c-navy mb-2 text-center">
              Ready to get your plan?
            </h2>
            <p className="text-c2c-navy/70 text-sm text-center mb-6">Book your free call. No pressure.</p>
            <LeadForm id="bottom-form" variant="light" />
          </div>
        </section>

        <Footer />
      </main>

      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-c2c-border shadow-[0_-2px_12px_rgba(0,0,0,0.06)] px-4 py-3 [transform:translateZ(0)]">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-c2c-navy/50 text-xs font-medium">Step 1 of 2</span>
        </div>
        <Button
          onClick={scrollToForm}
          className="w-full bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold py-5 text-base rounded-lg shadow-[0_0_20px_rgba(58,166,168,0.25)]"
        >
          Get my free plan <span className="ml-1.5">→</span>
        </Button>
      </div>
    </>
  )
}
