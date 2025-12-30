"use client"

import { useState } from "react"
import Image from "next/image"
import { type Product, products } from "@/lib/shop-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Phone, MessageCircle, Plus } from "lucide-react"
import Link from "next/link"
import { GoldTypeSelector } from "@/components/gold-type-selector"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedGoldType, setSelectedGoldType] = useState<string>("14k-yellow")
  const [showEngraving, setShowEngraving] = useState(false)
  const [engravingText, setEngravingText] = useState("")
  const [sizeError, setSizeError] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const relatedProducts = product.relatedProducts ? products.filter((p) => product.relatedProducts?.includes(p.id)) : []

  const truncatedDescription = product.description.slice(0, 120) + (product.description.length > 120 ? "..." : "")

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      setSizeError(true)
      return
    }
    setSizeError(false)
    // Add to cart logic here
    alert("Added to cart!")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    }
  }

  return (
    <div className="bg-[#F5F1E8]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#D4AF37] mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-[#D4AF37]" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-0">
          <div className="lg:pr-16 pb-8 lg:pb-0">
            <div className="relative aspect-square overflow-hidden bg-[#EDE7DC] mb-4">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={`${product.name} - ${product.details.metal} ${product.category} - View ${selectedImage + 1} of ${product.images.length}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={selectedImage === 0}
                quality={90}
              />
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden bg-[#EDE7DC] border-2 transition-all ${
                      selectedImage === index ? "border-[#006039]" : "border-transparent hover:border-[#D4AF37]"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} thumbnail - View ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 12vw"
                      className="object-cover"
                      quality={75}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-light tracking-tight text-[#1A1A1A] mb-3 text-balance uppercase">
                  {product.name}
                </h1>
                <p className="text-sm text-[#1A1A1A] leading-relaxed mb-2">
                  {showFullDescription ? product.description : truncatedDescription}
                </p>
                {!showFullDescription && (
                  <button
                    onClick={() => setShowFullDescription(true)}
                    className="text-sm text-[#1A1A1A] underline hover:no-underline hover:text-[#006039] transition-colors"
                  >
                    Read More
                  </button>
                )}

                {showFullDescription && product.specifications && (
                  <ul className="mt-4 space-y-1 text-sm text-[#6B6B6B]">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {showFullDescription && (
                  <button
                    onClick={() => setShowFullDescription(false)}
                    className="text-sm text-[#1A1A1A] underline hover:no-underline hover:text-[#006039] transition-colors mt-3"
                  >
                    Read Less
                  </button>
                )}
              </div>

              {product.sizes && (
                <div className="border-t border-[#D4CFC8] pt-6 space-y-3">
                  <Link
                    href="/tools"
                    className="text-sm text-[#1A1A1A] underline hover:no-underline hover:text-[#006039] transition-colors"
                  >
                    Find Your Size
                  </Link>

                  <div className="relative">
                    <select
                      value={selectedSize}
                      onChange={(e) => {
                        setSelectedSize(e.target.value)
                        setSizeError(false)
                      }}
                      className={`w-full border ${
                        sizeError ? "border-red-500" : "border-[#D4CFC8]"
                      } px-4 py-3 text-sm focus:outline-none focus:border-[#006039] appearance-none bg-[#F5F1E8]`}
                    >
                      <option value="">Select Size</option>
                      {product.sizes.map((size) => (
                        <option key={size.value} value={size.value} disabled={!size.inStock}>
                          {size.label}
                          {!size.inStock ? " – Notify when available" : ""}
                        </option>
                      ))}
                    </select>
                    {sizeError && <p className="text-sm text-red-600 mt-2">Please Select Size</p>}
                  </div>
                </div>
              )}

              <div className="border-t border-[#D4CFC8] pt-6">
                <GoldTypeSelector value={selectedGoldType} onChange={setSelectedGoldType} />
              </div>

              <div className="border-t border-[#D4CFC8] pt-6">
                <button
                  onClick={() => setShowEngraving(!showEngraving)}
                  className="flex items-center gap-2 text-sm text-[#1A1A1A] hover:text-[#006039] transition-colors group"
                >
                  <Plus
                    className={`h-4 w-4 text-[#006039] transition-transform group-hover:text-[#D4AF37] ${showEngraving ? "rotate-45" : ""}`}
                  />
                  Add Engraving
                </button>

                {showEngraving && (
                  <div className="mt-4 space-y-3">
                    <input
                      type="text"
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value.slice(0, 20))}
                      placeholder="Enter text (max 20 characters)"
                      maxLength={20}
                      className="w-full border border-[#D4CFC8] px-4 py-2 text-sm focus:outline-none focus:border-[#006039] bg-[#F5F1E8]"
                    />
                    <p className="text-xs text-[#6B6B6B]">{engravingText.length}/20 characters</p>
                  </div>
                )}
              </div>

              <div className="border-t border-[#D4CFC8] pt-6 space-y-4">
                <p className="text-2xl font-light text-[#1A1A1A]">${product.price.toLocaleString()}</p>

                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-[#006039] hover:bg-[#D4AF37] text-white transition-colors"
                  size="lg"
                  disabled={!product.inStock}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>

                <div className="space-y-2 text-sm text-[#1A1A1A] pt-4">
                  <p>Complimentary Delivery</p>
                  <p>Complimentary Returns and Exchanges</p>
                </div>
              </div>

              {relatedProducts.length > 0 && (
                <div className="border-t border-[#D4CFC8] pt-6">
                  <h3 className="text-sm font-medium text-[#1A1A1A] mb-4">Also Available In</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {relatedProducts.map((relatedProduct) => (
                      <Link key={relatedProduct.id} href={`/shop/${relatedProduct.id}`} className="group">
                        <div className="aspect-square overflow-hidden bg-[#EDE7DC] mb-2 ring-2 ring-transparent group-hover:ring-[#006039] transition-all relative">
                          <Image
                            src={relatedProduct.images[0] || "/placeholder.svg"}
                            alt={`${relatedProduct.name} - ${relatedProduct.details.metal} ${relatedProduct.category}`}
                            fill
                            sizes="(max-width: 768px) 33vw, 16vw"
                            className="object-cover group-hover:opacity-75 transition-opacity"
                            quality={75}
                          />
                        </div>
                        <p className="text-xs text-[#1A1A1A] mb-1">{relatedProduct.name}</p>
                        <p className="text-xs text-[#6B6B6B]">{relatedProduct.details.metal}</p>
                        <p className="text-xs text-[#1A1A1A] mt-1 group-hover:text-[#D4AF37] transition-colors">
                          ${relatedProduct.price.toLocaleString()}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-[#D4CFC8] pt-6 space-y-3">
                <button className="flex items-center gap-2 text-sm text-[#1A1A1A] hover:text-[#006039] transition-colors">
                  <MessageCircle className="h-4 w-4 text-[#C5B5A8]" />
                  Contact an Ambassador
                </button>
                <button className="flex items-center gap-2 text-sm text-[#1A1A1A] hover:text-[#006039] transition-colors">
                  <Phone className="h-4 w-4 text-[#D4AF37]" />
                  Order by Phone
                </button>
              </div>

              <div className="border-t border-[#D4CFC8] pt-6">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-sm text-[#1A1A1A] hover:text-[#006039] transition-colors"
                >
                  <Share2 className="h-4 w-4 text-[#006039]" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
