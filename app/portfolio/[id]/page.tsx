import { redirect } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PortfolioDetail } from "@/components/portfolio-detail"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

interface PortfolioItem {
  id: string
  title: string
  category: string
  description: string
  customer_quote: string
  customer_name: string
  images: string[]
  created_at: string
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params
  const supabase = await createClient()
  const { data: item } = await supabase.from("portfolio_items").select("*").eq("id", id).maybeSingle()

  if (!item) {
    return {
      title: "Portfolio Item Not Found | Alby Diamond Co.",
    }
  }

  return {
    title: `${item.title} | Custom Jewelry Portfolio | Alby Diamond Co.`,
    description: item.customer_quote || `${item.title} - Custom jewelry by Alby Diamond Co.`,
    openGraph: {
      title: item.title,
      description: item.customer_quote || `${item.title} - Custom jewelry by Alby Diamond Co.`,
      images: item.images?.[0] ? [item.images[0]] : [],
    },
  }
}

export default async function PortfolioItemPage({ params }: { params: { id: string } }) {
  const { id } = params
  const supabase = await createClient()
  const { data: item } = await supabase.from("portfolio_items").select("*").eq("id", id).maybeSingle()

  if (!item) {
    redirect("/portfolio")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <PortfolioDetail item={item} />
      </main>

      <SiteFooter />
    </div>
  )
}
