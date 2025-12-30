import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  // This would normally fetch from a cart context/state
  const cartEmpty = true

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-8">Shopping Cart</h1>

          {cartEmpty ? (
            <div className="text-center py-16">
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-light text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Add some beautiful pieces from our collection.</p>
              <Link href="/shop">
                <Button size="lg" className="bg-[#006039] hover:bg-[#D4AF37] text-white transition-colors">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">{/* Cart items would go here */}</div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-6 h-fit">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                {/* Summary would go here */}
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
