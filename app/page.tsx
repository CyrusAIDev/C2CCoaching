import dynamic from "next/dynamic"
import { Header } from "@/components/c2c/header"
import { Hero } from "@/components/c2c/hero"
import { ConversionPopup } from "@/components/c2c/conversion-popup"

// Lazy load below-the-fold components for better initial page load performance
const LogoStrip = dynamic(() => import("@/components/c2c/logo-strip").then((mod) => ({ default: mod.LogoStrip })))
const OurStory = dynamic(() => import("@/components/c2c/our-story").then((mod) => ({ default: mod.OurStory })))
const WhyC2C = dynamic(() => import("@/components/c2c/why-c2c").then((mod) => ({ default: mod.WhyC2C })))
const ServicePerks = dynamic(() => import("@/components/c2c/service-perks").then((mod) => ({ default: mod.ServicePerks })))
const Reviews = dynamic(() => import("@/components/c2c/reviews").then((mod) => ({ default: mod.Reviews })))
const Footer = dynamic(() => import("@/components/c2c/footer").then((mod) => ({ default: mod.Footer })))

export default function Home() {
  return (
    <main className="min-h-screen bg-c2c-offwhite">
      <Header />
      <Hero />
      <LogoStrip />
      <OurStory />
      <WhyC2C />
      <ServicePerks />
      <Reviews />
      <Footer />
      <ConversionPopup />
    </main>
  )
}
