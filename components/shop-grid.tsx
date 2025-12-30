"use client"

import { products } from "@/lib/shop-data"
import { ProductCard } from "./product-card"

export function ShopGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
