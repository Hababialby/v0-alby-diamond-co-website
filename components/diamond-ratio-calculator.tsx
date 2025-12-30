"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Ruler } from "lucide-react"

const MAX_DIMENSION = 25 // mm

export function DiamondRatioCalculator() {
  const [length, setLength] = useState<string>("")
  const [width, setWidth] = useState<string>("")

  const calculateRatio = () => {
    const lengthNum = Number.parseFloat(length)
    const widthNum = Number.parseFloat(width)

    if (!lengthNum || !widthNum || isNaN(lengthNum) || isNaN(widthNum) || widthNum === 0) {
      return null
    }

    if (lengthNum > MAX_DIMENSION || widthNum > MAX_DIMENSION) {
      return "exceeded"
    }

    const ratio = lengthNum / widthNum
    const decimalPart = Math.round((ratio - 1) * 10) // Display only 2 digits instead of 3 by dividing by 10
    return `1:${decimalPart.toString().padStart(2, "0")}`
  }

  const ratio = calculateRatio()

  return (
    <Card className="p-6 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Ruler className="h-6 w-6 text-[#D4AF37]" />
        <h3 className="text-xl font-semibold text-card-foreground">Diamond Ratio Calculator</h3>
      </div>
      <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
        Calculate the length-to-width ratio by entering your diamond's dimensions in millimeters.
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Length (mm)</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 8.5"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="border-2 border-border focus:border-[#D4AF37] bg-background"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold">Width (mm)</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 6.5"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="border-2 border-border focus:border-[#D4AF37] bg-background"
            />
          </div>
        </div>

        {ratio && ratio !== "exceeded" && (
          <div className="mt-6 p-6 bg-[#F5F1E8] border-2 border-[#D4AF37]">
            <h4 className="text-sm font-semibold text-foreground mb-3">Diamond Ratio</h4>
            <div className="space-y-2">
              <p className="text-2xl font-semibold text-foreground">{ratio}</p>
              <p className="text-xs text-foreground/70">
                {length}mm length ÷ {width}mm width
              </p>
            </div>
          </div>
        )}

        {ratio === "exceeded" && (
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-600 font-medium">I'm not trained on that. Try a smaller value.</p>
          </div>
        )}

        {!ratio && (length || width) && (
          <div className="mt-6 p-4 bg-muted border border-border">
            <p className="text-sm text-foreground/70">Enter both length and width to calculate the ratio.</p>
          </div>
        )}
      </div>
    </Card>
  )
}
