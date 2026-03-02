/* Shared data for consult page - used by both mobile and desktop */

export const ROLE_OPTIONS = [
  "Internship",
  "New Grad / Entry-Level",
  "Co-op",
  "Career Switch",
  "Other",
]

export const VISA_OPTIONS = [
  "I have a citizenship in the country I am pursuing work in",
  "I have a work permit that allows me to work",
  "I require sponsorship by the company I work with",
  "Other",
  "Prefer not to say",
]

export const companies = [
  { name: "IBM", logo: "/images/logos/ibm.png", w: 70, h: 28 },
  { name: "Deloitte", logo: "/images/logos/deloitte.png", w: 85, h: 22 },
  { name: "RBC", logo: "/images/logos/rbc.png", w: 40, h: 44 },
  { name: "Amazon", logo: "/images/logos/amazon.png", w: 80, h: 26 },
  { name: "Amex", logo: "/images/logos/amex.png", w: 44, h: 44 },
  { name: "EA", logo: "/images/logos/ea-sports.png", w: 44, h: 44 },
]

export const shaniaCredentials = [
  { icon: "Building2", label: "Apple", detail: "First Canadian intern + return offer" },
  { icon: "Award", label: "Scotiabank", detail: "Family Office (UHNW)" },
  { icon: "Briefcase", label: "MLSE", detail: "Brand Marketing" },
  { icon: "TrendingUp", label: "Interviews", detail: "Microsoft, BlackRock, Morgan Stanley & more" },
] as const

export const callSteps = [
  {
    icon: "Search",
    title: "Find the leaks",
    desc: "If your apps aren't converting, something's off. We identify the exact \"leak\" in your resume/LinkedIn/strategy that's costing you callbacks.",
  },
  {
    icon: "Target",
    title: "Create your next 14 days",
    desc: "You'll walk away with a tailored checklist that tells you what to do each day to increase visibility and land interviews faster.",
  },
  {
    icon: "Zap",
    title: "Lock your next step",
    desc: "You'll leave knowing the best move: self-serve resources, a focused coaching package, or a specific action plan you can run immediately.",
  },
]

export const benefits = [
  {
    icon: "FileText",
    title: "LinkedIn & Resume Scorecard",
    desc: "We score your resume + LinkedIn the way recruiters do, then show you what's blocking callbacks (positioning, keywords, readability, impact).",
    shortDesc: "Recruiter-style audit of what's blocking callbacks.",
  },
  {
    icon: "ListChecks",
    title: "14-Day Action Checklist",
    desc: "A day-by-day plan tailored to your target roles, so you know exactly what to fix, what to apply to, and who to reach out to each day.",
    shortDesc: "Day-by-day plan tailored to your target roles.",
  },
  {
    icon: "Wrench",
    title: "3 Quick Fixes",
    desc: "Three high-impact edits you can make today to instantly improve how your profile reads and how you show up in searches.",
    shortDesc: "High-impact edits you can make today.",
  },
  {
    icon: "CalendarCheck",
    title: "Free 30-Min Consult",
    desc: "We walk through your scorecard, map your fastest path, and leave you with a clear next move (DIY resources or coaching).",
    shortDesc: "Scorecard walkthrough + clear next move.",
  },
]

export const howItWorks = [
  { num: "01", title: "Opt in", desc: "Drop your name and email. Takes 30 seconds." },
  { num: "02", title: "Get your resources", desc: "Your scorecard + checklist will be discussed in the consultation to ensure accuracy and takeaways for your goals." },
  { num: "03", title: "Book your consult", desc: "Pick a time and walk away with a real game plan." },
]

export const testimonials = [
  {
    headline: "C2C was my turning point.",
    body: "Coming into first year, I had very little experience. C2C gave me a clear plan, tightened my resume + LinkedIn, and helped me communicate my story.",
    result: "Landed a role at Molson Breweries and became a finalist at IBM.",
    name: "Varun D.",
    title: "Second Year, York University",
    stars: 5,
    avatar: "/images/reviews/varun.jpg",
  },
  {
    headline: "My materials + outreach strategy finally clicked.",
    body: "I was based in England trying to break into fintech in London, and I wasn't getting momentum. After working with C2C, everything finally came together.",
    result: "Started landing interviews at Lazard, Goldman Sachs, and Morgan Stanley.",
    name: "Naina S.",
    title: "Final Year, LSE",
    stars: 5,
    avatar: "/images/reviews/naina.jpg",
  },
  {
    headline: "From no traction to multiple callbacks.",
    body: "Last summer I had nothing lined up. C2C helped me fix my positioning, build a real networking pipeline, and stop wasting time on random applications.",
    result: "Started getting callbacks at Deloitte and multiple consulting firms.",
    name: "Jasmine C.",
    title: "Third Year, Ivey Western",
    stars: 5,
    avatar: "/images/reviews/jasmine.jpg",
  },
  {
    headline: "C2C grew my passions and helped me see my vision.",
    body: "I went from no resume, no direction and no application, to having insider knowledge, confidence and experiences under my belt.",
    result: "Now I'm interviewing with fast-paced startups.",
    name: "Adeena S.",
    title: "Second Year, UBC",
    stars: 5,
    avatar: "/images/reviews/adeena.jpg",
  },
]

export const faqs = [
  { q: "How quickly will I get the scorecard and checklist?", a: "To ensure accuracy and discuss the results, you will receive them during our 30-minute consultation. This will ensure your goals are aligned with our scorecard and 14-day checklist. We don't want you to get generic advice, but advice specific to your situation." },
  { q: "I don't have much experience. Is this still for me?", a: "Absolutely. Most of our clients start with little or no experience. The whole point is to help you position what you have and build from there." },
  { q: "I'm an international student. Can I still use this?", a: "Yes -- as long as you have a valid work permit, study permit, or visa that allows you to work. We've helped international students across Canada, the US, and the UK." },
  { q: "What types of roles does C2C focus on?", a: "Internships, co-ops, and new grad roles across industries -- finance, consulting, tech, marketing, and more. We tailor our approach to your target." },
  { q: "Do I need to upload anything before the consult?", a: "Nope. Just your name and email to start. On the thank-you page you can optionally share your LinkedIn or a resume link to help your coach prepare, but it's not required." },
  { q: "How long is the turnaround for the consult?", a: "After you opt in, you book a time directly. Most clients get on a call within 2-5 days depending on availability." },
]

/* Mobile: show only 2-3 most important FAQs */
export const mobileFaqs = [
  faqs[1], // "I don't have much experience. Is this still for me?"
  faqs[0], // "How quickly will I get the scorecard and checklist?"
  faqs[2], // "I'm an international student. Can I still use this?"
]
