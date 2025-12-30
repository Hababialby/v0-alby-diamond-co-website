"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

const DiamondIcon = ({ shape, className = "w-30 h-30" }: { shape: string; className?: string }) => {
  const shapeMap: Record<string, string> = {
    round: "Round",
    princess: "Princess",
    cushion: "Square Cushion",
    oval: "Oval",
    emerald: "Emerald",
    pear: "Pear",
    marquise: "Marquise",
    radiant: "Radiant",
    asscher: "Asscher",
    heart: "Heart",
  }

  return (
    <Image
      src={`/diamonds/${shape}.svg`}
      alt={`${shapeMap[shape] || shape} cut diamond shape icon`}
      width={240}
      height={240}
      className={className}
      priority
    />
  )
}

const DIAMOND_SHAPES = [
  { id: "round", name: "Round" },
  { id: "princess", name: "Princess" },
  { id: "cushion", name: "Square Cushion" },
  { id: "oval", name: "Oval" },
  { id: "emerald", name: "Emerald" },
  { id: "pear", name: "Pear" },
  { id: "marquise", name: "Marquise" },
  { id: "radiant", name: "Radiant" },
  { id: "asscher", name: "Asscher" },
  { id: "heart", name: "Heart" },
]

// Same SIZE_DATA from diamond-calculator
const SIZE_DATA: Record<string, Record<number, { width: number; length?: number }>> = {
  round: {
    0.0025: { width: 0.8 },
    0.005: { width: 1.0 },
    0.0067: { width: 1.1 },
    0.009: { width: 1.2 },
    0.01: { width: 1.25 },
    0.015: { width: 1.5 },
    0.02: { width: 1.75 },
    0.025: { width: 1.8 },
    0.03: { width: 2.0 },
    0.04: { width: 2.2 },
    0.06: { width: 2.5 },
    0.08: { width: 2.75 },
    0.1: { width: 3.0 },
    0.14: { width: 3.25 },
    0.17: { width: 3.5 },
    0.21: { width: 3.75 },
    0.25: { width: 4.0 },
    0.28: { width: 4.25 },
    0.36: { width: 4.5 },
    0.44: { width: 4.75 },
    0.5: { width: 5.0 },
    0.56: { width: 5.25 },
    0.66: { width: 5.5 },
    0.75: { width: 5.75 },
    0.84: { width: 6.0 },
    0.93: { width: 6.25 },
    1.0: { width: 6.5 },
    1.25: { width: 6.8 },
    1.3: { width: 7.0 },
    1.5: { width: 7.3 },
    1.67: { width: 7.5 },
    1.75: { width: 7.75 },
    2.0: { width: 8.0 },
    2.11: { width: 8.25 },
    2.43: { width: 8.5 },
    2.5: { width: 8.7 },
    2.75: { width: 9.0 },
    3.0: { width: 9.1 },
    3.35: { width: 9.5 },
    3.5: { width: 9.75 },
    3.87: { width: 10.0 },
    4.0: { width: 10.25 },
    4.41: { width: 10.5 },
    4.5: { width: 10.75 },
    5.0: { width: 11.0 },
    5.49: { width: 11.25 },
    5.85: { width: 11.5 },
    6.84: { width: 12.0 },
    7.26: { width: 12.25 },
    7.36: { width: 12.5 },
    7.52: { width: 12.75 },
    8.51: { width: 13.0 },
    9.53: { width: 13.5 },
    10.49: { width: 14.0 },
    12.89: { width: 15.0 },
    16.06: { width: 16.0 },
  },
  princess: {
    0.015: { width: 1.5 },
    0.03: { width: 1.75 },
    0.06: { width: 2.0 },
    0.08: { width: 2.25 },
    0.1: { width: 2.5 },
    0.13: { width: 2.75 },
    0.18: { width: 3.0 },
    0.25: { width: 3.25 },
    0.29: { width: 3.5 },
    0.31: { width: 3.75 },
    0.39: { width: 4.0 },
    0.44: { width: 4.25 },
    0.5: { width: 4.5 },
    0.64: { width: 4.75 },
    0.75: { width: 5.0 },
    0.9: { width: 5.25 },
    1.0: { width: 5.5 },
    1.11: { width: 5.75 },
    1.25: { width: 6.0 },
    1.39: { width: 6.25 },
    1.5: { width: 6.5 },
    1.75: { width: 6.75 },
    2.0: { width: 7.0 },
    2.01: { width: 7.25 },
    2.5: { width: 7.5 },
    2.74: { width: 7.75 },
    3.0: { width: 8.0 },
    3.24: { width: 8.25 },
    3.5: { width: 8.5 },
    4.0: { width: 8.75 },
    4.5: { width: 9.25 },
    5.0: { width: 9.5 },
    5.36: { width: 9.75 },
    5.62: { width: 10.0 },
    5.76: { width: 10.25 },
    5.99: { width: 10.5 },
    7.44: { width: 11.0 },
    9.44: { width: 11.5 },
    9.52: { width: 12.0 },
  },
  emerald: {
    0.1: { length: 3, width: 2 },
    0.12: { length: 3.5, width: 2 },
    0.14: { length: 5, width: 2.5 },
    0.16: { length: 5.5, width: 2.75 },
    0.18: { length: 5.5, width: 3 },
    0.2: { length: 5, width: 3 },
    0.23: { length: 6.5, width: 3 },
    0.25: { length: 6, width: 3 },
    0.3: { length: 7, width: 3 },
    0.33: { length: 7.5, width: 3.5 },
    0.34: { length: 7, width: 4 },
    0.5: { length: 8, width: 4 },
    0.7: { length: 8.75, width: 4.25 },
    0.75: { length: 9, width: 4.5 },
    0.85: { length: 9.5, width: 4.7 },
    1.0: { length: 10, width: 5 },
    1.25: { length: 11, width: 5.5 },
    1.33: { length: 11.5, width: 6 },
    1.5: { length: 12, width: 6 },
    1.75: { length: 12.5, width: 6.25 },
    2.0: { length: 13, width: 6.5 },
    2.5: { length: 14, width: 7 },
    3.0: { length: 15, width: 7 },
    3.25: { length: 15, width: 7.5 },
    3.5: { length: 15, width: 8 },
    3.86: { length: 16, width: 8 },
    4.0: { length: 16.5, width: 8.25 },
    4.5: { length: 16.75, width: 8.5 },
    5.0: { length: 17, width: 8.5 },
    5.5: { length: 17.5, width: 10 },
    7.08: { length: 20, width: 8 },
    7.94: { length: 20, width: 10 },
    9.5: { length: 20, width: 11 },
  },
  cushion: {
    0.25: { width: 3.25 },
    0.4: { width: 4.2 },
    0.5: { width: 4.9 },
    0.75: { width: 5.25 },
    1.0: { width: 5.5 },
    1.25: { width: 6.0 },
    1.5: { width: 6.5 },
    1.75: { width: 6.75 },
    2.0: { width: 7.0 },
    2.5: { width: 7.5 },
    3.0: { width: 8.0 },
    3.5: { width: 8.5 },
    4.0: { width: 9.0 },
    4.5: { width: 9.3 },
    5.0: { width: 9.5 },
    5.62: { width: 10.0 },
    7.44: { width: 11.0 },
    9.52: { width: 12.0 },
    12.66: { width: 13.0 },
  },
  oval: {
    0.1: { length: 3.6, width: 2.7 },
    0.15: { length: 4, width: 3 },
    0.2: { length: 4.5, width: 3.5 },
    0.25: { length: 5, width: 3 },
    0.33: { length: 5.5, width: 3.5 },
    0.35: { length: 5, width: 4 },
    0.5: { length: 6, width: 4 },
    0.61: { length: 6, width: 5 },
    0.65: { length: 6.8, width: 4.5 },
    0.75: { length: 7, width: 5 },
    1.0: { length: 7.7, width: 5.7 },
    1.25: { length: 8, width: 6 },
    1.41: { length: 9, width: 6 },
    1.5: { length: 8.5, width: 6.5 },
    1.75: { length: 9, width: 6.5 },
    2.0: { length: 9, width: 7 },
    2.5: { length: 10, width: 8 },
    2.88: { length: 10.5, width: 8.5 },
    3.0: { length: 12, width: 8 },
    3.5: { length: 12, width: 8.5 },
    3.85: { length: 11, width: 9 },
    4.0: { length: 12.5, width: 8.5 },
    4.5: { length: 12.75, width: 8.5 },
    5.0: { length: 12, width: 10 },
    5.81: { length: 14, width: 10 },
    6.05: { length: 13, width: 11 },
    8.21: { length: 14, width: 12 },
    8.76: { length: 15, width: 12 },
    9.32: { length: 16, width: 12 },
    11.88: { length: 16, width: 14 },
    12.86: { length: 18, width: 13 },
    14.96: { length: 20, width: 15 },
  },
  pear: {
    0.13: { length: 3, width: 2 },
    0.18: { length: 4, width: 2.5 },
    0.21: { length: 4, width: 3 },
    0.25: { length: 5, width: 3 },
    0.35: { length: 5, width: 4 },
    0.5: { length: 6, width: 4 },
    0.6: { length: 6.5, width: 4.5 },
    0.75: { length: 7, width: 5 },
    0.85: { length: 7.5, width: 5.5 },
    1.0: { length: 7.7, width: 5.7 },
    1.25: { length: 8, width: 6 },
    1.5: { length: 8.5, width: 6.5 },
    1.75: { length: 10, width: 6 },
    1.8: { length: 8.7, width: 6.7 },
    2.0: { length: 9, width: 7 },
    2.5: { length: 10, width: 8 },
    2.61: { length: 11, width: 7.5 },
    2.7: { length: 11, width: 8 },
    3.0: { length: 12, width: 8 },
    3.12: { length: 12, width: 7 },
    3.4: { length: 13, width: 8 },
    3.5: { length: 12, width: 9 },
    4.0: { length: 14, width: 8 },
    4.11: { length: 13, width: 9 },
    4.25: { length: 14, width: 9 },
    4.5: { length: 14.5, width: 9 },
    5.0: { length: 15, width: 9 },
    5.41: { length: 14, width: 10 },
    5.65: { length: 13, width: 11 },
    5.75: { length: 15, width: 10 },
    5.86: { length: 16, width: 9 },
    6.27: { length: 16, width: 10 },
    6.46: { length: 17, width: 10 },
    7.36: { length: 15, width: 11 },
    8.14: { length: 18, width: 11 },
    8.99: { length: 16, width: 12 },
    9.35: { length: 18, width: 12 },
    10.21: { length: 18, width: 13 },
  },
  heart: {
    0.18: { width: 3.5 },
    0.25: { width: 4.0 },
    0.28: { width: 4.25 },
    0.34: { width: 4.5 },
    0.38: { width: 4.75 },
    0.5: { width: 5.0 },
    0.61: { width: 5.5 },
    0.75: { width: 6.0 },
    0.83: { width: 6.25 },
    1.0: { width: 6.5 },
    1.25: { width: 7.0 },
    1.5: { width: 7.5 },
    1.75: { width: 7.7 },
    2.0: { width: 8.0 },
    2.5: { width: 8.5 },
    3.0: { width: 9.0 },
    3.5: { width: 10.0 },
    4.0: { width: 10.5 },
    4.5: { width: 11.0 },
    5.0: { width: 11.5 },
    5.66: { width: 12.0 },
    7.88: { width: 13.0 },
    9.38: { width: 14.0 },
    10.79: { width: 15.0 },
    13.27: { width: 16.0 },
    15.33: { width: 18.0 },
  },
  marquise: {
    0.025: { length: 3, width: 1.5 },
    0.055: { length: 3.5, width: 1.75 },
    0.07: { length: 3.5, width: 2 },
    0.1: { length: 4, width: 2 },
    0.11: { length: 3.75, width: 1.75 },
    0.12: { length: 4.25, width: 2.25 },
    0.14: { length: 5, width: 2.5 },
    0.16: { length: 5.5, width: 2.75 },
    0.18: { length: 5.5, width: 3 },
    0.2: { length: 5, width: 3 },
    0.23: { length: 6.5, width: 3 },
    0.25: { length: 6, width: 3 },
    0.3: { length: 7, width: 3 },
    0.33: { length: 7.5, width: 3.5 },
    0.34: { length: 7, width: 4 },
    0.5: { length: 8, width: 4 },
    0.7: { length: 8.75, width: 4.25 },
    0.75: { length: 9, width: 4.5 },
    0.85: { length: 9.5, width: 4.7 },
    1.0: { length: 10, width: 5 },
    1.25: { length: 11, width: 5.5 },
    1.33: { length: 11.5, width: 6 },
    1.5: { length: 12, width: 6 },
    1.75: { length: 12.5, width: 6.25 },
    2.0: { length: 13, width: 6.5 },
    2.5: { length: 14, width: 7 },
    3.0: { length: 15, width: 7 },
    3.25: { length: 15, width: 7.5 },
    3.5: { length: 15, width: 8 },
    3.86: { length: 16, width: 8 },
    4.0: { length: 16.5, width: 8.25 },
    4.5: { length: 16.75, width: 8.5 },
    5.0: { length: 17, width: 8.5 },
    5.5: { length: 17.5, width: 10 },
    7.08: { length: 20, width: 8 },
    7.94: { length: 20, width: 10 },
    9.5: { length: 20, width: 11 },
  },
  radiant: {
    0.25: { length: 4.3, width: 3 },
    0.34: { length: 4.5, width: 3.5 },
    0.41: { length: 6, width: 3 },
    0.5: { length: 6, width: 4 },
    0.75: { length: 6.5, width: 4.5 },
    1.0: { length: 7, width: 5 },
    1.25: { length: 7.3, width: 5.5 },
    1.5: { length: 7.5, width: 5.8 },
    1.75: { length: 8, width: 6 },
    2.0: { length: 8.2, width: 6.2 },
    2.25: { length: 8.5, width: 6.5 },
    2.5: { length: 9, width: 7 },
    3.0: { length: 9.5, width: 7.5 },
    3.31: { length: 10, width: 7 },
    3.5: { length: 10, width: 8 },
    4.0: { length: 10.2, width: 8.2 },
    4.5: { length: 10.5, width: 8.5 },
    5.0: { length: 11, width: 9 },
    6.06: { length: 12, width: 9 },
    6.45: { length: 11.5, width: 10 },
    6.54: { length: 13, width: 9 },
    6.79: { length: 13.2, width: 9.2 },
    8.47: { length: 14, width: 10 },
    9.33: { length: 13, width: 11 },
    10.19: { length: 13.5, width: 11.5 },
    11.48: { length: 15, width: 11 },
    12.14: { length: 14, width: 12 },
    14.22: { length: 16, width: 12 },
  },
  asscher: {
    0.25: { width: 3.25 },
    0.39: { width: 4.0 },
    0.5: { width: 4.5 },
    0.75: { width: 5.0 },
    1.0: { width: 5.5 },
    1.25: { width: 6.0 },
    1.5: { width: 6.5 },
    1.75: { width: 6.7 },
    2.0: { width: 7.0 },
    2.5: { width: 7.5 },
    3.0: { width: 8.0 },
    3.5: { width: 8.5 },
    4.0: { width: 9.0 },
    4.5: { width: 9.25 },
    5.0: { width: 9.5 },
    5.62: { width: 10.0 },
    7.44: { width: 11.0 },
    9.52: { width: 12.0 },
    12.66: { width: 13.0 },
  },
}

export function DimensionsToCarat() {
  const [selectedShape, setSelectedShape] = useState<string>("round")
  const [width, setWidth] = useState<string>("")
  const [length, setLength] = useState<string>("")

  const getCarat = () => {
    const widthValue = Number.parseFloat(width)
    const lengthValue = length ? Number.parseFloat(length) : null

    if (!widthValue || isNaN(widthValue)) return null

    const shapeData = SIZE_DATA[selectedShape]
    if (!shapeData) return null

    // For rectangular shapes, need both width and length
    const isRectangular = ["emerald", "radiant", "oval", "pear", "marquise"].includes(selectedShape)
    if (isRectangular && (!lengthValue || isNaN(lengthValue))) return null

    const entries = Object.entries(shapeData)
    const maxWidth = Math.max(...entries.map(([_, dims]) => dims.width))
    const maxLength = isRectangular
      ? Math.max(...entries.filter(([_, dims]) => dims.length).map(([_, dims]) => dims.length!))
      : 0

    if (widthValue > maxWidth || (isRectangular && lengthValue && lengthValue > maxLength)) {
      return "exceeded"
    }

    // Find closest match by dimensions
    let closestCarat = null
    let minDifference = Number.POSITIVE_INFINITY

    for (const [carat, dims] of entries) {
      if (isRectangular && dims.length) {
        // Calculate distance for rectangular shapes
        const widthDiff = Math.abs(dims.width - widthValue)
        const lengthDiff = Math.abs(dims.length - (lengthValue || 0))
        const totalDiff = Math.sqrt(widthDiff ** 2 + lengthDiff ** 2)

        if (totalDiff < minDifference) {
          minDifference = totalDiff
          closestCarat = Number.parseFloat(carat)
        }
      } else {
        // Calculate distance for round shapes
        const widthDiff = Math.abs(dims.width - widthValue)

        if (widthDiff < minDifference) {
          minDifference = widthDiff
          closestCarat = Number.parseFloat(carat)
        }
      }
    }

    return closestCarat
  }

  const estimatedCarat = getCarat()
  const isRectangular = ["emerald", "radiant", "oval", "pear", "marquise"].includes(selectedShape)

  const getRatio = () => {
    const widthValue = Number.parseFloat(width)
    const lengthValue = Number.parseFloat(length)

    if (!widthValue || !lengthValue || isNaN(widthValue) || isNaN(lengthValue)) return null

    const ratio = lengthValue / widthValue
    const decimalPart = Math.round((ratio - 1) * 100)
    return `1:${decimalPart.toString().padStart(2, "0")}`
  }

  const ratio = isRectangular && width && length ? getRatio() : null

  return (
    <Card className="p-6 border border-border">
      <CardHeader className="flex items-center gap-2">
        <DiamondIcon shape={selectedShape} className="w-32 h-32 text-[#D4AF37]" />
        <CardTitle className="text-xl font-semibold text-card-foreground">Dimensions to Carat Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-foreground/70 leading-relaxed">
          Enter diamond dimensions in millimeters to estimate the carat weight.
        </CardDescription>
        <div className="space-y-6 mt-6">
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Select Shape</Label>
            <Select value={selectedShape} onValueChange={setSelectedShape}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select shape" />
              </SelectTrigger>
              <SelectContent>
                {DIAMOND_SHAPES.map((shape) => (
                  <SelectItem key={shape.id} value={shape.id}>
                    {shape.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold">{isRectangular ? "Width (mm)" : "Diameter (mm)"}</Label>
            <Input
              type="number"
              step="0.1"
              min="0"
              placeholder={isRectangular ? "e.g., 5.5" : "e.g., 6.5"}
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="border-2 border-border focus:border-[#D4AF37] bg-background"
            />
          </div>

          {isRectangular && (
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Length (mm)</Label>
              <Input
                type="number"
                step="0.1"
                min="0"
                placeholder="e.g., 7.5"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="border-2 border-border focus:border-[#D4AF37] bg-background"
              />
            </div>
          )}

          {estimatedCarat !== null && estimatedCarat !== "exceeded" && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-1">Estimated Carat Weight</p>
              <p className="text-3xl font-bold text-[#D4AF37]">{estimatedCarat.toFixed(2)} ct</p>
              {ratio && <p className="text-sm text-muted-foreground mt-2">Bonus Ratio: {ratio}</p>}
            </div>
          )}

          {estimatedCarat === "exceeded" && (
            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-600 font-medium">I'm not trained on that. Try a smaller value.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
