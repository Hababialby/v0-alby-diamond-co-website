import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://albydiamond.co" // Update with your actual domain

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/portfolio", "/shop", "/blog", "/tools", "/about"],
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
