import { StarField } from "@/components/star-field"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <StarField />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  )
}
