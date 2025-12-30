"use client"

import Link from "next/link"
import Image from "next/image"
import type { ShopifyProduct } from "@/lib/shopify/types"

interface ProductCardProps {
  product: ShopifyProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images.edges[0]?.node.url || "/placeholder.svg?height=800&width=800"
  const altText =
    product.images.edges[0]?.node.altText ||
    `${product.title} - ${product.productType || "Fine Jewelry"} by Alby Diamond Co.`
  const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
  const currencyCode = product.priceRange.minVariantPrice.currencyCode
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(price)

  return (
    <Link href={`/shop/${product.handle}`}>
      <div className="group overflow-hidden border-0 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-[#F5F1E8] rounded-lg">
        <div className="relative aspect-square overflow-hidden bg-[#EDE7DC]">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-500 group-hover:scale-110"
            priority={false}
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/0 group-hover:via-white/10 transition-all duration-500" />
          {!product.availableForSale && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-sm font-medium">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs text-[#4a4a4a] uppercase tracking-wider mb-1 transition-all duration-300 group-hover:text-[#006039]">
            {product.productType || "Jewelry"}
          </p>
          <h3 className="text-base font-medium text-[#1A1A1A] mb-2 text-balance transition-colors duration-300 group-hover:text-[#006039]">
            {product.title}
          </h3>
          <p className="text-lg font-light text-[#1A1A1A] transition-all duration-300 group-hover:text-[#D4AF37] group-hover:scale-105 inline-block">
            {formattedPrice}
          </p>
        </div>
      </div>
    </Link>
  )
}
