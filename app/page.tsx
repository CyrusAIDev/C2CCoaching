import { Header } from "@/components/c2c/header"
import { Hero } from "@/components/c2c/hero"
import { LogoStrip } from "@/components/c2c/logo-strip"
import { OurStory } from "@/components/c2c/our-story"
import { WhyC2C } from "@/components/c2c/why-c2c"
import { ServicePerks } from "@/components/c2c/service-perks"
import { Reviews } from "@/components/c2c/reviews"
import { Footer } from "@/components/c2c/footer"

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
    </main>
  )
}
