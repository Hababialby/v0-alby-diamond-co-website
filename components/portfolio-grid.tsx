'use client'

import { portfolioItems } from '@/lib/portfolio-data'
import { PortfolioCard } from './portfolio-card'

export function PortfolioGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {portfolioItems.map((item) => (
        <PortfolioCard key={item.id} item={item} />
      ))}
    </div>
  )
}
