"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "How do I get the resources?",
    a: "As soon as you submit the form, you'll receive an email with the 14-day checklist, the LinkedIn/Resume scorecard, and the 3 quick-fix guide. Check your inbox (and spam/promotions folder) within a few minutes.",
  },
  {
    q: "What if I don't have experience?",
    a: "That's exactly who this is for. The scorecard and checklist are designed to help students and new grads position the experience they do have -- clubs, projects, part-time work -- in a way recruiters respond to.",
  },
  {
    q: "Do you work with international students?",
    a: "Yes. We work with students on study permits, post-grad work permits, and other visa types. You need a valid work permit or visa to pursue employment in Canada. We'll help you present your situation clearly to employers.",
  },
  {
    q: "What roles do you help with?",
    a: "We specialize in business-facing roles: finance, consulting, marketing, operations, project management, and similar functions at top firms. If you're targeting FAANG-style software engineering roles, we may not be the best fit.",
  },
  {
    q: "What do I need for the scorecard review?",
    a: "Just your current resume (PDF preferred) and your LinkedIn profile URL. We review both and send back a detailed scorecard highlighting exactly what to fix and why.",
  },
  {
    q: "How fast do I get the scorecard feedback?",
    a: "Most scorecard reviews are returned within 48 hours. If you book the free consult, we'll walk through the scorecard together live so you can ask questions.",
  },
]

export function ConsultFAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-c2c-offwhite">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-c2c-navy text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-white border border-c2c-border rounded-xl px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left text-base md:text-lg font-medium text-c2c-navy hover:text-c2c-teal py-5 [&[data-state=open]]:text-c2c-teal">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-c2c-navy/80 text-base leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
