"use client"

import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import type { ShopifyProduct } from "@/lib/shopify/types"
import { Button } from "@/components/ui/button"

interface ShopProductDetailProps {
  product: ShopifyProduct
}

export function ShopProductDetail({ product }: ShopProductDetailProps) {
  const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
  const currencyCode = product.priceRange.minVariantPrice.currencyCode
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(price)

  const handleAddToCart = () => {
    // This will be implemented when cart functionality is added
    console.log("[v0] Add to cart clicked for:", product.title)
    alert("Cart functionality coming soon! This will integrate with Shopify checkout.")
  }

  return (
    <div className="bg-[#F5F1E8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {product.images.edges.map((image, index) => {
              const altText =
                image.node.altText ||
                `${product.title} - ${product.productType || "Jewelry"} by Alby Diamond Co. - Image ${index + 1}`

              return (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg bg-[#EDE7DC]">
                  <Image
                    src={image.node.url || "/placeholder.svg"}
                    alt={altText}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={index === 0}
                    quality={90}
                  />
                </div>
              )
            })}
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-8 h-fit">
            <p className="text-sm uppercase tracking-widest text-[#4a4a4a] mb-2">{product.productType}</p>
            <h1 className="text-4xl font-light text-[#1A1A1A] mb-4">{product.title}</h1>
            <p className="text-3xl font-light text-[#D4AF37] mb-6">{formattedPrice}</p>

            <div
              className="prose prose-sm mb-8 text-[#4a4a4a]"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            <Button
              onClick={handleAddToCart}
              disabled={!product.availableForSale}
              className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white"
              size="lg"
            >
              {product.availableForSale ? (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </>
              ) : (
                "Out of Stock"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
