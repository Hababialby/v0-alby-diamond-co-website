import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PortfolioGridServer } from "@/components/portfolio-grid-server"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Custom Diamond Jewelry Portfolio | Engagement Rings & Fine Jewelry | Alby Diamond Co.",
  description:
    "Browse our portfolio of custom 1-of-1 diamond jewelry pieces. Exquisite engagement rings, wedding bands, necklaces, and fine jewelry crafted with exceptional artistry for discerning clients worldwide.",
  keywords:
    "custom jewelry portfolio, engagement ring gallery, custom diamond rings, bespoke jewelry, handcrafted jewelry, luxury jewelry examples, diamond engagement rings, custom wedding bands, fine jewelry portfolio",
  openGraph: {
    title: "Custom Jewelry Portfolio - Alby Diamond Co.",
    description:
      "Exquisite custom diamond jewelry crafted to perfection. View our portfolio of engagement rings and fine jewelry.",
    type: "website",
  },
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function PortfolioPage() {
  const supabase = await createClient()
  const { data: items } = await supabase.from("portfolio_items").select("*").order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl mb-4">Our Portfolio</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Here are some of the custom 1-of-1 jewelry pieces we have crafted for our valued customers.
            </p>
          </div>

          <PortfolioGridServer items={items || []} />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
