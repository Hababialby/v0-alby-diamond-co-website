import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"

export default function PortfolioNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Portfolio Item Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The portfolio item you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/portfolio">View All Portfolio</Link>
          </Button>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
