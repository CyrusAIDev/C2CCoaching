import { Header } from "@/components/c2c/header"
import { Footer } from "@/components/c2c/footer"

export default function PoliciesPage() {
  const sections = [
    {
      title: "Turnaround + Deadlines",
      items: [
        "Any role you want supported (resume, cover letter, or full application work) must be sent 48 hours before the deadline.",
        "Short-notice requests may be declined or accepted only if capacity allows (rush may apply).",
      ],
    },
    {
      title: "Sessions",
      items: [
        "Reschedules/cancellations require 24 hours' notice.",
        "Changes within 24 hours = session deducted.",
        "No-shows or arriving 10+ minutes late may be deducted.",
      ],
    },
    {
      title: "Communication",
      items: [
        "Responses are primarily Monday–Friday.",
        "Weekend replies aren't guaranteed unless you've flagged a weekend deadline in advance.",
      ],
    },
    {
      title: "Promotions + Discounts",
      items: [
        "Discounts/promos must be used within the stated window (typically 24 hours).",
        "Promotions are not retroactive.",
      ],
    },
    {
      title: "Payment + Booking",
      items: [
        "Payment is required to confirm sessions and begin work.",
        "Book via the website or e-transfer to shania@fromcampus2corporate.com.",
      ],
    },
    {
      title: "Packages + Time Usage",
      items: [
        "Package hours cover calls + behind-the-scenes work (edits, tailoring, prep, follow-ups).",
        "Packages must be used within 90 days of purchase unless stated otherwise.",
      ],
    },
    {
      title: "Results + Responsibility",
      items: [
        "Coaching does not guarantee interviews or offers. Outcomes depend on many factors.",
        "Best results come when you follow action items, stay responsive, and meet deadlines.",
      ],
    },
    {
      title: "Refunds",
      items: [
        "All package purchases are final sale. No refunds once payment is processed.",
      ],
    },
    {
      title: "Integrity + Respectful Conduct",
      items: [
        "FromCampus2Corporate (C2C) does not support dishonest applications, misrepresentation, or unethical requests.",
        "Disrespectful behavior, repeated no-shows, unethical requests, or non-payment may result in ending services.",
      ],
    },
    {
      title: "Confidentiality + Resources",
      items: [
        "Your information is kept confidential.",
        "Templates/resources are for personal use only (no sharing or reselling). C2C reserves the copyrights.",
      ],
    },
    {
      title: "Financial Hardship Support",
      items: [
        "Limited mentorship/advising spots may be available for students with financial hardship, based on proof and availability.",
      ],
    },
    {
      title: "Tracking + Transparency",
      items: [
        "You'll be added to a C2C Application Tracker spreadsheet.",
        "You're expected to add any roles you're interested in as soon as you find them.",
        "I will log: roles in progress + status, deadlines, deliverables completed, and time used, so your hours are always clear.",
      ],
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-c2c-offwhite">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-c2c-navy via-c2c-navy-light/90 to-c2c-navy noise-overlay">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Policies
            </h1>
            <p className="text-c2c-text-navy text-lg">
              Clear expectations for working together
            </p>
          </div>
        </section>

        {/* Policies Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-md border border-c2c-navy/10">
                  <h2 className="text-2xl font-semibold text-c2c-navy mb-6">
                    {section.title}
                  </h2>
                  <ul className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-3 text-c2c-navy/80 leading-relaxed"
                      >
                        <span className="w-2 h-2 rounded-full bg-c2c-teal mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Back to Home CTA */}
        <section className="py-16 text-center">
          <a
            href="/"
            className="inline-block bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg shadow-[0_0_25px_rgba(58,166,168,0.3)]"
          >
            Back to Home
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
