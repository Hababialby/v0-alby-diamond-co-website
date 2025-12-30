import { createClient } from "@/lib/supabase/server"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://albydiamond.co" // Update with your actual domain

  const supabase = await createClient()

  // Fetch portfolio items
  const { data: portfolioItems } = await supabase
    .from("portfolio_items")
    .select("id, updated_at")
    .order("updated_at", { ascending: false })

  // Fetch blog posts
  const { data: blogPosts } = await supabase
    .from("blog_posts")
    .select("id, slug, updated_at")
    .eq("published", true)
    .order("updated_at", { ascending: false })

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  // Portfolio item pages
  const portfolioPages: MetadataRoute.Sitemap =
    portfolioItems?.map((item) => ({
      url: `${baseUrl}/portfolio/${item.id}`,
      lastModified: new Date(item.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })) || []

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap =
    blogPosts?.map((post) => ({
      url: `${baseUrl}/blog/${post.slug || post.id}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })) || []

  return [...staticPages, ...portfolioPages, ...blogPages]
}
