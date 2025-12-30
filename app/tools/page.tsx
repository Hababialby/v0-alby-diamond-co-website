import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CalculatorSection } from "@/components/calculator-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Diamond Calculators & Tools | Price, Size & Ratio Calculators | Alby Diamond Co.",
  description:
    "Free professional diamond calculators. Instantly calculate diamond size, price estimates, carat weight from dimensions, and length-to-width ratios. Expert jewelry tools for buyers and enthusiasts.",
  keywords:
    "diamond calculator, diamond size calculator, diamond price estimator, carat calculator, diamond ratio calculator, diamond tools, jewelry calculator, diamond dimensions, engagement ring calculator",
  openGraph: {
    title: "Professional Diamond Calculators & Tools - Alby Diamond Co.",
    description:
      "Expert diamond calculators for size, price, and ratio calculations. Free professional tools for diamond buyers.",
    type: "website",
  },
}

export default function ToolsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl mb-4">
              Diamond Calculators & Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Professional diamond calculators to help you estimate size, price, carat weight, and proportions. All
              tools are free to use.
            </p>
          </div>

          <CalculatorSection />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
