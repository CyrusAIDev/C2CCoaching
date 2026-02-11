"use client"

import { Suspense, useState } from "react"
import Image from "next/image"
import { ConsultHeader } from "@/components/consult/consult-header"
import { LeadForm } from "@/components/consult/lead-form"
import { ConsultFAQ } from "@/components/consult/consult-faq"
import { SectionBackground } from "@/components/c2c/section-background"
import {
  FileText,
  CheckSquare,
  Zap,
  Phone,
  ClipboardList,
  Send,
  CalendarCheck,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Audience tab microcopy                                            */
/* ------------------------------------------------------------------ */
const audiences = [
  { label: "Internships", copy: "Get callbacks for competitive summer and co-op positions." },
  { label: "New Grads", copy: "Stand out in the toughest hiring cycle in years." },
  { label: "International Students", copy: "Present your visa situation clearly and confidently." },
  { label: "Parents", copy: "Give your student a real edge -- not another textbook." },
]

/* ------------------------------------------------------------------ */
/*  Logo data (compact row reused from logo-strip)                    */
/* ------------------------------------------------------------------ */
const logos = [
  { src: "/images/logos/ibm.png", alt: "IBM", w: 70, h: 28 },
  { src: "/images/logos/deloitte.png", alt: "Deloitte", w: 85, h: 22 },
  { src: "/images/logos/rbc.png", alt: "RBC", w: 42, h: 46 },
  { src: "/images/logos/amex.png", alt: "American Express", w: 46, h: 46 },
  { src: "/images/logos/amazon.png", alt: "Amazon", w: 78, h: 24 },
  { src: "/images/logos/ea-sports.png", alt: "EA Sports", w: 46, h: 46 },
]

/* ------------------------------------------------------------------ */
/*  Benefit cards data                                                */
/* ------------------------------------------------------------------ */
const benefits = [
  {
    icon: FileText,
    title: "LinkedIn + Resume Scorecard",
    desc: "Know exactly what's hurting callbacks and what to fix first.",
  },
  {
    icon: CheckSquare,
    title: '14-Day "Interview in 14" Checklist',
    desc: "Daily actions to generate outreach and traction.",
  },
  {
    icon: Zap,
    title: "3 Quick Fixes",
    desc: "Immediate upgrades recruiters notice.",
  },
  {
    icon: Phone,
    title: "Free 30-Minute Consultation",
    desc: "Personalized direction for your exact situation.",
  },
]

/* ------------------------------------------------------------------ */
/*  Testimonial data                                                  */
/* ------------------------------------------------------------------ */
const testimonials = [
  { name: "Priya S.", target: "Finance Internship", result: "Landed an internship at RBC within 3 weeks of applying the checklist." },
  { name: "Marcus T.", target: "Consulting New Grad", result: "Went from zero callbacks to 4 interviews in two weeks after the scorecard review." },
  { name: "Aisha K.", target: "Marketing Internship", result: "Got my first offer at a top agency. The LinkedIn fixes made a huge difference." },
  { name: "Jordan L.", target: "Operations Co-op", result: "International student on a study permit. C2C helped me frame my situation and I got 3 offers." },
  { name: "Emily C.", target: "PM New Grad", result: "The 30-minute consult alone was worth it. I completely restructured my approach." },
]

/* ================================================================== */
/*  Page                                                              */
/* ================================================================== */
export default function ConsultPage() {
  const [activeTab, setActiveTab] = useState(0)

  const scrollToForm = () => {
    const el = document.getElementById("lead-form")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return (
    <>
      <ConsultHeader />

      <main className="min-h-screen bg-c2c-offwhite pt-14 md:pt-16">
        {/* ============================== A) HERO ============================== */}
        <section className="relative bg-gradient-to-br from-c2c-navy via-c2c-navy-light to-c2c-navy-dark noise-overlay overflow-hidden">
          <SectionBackground />

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
              {/* Left column - copy */}
              <div className="flex-1 max-w-2xl">
                <h1 className="text-3xl md:text-[2.75rem] md:leading-tight font-bold text-white mb-5 text-balance">
                  Walk away with a 2-week action plan — and fix what{"'"}s blocking your callbacks.
                </h1>
                <p className="text-lg md:text-xl text-white/85 mb-6 leading-relaxed">
                  Get my 14-day checklist + a LinkedIn/Resume scorecard + a free 30-minute consult.
                </p>

                {/* Audience tabs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {audiences.map((a, i) => (
                    <button
                      key={a.label}
                      onClick={() => setActiveTab(i)}
                      className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeTab === i
                          ? "bg-c2c-teal text-white"
                          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
                <p className="text-white/70 text-sm mb-8 min-h-[1.5rem]">
                  {audiences[activeTab].copy}
                </p>

                {/* 3 bullet outcomes */}
                <ul className="space-y-3 mb-8">
                  {[
                    "A clear, prioritized list of what to fix on your resume and LinkedIn",
                    "Daily outreach actions you can start this week",
                    "A 1-on-1 session to map your next 30 days",
                  ].map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-white/90 text-base">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-c2c-teal flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Compact logo proof - desktop only */}
                <div className="hidden lg:block mb-4">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">
                    Students have landed at
                  </p>
                  <div className="flex items-center gap-5 flex-wrap">
                    {logos.map((logo) => (
                      <Image
                        key={logo.alt}
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.w}
                        height={logo.h}
                        className="opacity-60 object-contain max-h-[32px]"
                        style={{ width: "auto", height: "auto" }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column - form */}
              <div className="mt-10 lg:mt-0 lg:w-[420px] flex-shrink-0">
                <Suspense fallback={<div className="h-96 animate-pulse bg-white/10 rounded-2xl" />}>
                  <LeadForm />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* ======================== B) SOCIAL PROOF STRIP ======================== */}
        <section className="py-12 md:py-16 bg-c2c-offwhite">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-c2c-navy text-sm font-semibold tracking-wide uppercase mb-6">
              Students I{"'"}ve supported have landed interviews/offers at
            </p>
            <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
              {logos.map((logo) => (
                <div
                  key={logo.alt}
                  className="bg-white border border-c2c-border rounded-xl h-14 w-24 md:h-16 md:w-28 shadow-sm flex items-center justify-center"
                >
                  <Image
                    src={logo.src}
                    alt={`${logo.alt} logo`}
                    width={logo.w}
                    height={logo.h}
                    className="opacity-80 object-contain max-h-[36px] max-w-[64px]"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              ))}
            </div>
            <p className="text-c2c-navy/60 text-sm mt-4">
              Real outcomes from real students at top Canadian schools.
            </p>
          </div>
        </section>

        {/* ======================== C) WHAT YOU GET ======================== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-c2c-navy text-center mb-12">
              What You Get
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="bg-c2c-offwhite border border-c2c-border rounded-xl p-6 hover:border-c2c-teal/30 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-lg bg-c2c-teal/10 flex items-center justify-center mb-4">
                    <b.icon className="w-5 h-5 text-c2c-teal" />
                  </div>
                  <h3 className="text-lg font-semibold text-c2c-navy mb-2">{b.title}</h3>
                  <p className="text-c2c-navy/70 text-base leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg shadow-[0_0_15px_rgba(58,166,168,0.3)]"
              >
                Get the Free Toolkit
              </button>
            </div>
          </div>
        </section>

        {/* ======================== D) HOW IT WORKS ======================== */}
        <section className="py-16 md:py-24 bg-c2c-offwhite">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-c2c-navy text-center mb-14">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", icon: ClipboardList, title: "Opt in", desc: "Fill out the short form above." },
                { step: "2", icon: Send, title: "Get resources instantly", desc: "Checklist, scorecard, and quick fixes land in your inbox." },
                { step: "3", icon: CalendarCheck, title: "Book your free consult", desc: "Pick a time on the next page -- 30 minutes, no strings attached." },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-c2c-teal/10 flex items-center justify-center mx-auto mb-4">
                    <s.icon className="w-6 h-6 text-c2c-teal" />
                  </div>
                  <span className="text-xs font-bold text-c2c-teal uppercase tracking-wider">
                    Step {s.step}
                  </span>
                  <h3 className="text-lg font-semibold text-c2c-navy mt-2 mb-2">{s.title}</h3>
                  <p className="text-c2c-navy/70 text-base">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== E) NOT FOR YOU ===================== */}
        <section className="py-14 md:py-20 bg-white">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-c2c-navy mb-6">
              This might not be for you if...
            </h2>
            <div className="space-y-4 text-left max-w-lg mx-auto">
              <div className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-c2c-navy/30 flex-shrink-0" />
                <p className="text-c2c-navy/80 text-base">
                  You{"'"}re looking for shortcuts with zero effort. This plan works, but it requires showing up daily.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-c2c-navy/30 flex-shrink-0" />
                <p className="text-c2c-navy/80 text-base">
                  You{"'"}re not willing to do daily outreach actions. The checklist is only useful if you follow through.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== F) TESTIMONIALS ===================== */}
        <section className="py-16 md:py-24 bg-c2c-offwhite">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-c2c-navy text-center mb-12">
              What Students Are Saying
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-white border border-c2c-border rounded-xl p-6 shadow-sm"
                >
                  <p className="text-c2c-navy/80 text-base leading-relaxed mb-4">
                    {`"${t.result}"`}
                  </p>
                  <div>
                    <p className="font-semibold text-c2c-navy text-sm">{t.name}</p>
                    <p className="text-c2c-navy/50 text-xs">{t.target}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== G) FAQ ===================== */}
        <ConsultFAQ />

        {/* ===================== H) FINAL CTA ===================== */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-c2c-navy via-c2c-navy-light to-c2c-navy-dark noise-overlay relative overflow-hidden">
          <SectionBackground />
          <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
              Ready to fix what{"'"}s blocking your callbacks?
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Get the free toolkit and book your consult.
            </p>
            <Suspense fallback={<div className="h-96 animate-pulse bg-white/10 rounded-2xl" />}>
              <LeadForm id="lead-form-bottom" />
            </Suspense>
          </div>
        </section>

        {/* ===================== FOOTER ===================== */}
        <footer className="py-8 bg-c2c-navy-dark">
          <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} From Campus 2 Corporate. All rights reserved.
            </p>
            <a
              href="/policies"
              className="text-c2c-teal hover:text-c2c-teal/80 text-sm font-medium transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </footer>
      </main>
    </>
  )
}
