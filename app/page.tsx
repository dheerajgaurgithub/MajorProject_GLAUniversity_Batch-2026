import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { HowItWorks } from '@/components/how-it-works'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </>
  )
}
