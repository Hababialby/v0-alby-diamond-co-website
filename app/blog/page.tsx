import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BlogGridServer } from "@/components/blog-grid-server"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Diamond & Jewelry Blog | Expert Insights & Trends | Alby Diamond Co.",
  description:
    "Expert insights on diamonds, engagement rings, and fine jewelry. Learn about diamond trends, jewelry care, buying guides, and style inspiration from our master jewelers and gemologists.",
  keywords:
    "diamond blog, jewelry blog, engagement ring tips, diamond buying guide, jewelry trends, diamond care, jewelry style, gemstone information, wedding jewelry, diamond education",
  openGraph: {
    title: "Jewelry & Diamond Blog - Alby Diamond Co.",
    description: "Expert advice and insights from the world of fine jewelry and diamonds.",
    type: "website",
  },
}

export const revalidate = 60 // Revalidate every 60 seconds for fresh content

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl mb-4">Our Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Insights, trends, and expert advice from the world of fine jewelry and diamonds.
            </p>
          </div>

          <BlogGridServer posts={posts || []} />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
