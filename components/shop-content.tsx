"use client"

import { useState, useEffect } from "react"
import type { ShopifyProduct } from "@/lib/shopify/types"
import { ProductCard } from "@/components/product-card"

interface ShopContentProps {
  products: ShopifyProduct[]
  categories: string[]
}

export function ShopContent({ products, categories }: ShopContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const videoOpacity = Math.max(0.2, 1 - scrollY / 500)
  const videoScale = 1 + scrollY / 2000

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((p) => p.productType === selectedCategory)

  return (
    <>
      <div className="relative h-[40vh] w-full overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out"
          style={{
            opacity: videoOpacity,
            transform: `scale(${videoScale})`,
          }}
        >
          <source src="/jewelry-showcase-luxury-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-80% via-[#F5F1E8]/50 via-90% to-[#F5F1E8] to-100% pointer-events-none" />
      </div>

      <div className="jewelry18-section -mt-16">
        <div className="mx-auto max-w-5xl px-6 text-center pt-20">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-3 flex items-center justify-center gap-0.5 text-[#1A1A1A]">
              <span className="text-3xl md:text-4xl font-normal">JEWELRY</span>
              <img
                src="/images/copy-20of-20untitled-20-289-20x-2012-20in-29.png"
                alt="18"
                className="h-24 md:h-32 w-auto inline-block object-contain"
              />
            </h1>
            <p className="text-sm uppercase tracking-widest text-[#D4AF37] font-semibold mb-0">by Alby Diamond Co.</p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-5 py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold
                  transition-all duration-300 border-2
                  ${
                    selectedCategory === category
                      ? "bg-[#D4AF37] text-white border-[#D4AF37] shadow-lg"
                      : "bg-white text-[#1A1A1A] border-[#E8E3DD] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#3a3a3a] text-lg font-normal">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
