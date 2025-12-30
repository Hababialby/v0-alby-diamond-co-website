"use client"

import { useState } from "react"
import { PortfolioCard } from "./portfolio-card"
import { Button } from "@/components/ui/button"

interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  image: string
  price: string
  testimonial_quote?: string
  testimonial_author?: string
  details?: string
  created_at: string
}

interface PortfolioGridServerProps {
  items: PortfolioItem[]
}

export function PortfolioGridServer({ items }: PortfolioGridServerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = ["All", ...Array.from(new Set(items.map((p) => p.category)))]

  const filteredItems = selectedCategory === "All" ? items : items.filter((p) => p.category === selectedCategory)

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <PortfolioCard key={item.id} item={item} />)
        ) : (
          <div className="col-span-full text-center text-muted-foreground py-12">
            No portfolio items yet. Add your first piece in the admin panel!
          </div>
        )}
      </div>
    </div>
  )
}
