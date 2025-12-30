"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getRingSizeFromCircumference } from "@/lib/ring-size-data"

const REGIONS = [
  { id: "us", name: "US" },
  { id: "uk", name: "UK" },
  { id: "eu", name: "EU" },
]

export function RingSizeCalculator() {
  const [circumference, setCircumference] = useState("")
  const [unit, setUnit] = useState<"mm" | "in">("mm")
  const [selectedRegion, setSelectedRegion] = useState<string>("us")
  const [result, setResult] = useState<ReturnType<typeof getRingSizeFromCircumference> | null>(null)

  const handleCalculate = () => {
    const value = Number.parseFloat(circumference)
    if (isNaN(value) || value <= 0) {
      setResult(null)
      return
    }

    // Convert inches to mm if needed
    const circumferenceMm = unit === "in" ? value * 25.4 : value
    const sizeData = getRingSizeFromCircumference(circumferenceMm)
    setResult(sizeData)
  }

  const selectRegion = (regionId: string) => {
    setSelectedRegion(regionId)
  }

  const getRegionSize = (regionId: string) => {
    if (!result) return null
    switch (regionId) {
      case "us":
        return result.us
      case "uk":
        return result.uk
      case "eu":
        return result.euro
      default:
        return null
    }
  }

  return (
    <Card className="p-10 border border-border">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold text-card-foreground">Ring Size Calculator</CardTitle>
        <CardDescription className="text-base text-foreground/70 leading-relaxed">
          Enter your finger circumference to find your ring size in different regional standards.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <Label className="text-base font-semibold">Enter Circumference</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              step="0.1"
              min="0"
              placeholder={unit === "mm" ? "e.g., 52.5" : "e.g., 2.07"}
              value={circumference}
              onChange={(e) => setCircumference(e.target.value)}
              className="flex-1 border-2 border-border focus:border-[#D4AF37] bg-background"
            />
            <div className="flex border-2 border-border rounded-md overflow-hidden">
              <button
                onClick={() => setUnit("mm")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  unit === "mm" ? "bg-[#D4AF37] text-white" : "bg-background text-foreground hover:bg-muted"
                }`}
              >
                mm
              </button>
              <button
                onClick={() => setUnit("in")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  unit === "in" ? "bg-[#D4AF37] text-white" : "bg-background text-foreground hover:bg-muted"
                }`}
              >
                in
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold">Select Region</Label>
          <div className="flex gap-2">
            {REGIONS.map((region) => (
              <button
                key={region.id}
                onClick={() => selectRegion(region.id)}
                className={`
                  px-4 py-2 border-2 transition-all duration-300 text-sm font-medium rounded-md
                  ${
                    selectedRegion === region.id
                      ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-md"
                      : "border-border hover:border-[#D4AF37]/50 hover:bg-muted"
                  }
                `}
              >
                {region.name}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleCalculate}
          className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white font-semibold"
        >
          Calculate Ring Size
        </Button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-[#D4AF37]/10 rounded-lg border-2 border-[#D4AF37]">
              <p className="text-sm text-muted-foreground mb-1">Your Ring Size</p>
              <p className="text-3xl font-bold text-[#D4AF37]">
                {REGIONS.find((r) => r.id === selectedRegion)?.name} Size {getRegionSize(selectedRegion)}
              </p>
              {result.us % 1 !== 0 && result.us % 0.5 !== 0 && (
                <p className="text-xs text-muted-foreground mt-1">Rounded to nearest quarter size</p>
              )}
            </div>

            <div className="p-3 bg-muted/30 rounded-md text-xs text-muted-foreground">
              <p className="font-medium mb-1">Additional Measurements:</p>
              <p>
                Diameter: {result.diameter.toFixed(2)} mm ({(result.diameter / 25.4).toFixed(2)} in)
              </p>
              <p>
                Circumference: {result.circumferenceMm.toFixed(2)} mm ({result.circumferenceIn.toFixed(2)} in)
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
