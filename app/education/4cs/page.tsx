import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function FourCsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
          <Link
            href="/education"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Education
          </Link>

          <h1 className="text-4xl font-light tracking-tight text-foreground mb-6 text-balance">The 4 Cs of Diamonds</h1>
          <p className="text-lg text-foreground/80 mb-12 leading-relaxed">
            Understanding the four factors that determine a diamond's quality and value.
          </p>

          <div className="space-y-8">
            <Card className="p-8 border border-border">
              <h2 className="text-2xl font-semibold text-card-foreground mb-4">Cut</h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                The cut is often considered the most important of the 4 Cs. It refers to how well a diamond's facets
                interact with light, determining its brilliance and sparkle. A well-cut diamond will reflect light from
                one facet to another and disperse it through the top of the stone.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Cut grades range from Excellent to Poor. An Excellent cut maximizes the diamond's brilliance, while a
                Poor cut allows light to escape through the bottom or sides, making the diamond appear dull.
              </p>
            </Card>

            <Card className="p-8 border border-border">
              <h2 className="text-2xl font-semibold text-card-foreground mb-4">Color</h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Diamond color grading evaluates the degree of colorlessness in a white diamond. The GIA color scale
                ranges from D (colorless) to Z (light yellow or brown).
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Colorless diamonds (D-F) are the most valuable, followed by near-colorless (G-J). The differences
                between adjacent color grades are subtle and often invisible to the untrained eye, but they can
                significantly impact price.
              </p>
            </Card>

            <Card className="p-8 border border-border">
              <h2 className="text-2xl font-semibold text-card-foreground mb-4">Clarity</h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Clarity measures the presence of internal characteristics (inclusions) and external characteristics
                (blemishes) in a diamond. These are natural identifying characteristics created when diamonds form under
                intense heat and pressure.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                The GIA clarity scale ranges from Flawless (FL) to Included (I3). Most diamonds fall in the VS (Very
                Slightly Included) or SI (Slightly Included) range, where inclusions are not visible to the naked eye.
              </p>
            </Card>

            <Card className="p-8 border border-border">
              <h2 className="text-2xl font-semibold text-card-foreground mb-4">Carat Weight</h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Carat is the unit of measurement for a diamond's weight. One carat equals 200 milligrams, or 0.2 grams.
                Larger diamonds are rarer and more valuable per carat than smaller diamonds of the same quality.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                It's important to note that carat weight doesn't directly correspond to size - a diamond's cut quality
                affects how large it appears. Two diamonds of equal carat weight can appear different in size based on
                their cut proportions.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
