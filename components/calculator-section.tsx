"use client"

import { DiamondCalculator } from "@/components/diamond-calculator"
import { DimensionsToCarat } from "@/components/dimensions-to-carat"
import { DiamondRatioCalculator } from "@/components/diamond-ratio-calculator"
import { PriceEstimator } from "@/components/price-estimator"
import { RingSizeCalculator } from "@/components/ring-size-calculator"
import { Card } from "@/components/ui/card"
import { Calculator, Gem, Ruler, Hand } from "lucide-react"
import { useState } from "react"

export function CalculatorSection() {
  const [activeCalculator, setActiveCalculator] = useState<"size" | "price" | "dimensions" | "ratio" | "ring-size">(
    "size",
  )

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-light tracking-tight text-foreground mb-8 text-center">Diamond Calculators</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8 max-w-7xl mx-auto">
        <button
          onClick={() => setActiveCalculator("size")}
          className={`text-left transition-all ${activeCalculator === "size" ? "scale-105" : "hover:scale-105"}`}
          aria-label="Diamond Size Calculator"
        >
          <Card
            className={`p-8 border h-full min-h-[240px] flex flex-col ${
              activeCalculator === "size" ? "border-[#C9A961] shadow-lg" : "border-border hover:shadow-lg"
            }`}
          >
            <Calculator
              className={`h-12 w-12 mb-4 ${activeCalculator === "size" ? "text-[#C9A961]" : "text-[#FFD700]"}`}
            />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Diamond Size Calculator</h3>
            <p className="text-base text-muted-foreground leading-relaxed">Calculate dimensions by carat weight</p>
          </Card>
        </button>

        <button
          onClick={() => setActiveCalculator("dimensions")}
          className={`text-left transition-all ${activeCalculator === "dimensions" ? "scale-105" : "hover:scale-105"}`}
          aria-label="Dimensions to Carat Calculator"
        >
          <Card
            className={`p-8 border h-full min-h-[240px] flex flex-col ${
              activeCalculator === "dimensions" ? "border-[#C9A961] shadow-lg" : "border-border hover:shadow-lg"
            }`}
          >
            <Ruler
              className={`h-12 w-12 mb-4 ${activeCalculator === "dimensions" ? "text-[#C9A961]" : "text-[#B76E79]"}`}
            />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Dimensions to Carat</h3>
            <p className="text-base text-muted-foreground leading-relaxed">Estimate carat weight from measurements</p>
          </Card>
        </button>

        <button
          onClick={() => setActiveCalculator("ratio")}
          className={`text-left transition-all ${activeCalculator === "ratio" ? "scale-105" : "hover:scale-105"}`}
          aria-label="Diamond Ratio Calculator"
        >
          <Card
            className={`p-8 border h-full min-h-[240px] flex flex-col ${
              activeCalculator === "ratio" ? "border-[#C9A961] shadow-lg" : "border-border hover:shadow-lg"
            }`}
          >
            <Ruler className={`h-12 w-12 mb-4 ${activeCalculator === "ratio" ? "text-[#C9A961]" : "text-[#4A4A4A]"}`} />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Diamond Ratio</h3>
            <p className="text-base text-muted-foreground leading-relaxed">Calculate length-to-width proportions</p>
          </Card>
        </button>

        <button
          onClick={() => setActiveCalculator("price")}
          className={`text-left transition-all ${activeCalculator === "price" ? "scale-105" : "hover:scale-105"}`}
          aria-label="Diamond Price Estimator"
        >
          <Card
            className={`p-8 border h-full min-h-[240px] flex flex-col ${
              activeCalculator === "price" ? "border-[#C9A961] shadow-lg" : "border-border hover:shadow-lg"
            }`}
          >
            <Gem className={`h-12 w-12 mb-4 ${activeCalculator === "price" ? "text-[#C9A961]" : "text-[#006039]"}`} />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Price Estimator</h3>
            <p className="text-base text-muted-foreground leading-relaxed">Estimate diamond value</p>
          </Card>
        </button>

        <button
          onClick={() => setActiveCalculator("ring-size")}
          className={`text-left transition-all ${activeCalculator === "ring-size" ? "scale-105" : "hover:scale-105"}`}
          aria-label="Ring Size Calculator"
        >
          <Card
            className={`p-8 border h-full min-h-[240px] flex flex-col ${
              activeCalculator === "ring-size" ? "border-[#C9A961] shadow-lg" : "border-border hover:shadow-lg"
            }`}
          >
            <Hand
              className={`h-12 w-12 mb-4 ${activeCalculator === "ring-size" ? "text-[#C9A961]" : "text-[#8B7355]"}`}
            />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Ring Size</h3>
            <p className="text-base text-muted-foreground leading-relaxed">Find your ring size by circumference</p>
          </Card>
        </button>
      </div>

      <div className="max-w-5xl mx-auto">
        {activeCalculator === "size" && <DiamondCalculator />}
        {activeCalculator === "dimensions" && <DimensionsToCarat />}
        {activeCalculator === "ratio" && <DiamondRatioCalculator />}
        {activeCalculator === "price" && <PriceEstimator />}
        {activeCalculator === "ring-size" && <RingSizeCalculator />}
      </div>
    </section>
  )
}
