import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { products } from '@/lib/shop-data'
import { ProductDetail } from '@/components/product-detail'

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      
      <main className="flex-1">
        <ProductDetail product={product} />
      </main>

      <SiteFooter />
    </div>
  )
}
