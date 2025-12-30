import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ShopContent } from "@/components/shop-content"
import { getProducts, getCollections } from "@/lib/shopify"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop Jewelry18 | Premium Diamond Jewelry & Engagement Rings | Alby Diamond Co.",
  description:
    "Shop Jewelry18 premium collection of diamond jewelry. Certified diamonds, engagement rings, wedding bands, necklaces, and fine jewelry. Secure checkout, worldwide shipping, and lifetime warranty.",
  keywords:
    "buy diamond jewelry, engagement rings for sale, shop wedding bands, diamond necklaces, luxury jewelry online, certified diamonds, buy engagement ring, jewelry store, diamond jewelry shop",
  openGraph: {
    title: "Shop Jewelry18 - Alby Diamond Co.",
    description: "Premium diamond jewelry collection with secure checkout and worldwide shipping.",
    type: "website",
  },
}

export const revalidate = 3600

export default async function ShopPage() {
  try {
    const [products, collections] = await Promise.all([getProducts({ first: 100 }), getCollections(20)])

    const categories = ["All", ...collections.map((c) => c.title)]

    return (
      <div className="flex min-h-screen flex-col jewelry18-section">
        <SiteHeader />
        <main className="flex-1">
          <ShopContent products={products} categories={categories} />
        </main>
        <SiteFooter />
      </div>
    )
  } catch (error) {
    console.error("[v0] Error fetching Shopify data:", error)

    return (
      <div className="flex min-h-screen flex-col jewelry18-section">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-semibold mb-4 text-[#1A1A1A]">Shopify Store Not Connected</h1>
            <p className="text-[#3a3a3a] mb-4 font-normal">
              Please add your Shopify store credentials as environment variables:
            </p>
            <div className="bg-white p-4 rounded-lg border border-[#E8E3DD] text-left">
              <code className="text-sm text-[#1A1A1A] font-normal">
                NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
              </code>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }
}
