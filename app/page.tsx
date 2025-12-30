import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, ShoppingBag, BookOpen, GraduationCap } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Alby Diamond Co. | Luxury Diamond Jewelry & Engagement Rings",
  description:
    "Discover timeless elegance with Alby Diamond Co. Explore our curated collection of fine diamonds, custom engagement rings, and luxury jewelry crafted with exceptional artistry. Expert jewelers serving discerning clients worldwide.",
  keywords:
    "luxury diamond jewelry, engagement rings, custom jewelry, fine diamonds, diamond rings, wedding bands, diamond necklaces, jewelry design, certified diamonds, GIA diamonds, luxury jeweler",
  openGraph: {
    title: "Alby Diamond Co. - Exquisite Diamond & Jewelry Collection",
    description:
      "Timeless elegance in every diamond. Browse our curated collection of exceptional diamonds and fine jewelry.",
    type: "website",
    images: ["/luxury-diamond-jewelry-sparkle-elegant.jpg"],
  },
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] hover:scale-105"
            style={{
              backgroundImage: "url('/luxury-diamond-jewelry-sparkle-elegant.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-5xl font-light tracking-tight text-foreground sm:text-7xl mb-6 text-balance">
              Timeless Elegance in Every Diamond
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Discover our curated collection of exceptional diamonds and fine jewelry, each piece crafted to perfection
              with unparalleled artistry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Link href="/portfolio">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Portfolio
                </Button>
              </Link>
              <Link href="/shop">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-foreground text-foreground hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37] transition-all duration-300 font-semibold bg-transparent"
                >
                  Shop Jewelry18
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl mb-4">Explore Our World</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From exquisite portfolio pieces to education resources, discover everything Alby Diamond Co. has to
                offer.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/portfolio"
                className="group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"
              >
                <div className="relative overflow-hidden bg-card p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border">
                  <Sparkles className="h-10 w-10 text-accent mb-4" />
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">Portfolio</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Browse our collection of 30+ exquisite jewelry pieces, each showcasing exceptional craftsmanship.
                  </p>
                </div>
              </Link>

              <Link href="/shop" className="group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <div className="relative overflow-hidden bg-card p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border">
                  <ShoppingBag className="h-10 w-10 text-[#D4AF37] mb-4" />
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">Jewelry18</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Shop our premium collection. Secure checkout and worldwide shipping available.
                  </p>
                </div>
              </Link>

              <Link href="/blog" className="group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <div className="relative overflow-hidden bg-card p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border">
                  <BookOpen className="h-10 w-10 text-accent mb-4" />
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">Blog</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Stay updated with the latest trends, stories, and insights from the world of fine jewelry.
                  </p>
                </div>
              </Link>

              <Link
                href="/tools"
                className="group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[400ms]"
              >
                <div className="relative overflow-hidden bg-card p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border">
                  <GraduationCap className="h-10 w-10 text-accent mb-4" />
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">Tools</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Professional diamond calculators for size, price, carat weight, and ratio estimates.
                  </p>
                </div>
              </Link>

              <Link
                href="/education"
                className="group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[500ms]"
              >
                <div className="relative overflow-hidden bg-card p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border">
                  <GraduationCap className="h-10 w-10 text-accent mb-4" />
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">Education</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Learn about diamonds with our calculators, guides, and comprehensive resources.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="mx-auto max-w-4xl px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl font-light tracking-tight text-foreground mb-6 text-balance">
              Begin Your Journey with Alby Diamond Co.
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Whether you're seeking the perfect engagement ring or a statement piece, our experts are here to guide you
              every step of the way.
            </p>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Learn Our Story
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
