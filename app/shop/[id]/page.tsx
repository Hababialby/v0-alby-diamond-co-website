import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ShopProductDetail } from "@/components/shop-product-detail"
import { getProduct } from "@/lib/shopify"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return {
      title: "Product Not Found | Alby Diamond Co.",
    }
  }

  return {
    title: `${product.title} | Jewelry18 | Alby Diamond Co.`,
    description: product.description || `${product.title} - Fine jewelry by Alby Diamond Co.`,
    openGraph: {
      title: product.title,
      description: product.description || `${product.title} - Fine jewelry by Alby Diamond Co.`,
      images: product.images?.edges?.[0]?.node?.url ? [product.images.edges[0].node.url] : [],
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="flex-1">
        <ShopProductDetail product={product} />
      </main>

      <SiteFooter />
    </div>
  )
}
