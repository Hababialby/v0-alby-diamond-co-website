"use client"

import Link from "next/link"
import { Menu, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Portfolio", href: "/portfolio" },
    { name: "Shop Jewelry18", href: "/shop" },
    { name: "Blog", href: "/blog" },
    { name: "Tools", href: "/tools" },
    { name: "About", href: "/about" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 group">
            <span className="text-2xl font-semibold tracking-tight text-foreground transition-all duration-300 group-hover:text-accent group-hover:tracking-wide">
              ALBY DIAMOND CO.
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => {
            const active = isActive(item.href)
            const isShopPage = item.href === "/shop"
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium leading-6 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-300 ${
                  active
                    ? isShopPage
                      ? "text-[#D4AF37] after:w-full after:bg-[#D4AF37]"
                      : "text-foreground after:w-full after:bg-foreground"
                    : isShopPage
                      ? "text-foreground hover:text-[#D4AF37] after:w-0 hover:after:w-full after:bg-[#D4AF37]"
                      : "text-foreground hover:text-accent after:w-0 hover:after:w-full after:bg-accent"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* Cart */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/shop/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping cart</span>
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden animate-in slide-in-from-top duration-300">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => {
              const active = isActive(item.href)
              const isShopPage = item.href === "/shop"
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    active
                      ? isShopPage
                        ? "text-[#D4AF37] bg-[#D4AF37]/10"
                        : "text-accent bg-muted"
                      : isShopPage
                        ? "text-foreground hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                        : "text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
