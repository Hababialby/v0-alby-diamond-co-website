import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { portfolioItems } from '@/lib/portfolio-data'
import { PortfolioDetail } from '@/components/portfolio-detail'

export function generateStaticParams() {
  return portfolioItems.map((item) => ({
    id: item.id,
  }))
}

export default function PortfolioItemPage({ params }: { params: { id: string } }) {
  const item = portfolioItems.find((i) => i.id === params.id)

  if (!item) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      
      <main className="flex-1">
        <PortfolioDetail item={item} />
      </main>

      <SiteFooter />
    </div>
  )
}
