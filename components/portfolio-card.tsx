"use client"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

interface PortfolioItem {
  id: string
  title: string
  category: string
  customer_quote?: string
  customer_name?: string
  images: string[]
}

interface PortfolioCardProps {
  item: PortfolioItem
}

export function PortfolioCard({ item }: PortfolioCardProps) {
  const imagesArray = Array.isArray(item.images)
    ? item.images
    : typeof item.images === "string"
      ? JSON.parse(item.images)
      : []
  const firstImage = imagesArray[0] || "/sparkling-diamond-jewelry.png"

  return (
    <Link href={`/portfolio/${item.id}`}>
      <Card className="group overflow-hidden border border-border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={firstImage || "/placeholder.svg"}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 transition-colors duration-300">
            {item.category}
          </p>
          <h3 className="text-xl font-semibold text-card-foreground mb-2 text-balance transition-colors duration-300">
            {item.title}
          </h3>
          {item.customer_quote && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed italic">"{item.customer_quote}"</p>
          )}
        </div>
      </Card>
    </Link>
  )
}
